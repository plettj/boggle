"use client";

import { generateBoggleGame } from "@/lib/game/gameHash";
import { Button } from "./ui/button";
import { BASE_URL } from "@/lib/constants";
import { redirect } from "next/navigation";

export default function ShareButton() {
  const handleClick = () => {
    const gameId = generateBoggleGame();
    const url = `${BASE_URL}/${gameId}`;

    console.log(url);

    // TODO: Use actual clipboard API hook
    navigator.clipboard.writeText(
      "Come play 5x5 Boggle!\nThe link below encodes our custom game:\n" + url
    );

    // TODO: Use shadcn toasts
    alert(`Game URL copied to clipboard: ${url}`);

    redirect(url);
  };

  return (
    <Button onClick={handleClick} className="w-full mt-6">
      Generate & Share Game
    </Button>
  );
}
