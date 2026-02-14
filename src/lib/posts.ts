import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeExternalLinks from "rehype-external-links";
import rehypeShiki from "@shikijs/rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";
import { transformerLanguageIndicator } from "./shiki-transformers";

const postsDirectory = path.join(process.cwd(), "_posts");

export interface PostData {
  slug: string;
  title: string;
  date: string;
  contentHtml?: string;
  [key: string]: unknown;
}

function formatDate(date: string | Date): string {
  if (date instanceof Date) {
    return date.toISOString().split("T")[0];
  }
  return date;
}

export function getSortedPostsData(): PostData[] {
  // Get file names under /_posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get slug
    const slug = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    const { title, date, ...rest } = matterResult.data;

    // Combine the data with the slug
    return {
      slug,
      title: title as string,
      date: formatDate(date as string | Date),
      ...rest,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  const { title, date, ...rest } = matterResult.data;

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(remarkRehype)
    .use(rehypeExternalLinks, {
      rel: ["nofollow"],
    })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: {
        className: ["heading-link"],
      },
    })
    .use(rehypeShiki, {
      theme: "vitesse-dark",
      transformers: [transformerLanguageIndicator()],
    })
    .use(rehypeStringify)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the slug and contentHtml
  return {
    slug,
    contentHtml,
    title: title as string,
    date: formatDate(date as string | Date),
    ...rest,
  };
}
