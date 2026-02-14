import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function NavBar() {
  return (
    <div className="flex items-center justify-between border-b border-cBorder bg-cBgMain p-1">
      <div className="h-10">
        <Link
          href="/"
          className="block h-full rounded-md p-1 hover:bg-cBgMainHover active:bg-cBgMainActive"
        >
          <svg viewBox="0 0 330 330" className="h-full p-0.5">
            <path
              d="M227.952 33L289 103.374V169H89V219.962L119.852 249H207.875L241 219.555V207.667H289V241.111L226.125 297H100.815L41 240.703V103.66L99.7422 33H227.952ZM89.0052 121H240.747L206.048 81H122.259L89.0052 121Z"
              fill="currentColor"
            ></path>
          </svg>
        </Link>
      </div>
      <div className="h-10">
        <ThemeToggle />
      </div>
    </div>
  );
}
