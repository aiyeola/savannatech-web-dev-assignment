import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2Icon } from "lucide-react";
import { useDeletePost } from "@/api";
import { toast } from "sonner";
import { useParams } from "react-router";

interface DeletePostProps {
  postId: string;
}

export default function DeletePost({ postId }: DeletePostProps) {
  const params = useParams();

  const [open, setOpen] = useState(false);

  const { mutateAsync: deletePost, isPending } = useDeletePost(
    params?.user_id as string
  );

  const handleDeleteClick = () => setOpen(true);
  const handleCancel = () => setOpen(false);

  const handleConfirm = async () => {
    try {
      const response = await deletePost(postId);
      if (response) {
        toast.success(response?.message);
        setOpen(false);
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
  };

  return (
    <>
      <button
        className="text-red-400 cursor-pointer hover:text-red-700"
        onClick={handleDeleteClick}
        title="Delete Post"
      >
        <Trash2Icon className="size-4" />
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this post?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              isLoading={isPending}
              onClick={handleConfirm}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
