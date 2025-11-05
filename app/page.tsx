import Link from "next/link";
import { allPosts } from "contentlayer/generated";

export default function HomePage() {
  const posts = allPosts.filter(p => p.published !== false)
                        .sort((a,b) => a.date > b.date ? -1 : 1);
  return (
    <main className="max-w-3xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold mb-6">My MDX Blog</h1>
      <ul className="space-y-4">
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slugAsParams}`} className="text-xl font-semibold underline">
              {post.title}
            </Link>
            <p className="text-sm text-gray-500">{post.summary}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

