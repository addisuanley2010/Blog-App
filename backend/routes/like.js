import express from "express";
const router = express.Router();
import { prisma } from "../prisma.js";
import { authentication } from "../middlewares/authMiddleware.js";

/**
 * @swagger
 * /api/likes/{postId}:
 *   post:
 *     summary: Create a new likes
 *     security:
 *      - BearerAuth: []
 *     tags: [likes]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *          type: integer
 *          description: Post Id
 *     responses:
 *       201:
 *         description: likes created successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User does not have required role
 *       500:
 *         description: Server Error
 */
router.post("/:postId", authentication, async (req, res) => {
  const { userId } = req.user;
  const { postId } = req.params;

  try {
    const isLiked = await prisma.like.findFirst({
      where: {
            userId: parseInt(userId),
            postId: parseInt(postId),
      },
    });
    if (!isLiked) {
      const like = await prisma.like.create({
        data: { userId: parseInt(userId), postId: parseInt(postId) },
      });
      res.json({message:"you like the post", like, user: req.user });
    } else {
      const deletedLike = await prisma.like.delete({
        where: { id: parseInt(isLiked.id) },
      });
      res.json({ message: "You Unlike the post successfully!", deletedLike });
    }
  } catch (err) {
      console.log(err)
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
