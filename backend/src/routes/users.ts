import { Router, Request, Response } from "express";

import { getUsers, getUsersCount } from "../db/users/users";

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

export default router;
