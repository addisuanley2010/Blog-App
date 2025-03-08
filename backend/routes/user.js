import express from "express";
import { prisma } from "../prisma.js";
import { hashPassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/generateToken.js";
const router = express.Router();
/**
  * @swagger
  * /api/users:
  *   post:
  *     summary: Create a new user
  *     tags: [Users]
  *     parameters:
  *       - in: body
  *         name: body
  *         required: true
  *         schema:
  *           type: object
  *           properties:
  *             email:
  *               type: string
  *               format: email
  *               description: User's email address 
  *               example: addisu@gmail.com
  *             password:
  *               type: string
  *               format: password
  *               description: User's password
  *               example: password123
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
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username: email.split("@")[0],
        status: "ONLINE",
        lastActive: new Date(),
      },
    });

    const token = await generateToken(user.id);

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
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
router.get("/:id", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.id),
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
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Users list
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *       500:
 *         description: Server Error
 */
router.get("/", async (req, res) => {
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
 * /api/users/{id}:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         example: 1
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: User name
 *               example: John Doe
 *             gender:
 *               type: string
 *               description: User gender
 *               example: Male
 *             age:
 *               type: integer
 *               description: User age
 *               example: 30
 *     responses:
 *       200:
 *         description: User profile updated
 *       404:
 *         description: User not found
 *       500:
 *         description: Server Error
 */
router.put("/:id", async (req, res) => {
  const { name, gender, age } = req.body;

  try {
    const profile = await prisma.profile.upsert({
      where: {
        userId: parseInt(req.params.id),
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
        userId: parseInt(req.params.id),
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
 *     summary: Delete a user by ID
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
router.delete("/:id", async (req, res) => {
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
 
    res.status(200).json({ message: "User deleted successfully",user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});
export default router;
