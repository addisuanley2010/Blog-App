import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";
import LikeRouter from "./routes/like.js";
import commetRouter from "./routes/comment.js";


import { swaggerDocs } from "./swaggerOptions.js";
import swaggerUI from "swagger-ui-express";


const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST","PUT","DELETE"]
}
});

app.use(cors());
app.use(express.json());


// Routes
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commetRouter);
app.use("/api/likes", LikeRouter);


// Serve Swagger API documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));



io.on("connection", (socket) => {
  console.log("A user connected "+ socket.id);
});


const PORT = process.env.PORT|| 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
