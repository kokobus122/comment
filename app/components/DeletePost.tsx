"use client";
import { deletePost } from "@/lib/api";
import { Post } from "@prisma/client";
import { Trash } from "lucide-react";
import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

interface DeletePostProps {
  post: Post;
}

const DeletePost: FC<DeletePostProps> = ({ post }) => {
  const { user } = useKindeBrowserClient();

  const router = useRouter();

  const handleDeletePost = async (id: string) => {
    try {
      if (user?.id !== post.authorId) {
        return new Response("You are not authorized to delete this post", {
          status: 401,
        });
      }
      await deletePost(id);
      router.refresh();

      return new Response("OK");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Trash size={18} className="text-red-500 mr-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove post</DialogTitle>
          <DialogDescription>
            Are you sure you wish to delete this post? Deleting this post will
            also remove its corresponding comments.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => handleDeletePost(post.id)}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePost;
