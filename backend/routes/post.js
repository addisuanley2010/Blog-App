import express from "express"
const router = express.Router()
import { io } from "../server.js"
import { prisma } from "../prisma.js";


// Add Post
router.post('/', async (req, res) => {
  const { content, userId } = req.body;
    const post = await prisma.post.create({
      data: { content, authorId: parseInt(userId) },
    });
    io.emit('newPost', post); 
    // res.json(post);
});


  // Update Post
  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: { content },
    });
    io.emit('updatePost', post); 
    res.json(post);
  });
  
  // Delete Post
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.post.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Post deleted' });
  });
  
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
    },
      
    });

    
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

  
  export default router