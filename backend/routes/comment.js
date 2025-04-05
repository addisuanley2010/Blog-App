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
 * /api/comments/{postId}:
 *   post:
 *     summary: Create a new comments
 *     security:
 *      - BearerAuth: []
 *     tags: [comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *          type: integer
 *          description: Post Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Comment for this post

 *     responses:
 *       201:
 *         description: comments created successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User does not have required role
 *       500:
 *         description: Server Error
 */
router.post("/:postId", authentication, async (req, res) => {
  const { userId } = req.user;
  const { content } = req.body;
  const { postId } = req.params;

  try {
    const comment = await prisma.coment.create({
      data: { content, authorId: parseInt(userId), postId: parseInt(postId) },
    });
    res.json({message:"comment added!",success:true, comment, user: req.user });
  } catch (err) {
    res.status(500).json({ message: "Server error" ,success:false});
  }
});

export default router;
