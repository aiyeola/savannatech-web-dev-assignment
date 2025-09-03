import { Router, Request, Response } from "express";

import { getUsers, getUsersCount, getUserById } from "../db/users/users";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const pageNumber = Number(req.query.pageNumber) || 0;
  const pageSize = Number(req.query.pageSize) || 4;
  if (pageNumber < 0 || pageSize < 1) {
    res.status(400).send({ message: "Invalid page number or page size" });
    return;
  }

  try {
    const users = await getUsers(pageNumber, pageSize);
    const totalCount = await getUsersCount();
    const totalPages = Math.ceil(totalCount / pageSize);
    res.send({ users, pageNumber, pageSize, totalPages });
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch users" });
  }
});

router.get("/count", async (req: Request, res: Response) => {
  const count = await getUsersCount();
  res.send({ count });
});

router.get("/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;
  if (!userId) {
    res.status(400).send({ message: "Invalid user ID" });
    return;
  }
  try {
    const user = await getUserById(userId);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch user" });
  }
});

export default router;
