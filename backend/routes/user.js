import express from "express";
import { prisma } from "../prisma.js";
import { hashPassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/generateToken.js";
const router = express.Router();

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }


    const hashedPassword =await  hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username: email.split("@")[0], 
        status: "ONLINE",
        lastActive: new Date(),
      },
    });


    const token =await generateToken(user.id)
    

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

// @route   GET api/users/:id
// @desc    Get user by ID
// @access  Private
router.get("/:id", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        profile: true,
        posts: true,

        messages: true,
        chats: {
          include: {
            chat: true,
          },
        },
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

// @route   GET api/users
// @desc    Get all users
// @access  Public

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
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

// @route   PUT api/users/:id/profile
// @desc    Update user profile
// @access  public
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

// @route   DELETE api/users/:id/profile
// @desc    DELETE user
// @access  public
router.delete("/:id", async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
