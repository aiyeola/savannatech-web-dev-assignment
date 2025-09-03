import { useParams } from "react-router";
import { useGetPostByUserId, useGetUserbyId } from "@/api";
import { Loader } from "@/components/ui/loader";

export default function Posts() {
  const params = useParams();

  const { data, isLoading } = useGetPostByUserId(params.user_id as string);
  const { data: user } = useGetUserbyId(params.user_id as string);
  console.log("user: ", user);
  console.log("data: ", data);

  if (isLoading) {
    return (
      <div className="flex justify-center min-h-screen mx-auto items-center w-full py-10">
        <Loader />
      </div>
    );
  }

  return <div className="min-h-screen"></div>;
}
