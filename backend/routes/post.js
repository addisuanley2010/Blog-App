import express from "express";
const router = express.Router();
import { io } from "../server.js";
import { prisma } from "../prisma.js";
import { upload } from "../utils/imageUpload.js";
import { authentication } from "../middlewares/authMiddleware.js";
/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new Post
 *     security:
 *       - BearerAuth: []
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload. Acceptable formats are JPEG, PNG, and GIF.
 *               content:
 *                  type: string
 *                  description: User's post content
 *     responses:
 *       201:
 *         description: Post created successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User does not have required role
 *       500:
 *         description: Server Error
 */
router.post("/", authentication, upload.single("image"), async (req, res) => {
  const { userId } = req.user;
  const { content } = req.body;
  try {
   
    const newPost = await prisma.post.create({
      data: { 
        content: content,
        image: req.file? req.file.path: null,
        authorId: parseInt(userId) 
      },
    });
    io.emit("newPost", newPost);
    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
      user: req.user
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server Error" });
  }
});/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update a post(only by post owner and admin)
 *     security:
 *      - BearerAuth: []
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: User's content address
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server Error
 */ router.put("/:id", authentication, async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.userId;
    const userRole = req.user.role;

    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.authorId !== userId && userRole !== "admin") {
      return res.status(403).json({
        error: "Forbidden - You do not have permission to update this post",
      });
    }

    const updatedPost = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        content: content,
      },
    });

    io.emit("updatePost", updatedPost);
    res.json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update post" });
  }
});
/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a post by ID(only by post owner and admin)
 *     security:
 *      - BearerAuth: []
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Post ID
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server Error
 */

router.delete("/:id", authentication, async (req, res) => {
  const { id } = req.params;
  const { userId, role } = req.user;
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
  });

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  if (post.authorId !== userId && role !== "admin") {
    return res.status(403).json({
      error: "Forbidden - You do not have permission to delete this post",
    });
  }
  await prisma.post.delete({
    where: { id: parseInt(id) },
  });
  res.json({ message: "Post deleted" });
});
/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: A list of posts
 *       500:
 *         description: Server Error
 *
 */
router.get("/", async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "asc",
      },
      include: {
        author: {
          select: {
            username: true,
          },
        },
        comments: {
          select: {
            content: true,
            author: {
              select: {
                username: true,
                role: true,
                email: true,
              },
            },
          },
        },
        likes: true,
      },
    });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get single post by id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Post Id
 *     responses:
 *       200:
 *         description: a single post
 *       500:
 *         description: Server Error
 *
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await prisma.post.findFirst({
      where: {
        id: parseInt(id),
      },
      include: {
        author: {
          select: {
            username: true,
            role: true,
            email: true,
          },
        },
        comments: {
          select: {
            content: true,
            author: {
              select: {
                username: true,
                role: true,
                email: true,
              },
            },
          },
        },
        likes: true,
      },
    });

    res.json(posts);
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "Server Error" });
  }
});

/**
 * @swagger
 * /api/posts/mypost/posts:
 *   get:
 *     summary: Get all my posts
 *     tags: [Posts]
 *     security:
 *      - BearerAuth: []
 *     responses:
 *       200:
 *         description:  posts of mine
 *       500:
 *         description: Server Error happened
 *
 */
router.get("/mypost/posts", authentication, async (req, res) => {
  const { userId } = req.user;
  console.log(userId, "this is my id");
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: parseInt(userId),
      },
      include: {
        author: {
          select: {
            username: true,
            email: true,
          },
        },
      },
    });

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error hello", err });
  }
});

/**
 * @swagger
 * /api/posts/by-author/{authorId}:
 *   get:
 *     summary: Get  posts by author id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: authorId
 *         required: true
 *         schema:
 *           type: integer
 *           description: author Id
 *     responses:
 *       200:
 *         description:  posts
 *       500:
 *         description: Server Error
 *
 */
router.get("/by-author/:authorId", async (req, res) => {
  const { authorId } = req.params;
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: parseInt(authorId),
      },
      include: {
        author: {
          select: {
            username: true,
            email: true,
          },
        },
      },
    });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
