import { memo } from "react";
import DeletePost from "@/components/DeletePost";
import { Post } from "@/types";

interface PostCardProps {
  post: Post;
}

const PostCard = memo<PostCardProps>(({ post }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 flex flex-col justify-between h-64 shadow-sm hover:shadow-md transition-shadow">
      <DeletePost postId={post.id} />
      <div className="flex-1 overflow-ellipsis">
        <h2 className="text-lg font-semibold mb-3 text-gray-900 line-clamp-2">
          {post.title}
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-6">
          {post.body}
        </p>
      </div>
    </div>
  );
});

PostCard.displayName = "PostCard";

export default PostCard;
