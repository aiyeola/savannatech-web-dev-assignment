import { connection } from "../connection";
import { selectPostsTemplate } from "./query-templates";
import { Post } from "./types";
import { v4 as uuidv4 } from "uuid";

export const getPosts = (userId: string): Promise<Post[]> =>
  new Promise((resolve, reject) => {
    connection.all(selectPostsTemplate, [userId], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results as Post[]);
    });
  });

export const deletePost = (postId: string): Promise<boolean> =>
  new Promise((resolve, reject) => {
    connection.run(
      "DELETE FROM posts WHERE id = ?",
      [postId],
      function (error) {
        if (error) {
          reject(error);
        } else {
          resolve(this.changes > 0);
        }
      }
    );
  });

export const createPost = (
  userId: string,
  title: string,
  body: string
): Promise<Post> =>
  new Promise((resolve, reject) => {
    const createdAt = new Date().toISOString();
    const id = uuidv4();

    connection.run(
      "INSERT INTO posts (id, user_id, title, body, created_at) VALUES (?, ?, ?, ?, ?)",
      [id, userId, title, body, createdAt],
      function (error) {
        if (error) {
          reject(error);
        } else {
          resolve({
            id,
            user_id: userId,
            title,
            body,
            created_at: createdAt,
          });
        }
      }
    );
  });
