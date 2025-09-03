import { connection } from "../connection";
import { selectPostsTemplate } from "./query-tamplates";
import { Post } from "./types";

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
