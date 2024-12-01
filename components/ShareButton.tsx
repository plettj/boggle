"use client";

import { Button } from "./ui/button";
import { BASE_URL } from "@/lib/constants";
import { getShareString } from "@/lib/game/sharing";

export default function ShareButton({ id }: { id: string }) {
  const handleClick = () => {
    const url = `${BASE_URL}/${id}`;

    console.log(url);

    // TODO: Use actual clipboard API hook
    navigator.clipboard.writeText(getShareString(id));

    // TODO: Use shadcn toasts
    alert(`Game URL copied to clipboard: ${url}`);
  };

  return (
    <Button onClick={handleClick} className="w-full mt-6">
      Share This Game
    </Button>
  );
}
