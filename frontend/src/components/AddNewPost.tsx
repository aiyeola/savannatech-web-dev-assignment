import { useState, useCallback } from "react";
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
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less"),
  body: z
    .string()
    .min(1, "Content is required")
    .max(500, "Content must be 500 characters or less"),
});

type PostFormValues = z.infer<typeof postSchema>;

export default function AddNewPost() {
  const [open, setOpen] = useState<boolean>(false);
  const params = useParams<{ user_id: string }>();
  const { mutateAsync: createPost, isPending } = useCreatePost();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
  });

  const watchedTitle = watch("title", "");
  const watchedBody = watch("body", "");

  const handleDialogClose = useCallback(() => {
    setOpen(false);
    reset();
  }, [reset]);

  const onSubmit = useCallback(
    async (data: PostFormValues) => {
      try {
        const response = await createPost({
          ...data,
          userId: params?.user_id as string,
        });

        if (response) {
          toast.success(response?.message);
          handleDialogClose();
        }
      } catch (error) {
        if (error) {
          const errorMessage =
            typeof error === "object" && error !== null && "error" in error
              ? (error as { error?: string }).error
              : "An error occurred while creating the post";
          toast.error(errorMessage);
        }
      }
    },
    [createPost, params?.user_id, handleDialogClose]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 h-64 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition-colors">
          <PlusCircle className="w-12 h-12 text-gray-400 mb-3" />
          <span className="text-sm font-medium text-gray-600">New Post</span>
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-hidden">
        <DialogHeader className="font-semibold">New Post</DialogHeader>
        <div className="h-auto overflow-y-auto pr-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="relative">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="title" className="block text-sm font-medium">
                  Post Title
                </label>
                <span className="text-xs text-gray-500">
                  {watchedTitle.length}/100
                </span>
              </div>
              <Input id="title" {...register("title")} maxLength={100} />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="relative">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="body" className="block text-sm font-medium">
                  Post Content
                </label>
                <span className="text-xs text-gray-500">
                  {watchedBody.length}/500
                </span>
              </div>
              <Textarea
                id="body"
                {...register("body")}
                rows={4}
                maxLength={500}
              />
              {errors.body && (
                <p className="text-red-500 text-xs mt-1">
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
