"use client";
import { Post } from "@prisma/client";
import { FC, FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { createComment } from "@/lib/api";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Reply } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

interface CommentProps {
  post: Post;
}

const ReplyComment: FC<CommentProps> = ({ post }) => {
  const router = useRouter();
  const [commentReply, setCommentReply] = useState<string>("");
  const { user, isAuthenticated } = useKindeBrowserClient();

  const handleSubmitCreateComment: FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    try {
      if (!isAuthenticated) {
        return new Response("Unauthorized", { status: 401 });
      }
      await createComment({
        text: commentReply,
        author: user?.given_name || "",
        authorId: user?.id || "",
        avatar: user?.picture || "",
        id: uuidv4(),
        postId: post.id,
        createdAt: new Date(),
      });
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <div className="inline-flex text-sm">
          <span className="flex gap-1 items-center p-1 hover:cursor-pointer hover:bg-gray-300 rounded-md">
            <Reply size={18} /> <p>Reply</p>
          </span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reply to this post</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmitCreateComment}>
              <input
                type="text"
                value={commentReply}
                onChange={(e) => setCommentReply(e.target.value)}
                className="h-8 mx-1 pl-1"
                placeholder="Comment"
              />
              <DialogClose asChild>
                <Button variant="default" type="submit">
                  Reply
                </Button>
              </DialogClose>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ReplyComment;
