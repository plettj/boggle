"use client";

import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { PATH_HOME } from "@/lib/constants";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full max-w-[80ch] h-full flex flex-col text-sm px-6 sm:px-8 items-center justify-center text-center">
      <span className="bg-gradient-to-b from-foreground to-transparent bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
        404
      </span>
      <p className="mt-4 mb-8">
        The page you&apos;re looking for either doesn&apos;t exist or was moved.
      </p>
      <div className="flex justify-center gap-2">
        <BackButton variant="ghost" />
        <Button variant="ghost" asChild>
          <Link href={PATH_HOME}>Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
