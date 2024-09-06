"use client";
import { createPost } from "@/lib/api";
import { FormEventHandler, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useToast } from "@/hooks/use-toast";

const CreatePost = () => {
  const router = useRouter();
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const { user, isAuthenticated } = useKindeBrowserClient();
  const { toast } = useToast();

  const handleSubmitCreatePost: FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    try {
      if (!isAuthenticated) {
        return toast({
          title: "Unauthorized",
          description: "You need to login to create a post",
          variant: "destructive",
        });
      }
      await createPost({
        title: postTitle,
        content: postContent,
        author: user?.given_name || "",
        authorId: user?.id || "",
        avatar: user?.picture || "",
        createdAt: new Date(),
        id: uuidv4(),
      });
      router.refresh();
      return toast({
        title: "Post uploaded",
        description: "Your post has been uploaded successfully",
        variant: "default",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full my-4 bg-orange-500 hover:bg-orange-500/90 shadow text-primary-foreground text-sm rounded-md h-10 font-medium">
        Create post
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new post</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmitCreatePost}>
              <input
                type="text"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                className="h-8 mx-1 pl-1"
                placeholder="Title"
              />
              <input
                type="text"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="h-8 mx-1 pl-1"
                placeholder="Content"
              />
              <DialogClose asChild>
                <Button variant="default" type="submit">
                  Submit
                </Button>
              </DialogClose>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
