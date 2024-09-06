import { Comment } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { FC } from "react";

interface CommentProps {
  comment: Comment;
}

const Comments: FC<CommentProps> = ({ comment }) => {
  return (
    <div className="bg-gray-300/70 p-1 my-2 rounded-md sm:ml-5">
      <div className="flex gap-2">
        <Image
          className="rounded-full"
          src={comment.avatar}
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
      <h1>{comment.text}</h1>
    </div>
  );
};

export default Comments;
