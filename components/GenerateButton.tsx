"use client";

import { generateBoggleGame } from "@/lib/game/gameHash";
import { Button } from "./ui/button";
import { BASE_URL } from "@/lib/constants";
import { redirect } from "next/navigation";
import { getShareString } from "@/lib/game/sharing";

export default function GenerateButton({
  primary = false,
}: {
  primary?: boolean;
}) {
  const handleClick = () => {
    const gameId = generateBoggleGame();
    const url = `${BASE_URL}/${gameId}`;

    console.log(url);

    // TODO: Use actual clipboard API hook
    navigator.clipboard.writeText(getShareString(gameId));

    // TODO: Use shadcn toasts
    alert(`Game URL copied to clipboard: ${url}`);

    redirect(url);
  };

  return (
    <Button
      onClick={handleClick}
      className="w-full mt-6"
      variant={primary ? "default" : "outline"}
    >
      Generate New Game
    </Button>
  );
}
