"use client";
import { Comment } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { FC } from "react";
import PlaceholderImg from "@/app/images/placeholder.jpg";
import { Trash } from "lucide-react";
import { deleteComment } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CommentProps {
  comment: Comment;
}

const Comments: FC<CommentProps> = ({ comment }) => {
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  const handleDeleteComment = async (id: string) => {
    try {
      if (user?.id !== comment.authorId) {
        return new Response("You are not authorized to delete this comment", {
          status: 401,
        });
      }
      await deleteComment(id);
      router.refresh();

      return new Response("OK");
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="bg-gray-300/70 p-1 my-2 rounded-md sm:ml-5">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Image
            className="rounded-full"
            src={comment.avatar || PlaceholderImg}
            alt="avatar"
            width={50}
            height={50}
          />
          <div>
            <p className="font-semibold">{comment.author}</p>
            <span className="text-gray-500 text-sm">
              {formatDistanceToNow(new Date(comment.createdAt || ""), {
                addSuffix: true,
              }) || "no date"}
            </span>
          </div>
        </div>
        {user?.id === comment.authorId ? (
          <Dialog>
            <DialogTrigger>
              <Trash size={18} className="text-red-500 mr-2" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Remove post</DialogTitle>
                <DialogDescription>
                  Are you sure you wish to delete this post? Deleting this post
                  will also remove its corresponding comments.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : null}
      </div>
      <h1>{comment.text}</h1>
    </div>
  );
};

export default Comments;
