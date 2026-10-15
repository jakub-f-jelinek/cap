import { parseFrontmatter } from "@/utils/parseFrontmatter.js";

const rawFiles = import.meta.glob("./articles/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const imageModules = import.meta.glob("@/assets/images/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
});

const imageByName = Object.fromEntries(
  Object.entries(imageModules).map(([path, url]) => [
    path.split("/").pop(),
    url,
  ]),
);

export const articles = Object.entries(rawFiles)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw);
    return {
      slug: path.split("/").pop().replace(".md", ""),
      order: data.order ? Number(data.order) : Infinity,
      title: data.title ?? "",
      date: data.date ?? "",
      url: data.url ?? "#",
      excerpt: data.excerpt ?? "",
      hashtag: data.hashtag ?? "",
      image: imageByName[data.image] ?? null,
      content,
    };
  })
  // Lower `order` first; articles without it go last, ordered by slug.
  .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
