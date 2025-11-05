import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allPosts } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import Link from "next/link";

export function generateStaticParams() {
  return allPosts.filter(p => p.published !== false)
                 .map(p => ({ slug: p.slugAsParams }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = allPosts.find(p => p.slugAsParams === params.slug);
  return post ? { title: `${post.title} | Blog`, description: post.summary } : {};
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = allPosts.find(p => p.slugAsParams === params.slug && p.published !== false);
  if (!post) return notFound();
  const MDX = useMDXComponent(post.body.code);

  return (
    <article className="prose dark:prose-invert max-w-3xl mx-auto px-5 py-10">
      <header className="mb-8">
        <Link href="/" className="text-sm underline">← Back to home</Link>
        <h1 className="mt-3 text-4xl font-bold">{post.title}</h1>
        <p className="text-sm text-gray-500">{post.date}</p>
      </header>
      <MDX />
    </article>
  );
}

