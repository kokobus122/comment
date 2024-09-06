import { Post } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { FC } from "react";
import ReplyComment from "./ReplyComment";
import { db } from "@/lib/db";
import Comments from "./Comments";
import Image from "next/image";

interface PostProps {
  post: Post;
}

const UploadedPost: FC<PostProps> = async ({ post }) => {
  const comments = await db.comment.findMany({
    where: {
      postId: post.id,
    },
  });
  return (
    <li className="bg-gray-300/50 p-1 my-2 rounded-sm">
      <div className="flex gap-2">
        <Image
          className="rounded-full"
          src={post.avatar}
          alt="avatar"
          width={50}
          height={50}
        />
        <div>
          <p className="font-semibold">{post.author}</p>
          <span className="text-gray-500 text-sm">
            {formatDistanceToNow(new Date(post.createdAt || ""), {
              addSuffix: true,
            }) || "no date"}
          </span>
        </div>
      </div>
      <h1 className="font-semibold text-xl">{post.title}</h1>
      <p>{post.content}</p>

      <ReplyComment post={post} />
      {comments.map((comment) => (
        <Comments key={comment.id} comment={comment} />
      ))}
    </li>
  );
};

export default UploadedPost;
