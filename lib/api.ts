"use server"
import { Comment, Post } from "@prisma/client";
import { db } from "./db";

export const getAllPosts = async (): Promise<Post[]> => {
    return await db.post.findMany();
}

export const createPost = async (post: Post): Promise<Post> => {
    return await db.post.create({ data: post });
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

