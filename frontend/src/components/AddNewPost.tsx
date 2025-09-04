import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useCreatePost } from "@/api";
import { toast } from "sonner";
import { useParams } from "react-router";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Content is required"),
});

type PostFormValues = z.infer<typeof postSchema>;

export default function AddNewPost() {
  const [open, setOpen] = useState(false);

  const params = useParams();

  const { mutateAsync: createPost, isPending } = useCreatePost();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = async (data: PostFormValues) => {
    try {
      await createPost({
        ...data,
        userId: params?.user_id as string,
      });
      toast.success("Post created successfully");
      reset();
      setOpen(false);
    } catch (error) {
      if (error) {
        const errorMessage =
          typeof error === "object" && error !== null && "error" in error
            ? (error as { error?: string }).error
            : "An error occurred while creating the post";
        toast.error(errorMessage);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="border border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
          <span className="text-3xl font-bold text-gray-400">
            <PlusCircle />
          </span>
          <span className="mt-2 text-sm text-gray-600">New Post</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>New Post</DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="relative">
            <label htmlFor="title" className="block text-sm font-medium">
              Post Title
            </label>
            <Input id="title" {...register("title")} />
            {errors.title && (
              <p className="text-red-500 text-xs absolute">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="relative">
            <label htmlFor="body" className="block text-sm font-medium">
              Post Content
            </label>
            <Textarea id="body" {...register("body")} rows={4} />
            {errors.body && (
              <p className="text-red-500 text-xs absolute">
                {errors.body.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <DialogTrigger asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogTrigger>
            <Button isLoading={isPending} type="submit">
              Publish
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
