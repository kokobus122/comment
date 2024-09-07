"use server"
import { Comment, Post } from "@prisma/client";
import { db } from "./db";

export const getAllPosts = async (): Promise<Post[]> => {
    return await db.post.findMany();
}

export const createPost = async (post: Post): Promise<Post> => {
    return await db.post.create({ data: post });
}

export const deletePost = async (id: string): Promise<void> => {
  // Delete all comments that match the post id to clear up space in the database
  await db.comment.deleteMany({ where: { postId: id } });

  // Delete the post
  await db.post.delete({ where: { id } });
}

export const deleteComment = async (id: string): Promise<void> => {
  await db.comment.delete({ where: { id } });
}

export const createComment = async (comment: Comment): Promise<Comment> => {
    const { postId, ...commentData } = comment;
    return await db.comment.create({
      data: {
        ...commentData,
        post: { connect: { id: postId } }
      }
    });
  }

