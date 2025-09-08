import { useParams, useNavigate } from "react-router";
import { useGetPostByUserId, useGetUserbyId } from "@/api";
import { Loader } from "@/components/ui/loader";
import { ArrowLeft } from "lucide-react";
import AddNewPost from "@/components/AddNewPost";
import PostCard from "@/components/PostCard";
import { useMemo, useCallback } from "react";
import { Post } from "@/types";

export default function Posts() {
  const params = useParams();
  const navigate = useNavigate();

  const { data: posts, isLoading } = useGetPostByUserId(
    params.user_id as string
  );
  const { data: user } = useGetUserbyId(params.user_id as string);

  const sortedPosts = useMemo<Post[]>(() => {
    if (!posts) return [];
    return [...posts].sort((a: Post, b: Post) => {
      const dateA = new Date(a.created_at || a.updatedAt || "").getTime();
      const dateB = new Date(b.created_at || b.updatedAt || "").getTime();
      return dateB - dateA;
    });
  }, [posts]);

  const handleBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center min-h-screen mx-auto items-center w-full py-10">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen space-y-6 py-12">
      <div
        className="flex items-center text-sm cursor-pointer text-gray-600 hover:text-gray-800 transition-colors mb-2"
        onClick={handleBackClick}
      >
        <ArrowLeft className="mr-2 size-4" />
        <span>Back to Users</span>
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">{user?.name}</h1>
        <div className="flex items-center gap-x-1 text-gray-600">
          <p className="text-sm">{user?.email}</p>
          <svg
            width="4"
            height="4"
            viewBox="0 0 4 4"
            className="mx-2 my-auto text-gray-400"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="2" cy="2" r="2" />
          </svg>
          <p className="text-sm">{sortedPosts?.length} Posts</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        <AddNewPost />
        {sortedPosts?.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
