import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex flex-col gap-4 my-auto justify items-center justify-center text-center">
      <p className="text-balance">Big Boggle</p>
      <Button variant="outline" asChild>
        <Link href="https://github.com/plettj/boggle">Source Code</Link>
      </Button>
    </div>
  );
}
