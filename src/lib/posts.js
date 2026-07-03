import fm from "front-matter";

// Eagerly loads every .md file in src/posts as a raw string at build time.
// No fetch, no backend — the content is bundled directly.
const modules = import.meta.glob("../posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const posts = Object.entries(modules).map(([path, raw]) => {
  const slug = path.split("/").pop().replace(".md", "");
  const { attributes, body } = fm(raw);
  return { slug, content: body, ...attributes };
});

posts.sort((a, b) => new Date(b.date) - new Date(a.date));

export function getAllPosts() {
  return posts;
}

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug);
}