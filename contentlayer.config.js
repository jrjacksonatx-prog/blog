import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "string", required: true }, // e.g., "2025-11-05"
    summary: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, required: false },
    published: { type: "boolean", required: false, default: true },
  },
  computedFields: {
    // e.g., "hello-world"
    slugAsParams: {
      type: "string",
      resolve: (doc) =>
        doc._raw.flattenedPath.replace(/^posts\//, ""),
    },
    // e.g., "/posts/hello-world"
    slug: {
      type: "string",
      resolve: (doc) =>
        `/posts/${doc._raw.flattenedPath.replace(/^posts\//, "")}`,
    },
    url: {
      type: "string",
      resolve: (doc) =>
        `/posts/${doc._raw.flattenedPath.replace(/^posts\//, "")}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "./content", // MDX lives in ./content/posts/*.mdx
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
    ],
  },
});

