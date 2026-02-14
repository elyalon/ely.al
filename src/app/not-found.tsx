import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-container">
      <h1 className="mb-4 text-4xl font-bold">404 | Not Found</h1>
      <p>
        Could not find the requested resource.{" "}
        <Link href="/" className="common-link">
          Return Home
        </Link>
      </p>
    </div>
  );
}
