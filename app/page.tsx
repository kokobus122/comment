import { getAllPosts } from "@/lib/api";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main className="max-w-[1200px] mx-auto">
      <CreatePost />
      <PostList posts={posts} />
    </main>
  );
}

export const revalidate = 0;
