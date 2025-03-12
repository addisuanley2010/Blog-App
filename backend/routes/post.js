import express from "express";
const router = express.Router();
import { io } from "../server.js";
import { prisma } from "../prisma.js";
import {
  authentication,
  authorization,
} from "../middlewares/authMiddleware.js";

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new Post
 *     tags: [Posts]
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             content:
 *               type: string
 *               description: the content of the post
 *             userId:
 *               type: string
 *               description: User Id of the post author
 *     responses:
 *       201:
 *         description: post created successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User does not have required role
 *       500:
 *         description: Server Error
 */
router.post( "/",
  async (req, res) => {
    const { content, userId } = req.body;
    const post = await prisma.post.create({
      data: { content, authorId: parseInt(userId) },
    });
    io.emit("newPost", post);
    res.json({ post, user: req.user });
  }
);
/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update a post
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
*/router.put("/:id",  async (req, res) => {
  try {
    const { id } = req.params;

    const { content } = req.body;  
    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: { 
        content: content,
      },
    });
    io.emit("updatePost", post);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    res.json(post);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to update post" });
  }
});
/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
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

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
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
 *     security:
 *      - BearerAuth: []
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: A list of posts
 *       500:
 *         description: Server Error
 *
 */
router.get(
  "/",authentication,
  async (req, res) => {
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
        },
      });

      res.json(posts);
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  }
);

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
router.get(
  "/:id",
  async (req, res) => {
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
              email:true
            },
          },
          comments: {
            select: {
              content: true,
              author: {
                select: {
                  username: true,
                  role: true,
                  email:true
                }
              }
            },
           
          }
        },
      });

      res.json(posts);
    } catch (err) {
      console.log(err)

      res.status(500).json({ message: "Server Error" });
    }
  }
);

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
router.get(
  "/mypost/posts",authentication,
  async (req, res) => {
    const { userId } = req.user;
    console.log(userId,"this is my id")
    try {
      const posts = await prisma.post.findMany({
        where: {
          authorId: parseInt(userId),
        },
        include: {
          author: {
            select: {
              username: true,
              email:true
            },
          },
        },
      });

      res.json(posts);
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: "Server Error hello",err });
    }
  }
);


/**
 * @swagger
 * /api/posts/by-author/{authorId}:
 *   get:
 *     summary: Get  posts by author id
 *     tags: [Posts]
 *     security:
 *      - BearerAuth: []
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
router.get(
  "/by-author/:authorId",authentication,
  async (req, res) => {
    const { authorId } = req.params;
    console.log(authorId)
    try {
      const posts = await prisma.post.findMany({
        where: {
          authorId: parseInt(authorId),
        },
        include: {
          author: {
            select: {
              username: true,
              email:true
            },
          },
        },
      });

      res.json(posts);
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  }
);

export default router;
