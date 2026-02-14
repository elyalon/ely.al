"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          aria-label="Choose theme"
          className="grid aspect-square h-full w-full place-items-center rounded-md hover:bg-cBgMainHover active:bg-cBgMainActive data-[state=open]:bg-cBgMainActive"
        >
          <Moon strokeWidth={2.5} className="not-dark:hidden" />
          <Sun strokeWidth={2.5} className="dark:hidden" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={2}
          className="z-50 origin-(--radix-dropdown-menu-content-transform-origin) animate-in rounded-md border border-cBorder bg-cBgMain p-1.5 text-cText shadow-md duration-100 fade-in-0 zoom-in-95 slide-in-from-top-2"
        >
          <DropdownMenu.Item
            onClick={() => setTheme("light")}
            className="cursor-pointer rounded-md px-3 py-2 font-bold outline-none select-none hover:bg-cBgMainHover focus:bg-cBgMainHover active:bg-cBgMainActive"
          >
            <Sun
              strokeWidth={2.5}
              className="mr-0.5 inline-block size-4.5 -translate-y-px"
            />{" "}
            Light
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={() => setTheme("dark")}
            className="cursor-pointer rounded-md px-3 py-2 font-bold outline-none select-none hover:bg-cBgMainHover focus:bg-cBgMainHover active:bg-cBgMainActive"
          >
            <Moon
              strokeWidth={2.5}
              className="mr-0.5 inline-block size-4.5 -translate-y-px"
            />{" "}
            Dark
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={() => setTheme("system")}
            className="cursor-pointer rounded-md px-3 py-2 font-bold outline-none select-none hover:bg-cBgMainHover focus:bg-cBgMainHover active:bg-cBgMainActive"
          >
            <Laptop
              strokeWidth={2.5}
              className="mr-0.5 inline-block size-4.5 -translate-y-px"
            />{" "}
            System
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
