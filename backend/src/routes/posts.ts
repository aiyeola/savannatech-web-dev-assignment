import { Router, Request, Response } from "express";
import { deletePost, getPosts } from "../db/posts/posts";

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

export default router;
