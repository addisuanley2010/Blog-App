import express from "express";
import { prisma } from "../prisma.js";
import { hashPassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/generateToken.js";
import { comparePassword } from "../utils/comparePassword.js";
import {
  authentication,
  authorization,
} from "../middlewares/authMiddleware.js";
const router = express.Router();
import twilio from "twilio";
import crypto from "crypto";
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *                 example: addisu@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *                 example: password123
 *               name:
 *                 type: string
 *               gender:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT authentication token
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     username:
 *                       type: string
 *       400:
 *         description: User already exists
 *       500:
 *         description: Server Error
 */

const accountSid = process.env.accountSid; 
const authToken = process.env.authToken;    
const client = new twilio(accountSid, authToken);

async function sendOtp(phone) {
  const otp = crypto.randomInt(100000, 999999).toString();

  try {
    const message = await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: +16406143590, 
      to: phone 
    });

    return otp; 
  } catch (error) {
    throw error; 
  }
}

router.post("/", async (req, res) => {
  console.log(req.body);
  const { email, password, name, gender, age, username, phone } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists", success: false });
    }

    const hashedPassword = await hashPassword(password);
    let profile;
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username: username ? username : email.split("@")[0],
        status: "ONLINE",
        lastActive: new Date(),
        isVerified: false,
        isBlocked: false,
        otp: null,
        otpExpiresAt: null,
        phone,
      },
    });

    if (user && (name || gender || age)) {
      profile = await prisma.profile.create({
        data: {
          userId: user.id,
          name,
          gender,
          age: parseInt(age),
        },
      });
    }

    // const otp = await sendOtp(phone);
    // await prisma.user.update({
    //   where: { id: user.id },
    //   data: {
    //     otp,
    //     otpExpiresAt: new Date(Date.now() + 10 * 60000), // OTP valid for 10 minutes
    //   },
    // });

    res.status(201).json({
      message: "User Registered Successfully! .",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      profile,
      success: true,
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: "Server Error", success: false });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID(only admin and owener of account)
 *     security:
 *      - BearerAuth: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: A user object
 *       404:
 *         description: User not found
 *       500:
 *         description: Server Error
 */
router.get(
  "/:id",
  authentication,
  authorization(["admin", "user"]),
  async (req, res) => {
    try {
      const { userId, role } = req.user;
      const id = parseInt(req.params.id);
      if (userId == id || role == "admin") {
        const user = await prisma.user.findUnique({
          where: {
            id,
          },
          include: {
            profile: true,
            posts: true,
            comments: true,
            likes: true,
          },
        });

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
      } else {
        return res
          .status(500)
          .json({ message: "you have no sufficent privilage" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Users list (only admin )
 *     security:
 *      - BearerAuth: []
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *       500:
 *         description: Server Error
 */
router.get("/", authentication, authorization(["admin"]), async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "asc",
      },
      include: {
        profile: true,
        posts: true,
        comments: true,
        likes: true,
      },
    });

    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});
/**
 * @swagger
 * /api/users:
 *   put:
 *     summary: Update user profile
 *     security:
 *       - BearerAuth: []
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User name
 *                 example: John Doe
 *               gender:
 *                 type: string
 *                 description: User gender
 *                 example: Male
 *               age:
 *                 type: integer
 *                 description: User age
 *                 example: 30
 *     responses:
 *       200:
 *         description: User profile updated
 *       404:
 *         description: User not found
 *       500:
 *         description: Server Error
 */
router.put("/", authentication, async (req, res) => {
  const { name, gender, age } = req.body;
  const id = req.user.userId;
  try {
    const profile = await prisma.profile.upsert({
      where: {
        userId: parseInt(id),
      },
      update: {
        name,
        gender,
        age,
      },
      create: {
        name,
        gender,
        age,
        userId: parseInt(id),
      },
    });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID(admin only)
 *     security:
 *      - BearerAuth: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server Error
 */
router.delete(
  "/:id",
  authentication,
  authorization(["admin"]),
  async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await prisma.user.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });

      res.status(200).json({ message: "User deleted successfully", user });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Verify a user by ID(admin only)
 *     security:
 *      - BearerAuth: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: User ID
 *     responses:
 *       200:
 *         description: User Verified successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server Error
 */
router.put(
  "/:id",
  authentication,
  authorization(["admin"]),
  async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });
      if (!user) {
        return res.status(404).json({ message: "User not found",success:false });
      }
      if (user.isVerified) {
        return res.status(400).json({ message: "User already verified",success:false });
      }
      await prisma.user.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          isVerified: true,
        },
      });
      res.status(200).json({ message: "User verified successfully",success:true });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server Error",success:false });
    }
  }
);
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *                 example: addisu@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *                 example: 123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *       400:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 *       500:
 *         description: Server Error
 */ router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.json({ message: "User not found", success: false });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.json({ message: "Incorrect password", success: false });
    }

    if (!user.isVerified) {
      return res.json({ message: "User not verified. ", success: false });
    }
    if (user.isBlocked) {
      return res.json({ message: "User is blocked ,please contact the Admin. ", success: false });
    }
    const token = await generateToken(user.id, user.role, user.username, user.isVerified, user.isBlocked);
      return res.json({
      message: "User logged in successfully!",
      success: true,
      token,
      isAuthenticated: true,
      user: { 
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        isVerified: user.isVerified,
        isBlocked:user.isBlocked

      },
    }); 
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error", success: false });
  }
});

 router.get("/check/auth", authentication, async(req, res) => {
  //  const user = req.user;
   const user = await prisma.user.findUnique({
    where: {
      id:req.user.userId,
    },
  });
   const token = await generateToken(user.id, user.role, user.username, user.isVerified, user.isBlocked);
   console.log(user)
   if (user.isBlocked) {
    return res.json({ message: "User is blocked ,please contact the Admin. yes ", success: false, isAuthenticated: false });
  } else {

  res.send({ success: true, message: "authenticated user", user, token: token, isAuthenticated: true })
}
});

export default router;
     