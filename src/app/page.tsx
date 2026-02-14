import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { Mail } from "lucide-react";

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="page-container mt-16">
      <div>
        <h1 className="mb-4 border-b border-cBorder pb-2 text-3xl font-extrabold">
          About Me
        </h1>
        <p className="mb-4">
          My name is Ely (pronounced <em>E-Lie</em>) Alon. I&apos;m a
          21-year-old engineer from Israel. I specialize in web development,
          design, and UI/UX.
        </p>
        <ul className="mb-12 space-y-2.5 font-medium">
          <li>
            <a
              href="https://codeberg.org/alon"
              className="hover:text-cTextLink"
            >
              <svg
                viewBox="0 0 24 24"
                className="mr-0.75 inline-block size-5 -translate-y-px"
              >
                <path
                  fill="currentColor"
                  d="M12 1A11 11 0 0 0 1 12a11 11 0 0 0 1.7 6.4L12 6l9.3 12.4A11 11 0 0 0 23 12 11 11 0 0 0 12 1Z"
                />
                <path
                  fill="currentColor"
                  className="opacity-50"
                  d="M21.3 18.4 12 6l4.4 16.8a11 11 0 0 0 4.9-4.4Z"
                />
              </svg>{" "}
              Codeberg
            </a>{" "}
            <span className="text-cTextDim">(alon)</span>
          </li>
          <li>
            <a
              className="hover:text-cTextLink"
              href="mailto:elyalon345@gmail.com"
            >
              <Mail className="mr-0.75 inline-block size-5 -translate-y-px" />{" "}
              Email
            </a>{" "}
            <span className="text-cTextDim">(elyalon345@gmail.com)</span>
          </li>
        </ul>
        <h2 className="mb-4 border-b border-cBorder pb-2 text-3xl font-extrabold">
          Posts
        </h2>
        <ul className="space-y-4">
          {allPostsData.map(({ slug, date, title }) => (
            <li key={slug} className="group">
              <Link href={`/posts/${slug}`} className="block outline-offset-4">
                <h2 className="text-xl font-semibold group-hover:text-cTextLink">
                  {title}
                </h2>
                <small className="text-xs text-cTextDim">
                  {formatDate(date)}
                </small>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
