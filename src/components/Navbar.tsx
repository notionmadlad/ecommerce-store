"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";

export function Nav({ children }: { children: ReactNode }) {
  return (
    <section className="sticky top-0 bg-background z-10 flex justify-center items-center py-4 border-b">
      <div className="h-full max-w-6xl w-full z-[5]">
        <div className="flex justify-between flex-wrap gap-5 mx-10">
          <div className="flex justify-center items-center text-2xl font-semibold">
            ECommerce Store
          </div>
          <div className="flex gap-12">{children}</div>
        </div>
      </div>
    </section>
  );
}

export function NavLink({ className, ...props }: ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const match =
    pathname === props.href ||
    (pathname.includes(props.href.toString()) &&
      props.href.toString() !== "/" &&
      props.href.toString() !== "/admin");
  return (
    <Link
      {...props}
      className={cn("my-4", match && "border-b font-semibold", className)}
    />
  );
}
