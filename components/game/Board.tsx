import { dice } from "@/lib/game/constants";

export default function Board({
  dieRolls,
  permutation,
  isDefault = false,
}: {
  dieRolls: number[];
  permutation: number[];
  isDefault?: boolean;
}) {
  let gridLetters: string[] = [];

  if (isDefault) {
    gridLetters = Array(25).fill("x");
    const plettLetters = ["P", "L", "E", "T", "T"];
    for (let i = 0; i < 5; i++) {
      gridLetters[10 + i] = plettLetters[i];
    }
  } else {
    gridLetters = Array(25);

    for (let i = 0; i < 25; i++) {
      const dieIndex = i;
      const die = dice[dieIndex];
      const sideIndex = dieRolls[i];
      const letter = die[sideIndex];
      const position = permutation[i];
      gridLetters[position] = letter;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <section className="grid grid-cols-5 gap-2 w-full text-xl max-w-[25ch]">
        {gridLetters.map((letter, index) => (
          <Die key={index} letter={letter} />
        ))}
      </section>
    </div>
  );
}

function Die({ letter }: { letter: string }) {
  const displayLetter = letter === "Q" ? "Qu" : letter;
  return (
    <div className="border aspect-square rounded-md font-semibold flex items-center justify-center">
      {displayLetter}
    </div>
  );
}
