import { getPostData, getAllPostSlugs } from "@/lib/posts";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths.map((path) => ({
    slug: path.params.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const postData = await getPostData(slug);

  if (!postData) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: postData.title,
  };
}

export default async function Post({ params }: Props) {
  const { slug } = await params;
  let postData;
  try {
    postData = await getPostData(slug);
  } catch (error) {
    notFound();
  }

  return (
    <article className="page-container mt-16">
      <h1 className="mb-2 text-3xl font-extrabold">{postData.title}</h1>
      <div className="mb-16 text-cTextDim">
        <time dateTime={postData.date}>{formatDate(postData.date)}</time>
      </div>
      <div
        className="prose-content mb-32"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml || "" }}
      />
    </article>
  );
}
