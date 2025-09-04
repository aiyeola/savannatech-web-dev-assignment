import { useParams, useNavigate } from "react-router";
import { useGetPostByUserId, useGetUserbyId } from "@/api";
import { Loader } from "@/components/ui/loader";
import { ArrowLeft } from "lucide-react";
import AddNewPost from "@/components/AddNewPost";
import DeletePost from "@/components/DeletePost";

export default function Posts() {
  const params = useParams();
  const navigate = useNavigate();

  const { data: posts, isLoading } = useGetPostByUserId(
    params.user_id as string
  );
  const { data: user } = useGetUserbyId(params.user_id as string);

  if (isLoading) {
    return (
      <div className="flex justify-center min-h-screen mx-auto items-center w-full py-10">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen space-y-5">
      <div
        className="flex items-center text-sm cursor-pointer text-[#535862]"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 size-5" />
        <span>Back to Users</span>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-[#181D27]">{user?.name}</h1>
        <div className="flex gap-x-1">
          <p>{user?.email}</p>
          <svg
            width="4"
            height="4"
            viewBox="0 0 4 4"
            className="mx-2 my-auto"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="2" cy="2" r="2" />
          </svg>
          <p>{posts?.length} Posts</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <AddNewPost />
        {posts?.map((post: Record<string, string>) => (
          <div
            key={post.id}
            className="border rounded-lg p-4 flex flex-col justify-between"
          >
            <DeletePost postId={post.id} />
            <h2 className="text-lg font-medium mb-2 text-gray-600">
              {post.title}
            </h2>
            <p className="flex-1 text-gray-700 mb-4 line-clamp-7">
              {post.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
