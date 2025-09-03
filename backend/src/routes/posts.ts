import { Router, Request, Response } from "express";
import { deletePost, getPosts, createPost } from "../db/posts/posts";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const userId = req.query.userId?.toString();
  if (!userId) {
    res.status(400).send({ error: "userId is required" });
    return;
  }
  const posts = await getPosts(userId);
  res.send(posts);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const postId = req.params.id;
  if (!postId) {
    res.status(400).send({ error: "Post ID is required" });
    return;
  }
  try {
    const deleted = await deletePost(postId);
    if (deleted) {
      res.status(200).send({ message: "Post deleted successfully" });
    } else {
      res.status(404).send({ error: "Post not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to delete post" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { userId, title, body } = req.body;
  if (!userId || typeof userId !== "string") {
    res.status(400).send({ error: "Valid userId is required" });
    return;
  }
  if (!title || typeof title !== "string" || title.trim() === "") {
    res.status(400).send({ error: "title is required" });
    return;
  }
  if (!body || typeof body !== "string" || body.trim() === "") {
    res.status(400).send({ error: "body is required" });
    return;
  }
  try {
    const post = await createPost(userId, title, body);
    res.status(201).send({ post, message: "Post created successfully" });
  } catch (error) {
    res.status(500).send({ error: "Failed to create post" });
  }
});

export default router;
