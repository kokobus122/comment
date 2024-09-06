import { Post } from "@prisma/client";
import { FC } from "react";
import UploadedPost from "./UploadedPost";

interface PostListProps {
  posts: Post[];
}

const PostList: FC<PostListProps> = ({ posts }) => {
  return (
    <ul>
      {posts && posts.map((post) => (
        <UploadedPost key={post.id} post={post} />
      ))}
    </ul>
  );
};

export default PostList;
