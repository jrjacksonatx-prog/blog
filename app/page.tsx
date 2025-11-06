import Link from "next/link";
import { allPosts } from "contentlayer/generated";

export default function HomePage() {
  const posts = allPosts
    .filter((p) => p.published !== false)
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold mb-2">My MDX Blog</h1>
          <p className="text-gray-500">
            Thoughts, notes, and experiments from James Jackson.
          </p>
        </div>

        {/* SonarCloud Badge */}
        <div className="mt-4 sm:mt-0">
          <a
            href="https://sonarcloud.io/project/overview?id=jrjacksonatx-prog_blog"
            target="_blank"
            rel="noopener noreferrer"
            title="View SonarCloud Quality Report"
          >
            <img
              src="https://sonarcloud.io/api/project_badges/measure?project=jrjacksonatx-prog_blog&metric=alert_status"
              alt="SonarCloud Quality Gate"
              className="h-8"
            />
          </a>
        </div>
      </header>

      {/* Blog Posts List */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
          Latest Posts
        </h2>

        {posts.length === 0 ? (
          <p className="text-gray-500">No posts yet. Check back soon!</p>
        ) : (
          <ul className="space-y-5">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/posts/${post.slugAsParams}`}
                  className="text-xl font-semibold text-blue-600 hover:underline"
                >
                  {post.title}
                </Link>
                <p className="text-sm text-gray-500">{post.summary}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Footer */}
      <footer className="mt-12 border-t pt-6 text-sm text-gray-500 text-center">
        <p>
          Built with Next.js, MDX, and Contentlayer. <br />
          <a
            href="https://sonarcloud.io/project/overview?id=jrjacksonatx-prog_blog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View full SonarCloud analysis →
          </a>
        </p>
      </footer>
    </main>
  );
}

