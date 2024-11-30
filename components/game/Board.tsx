export default function Board({
  dieRolls,
  permutation,
  default: isDefault = false,
}: {
  dieRolls: number[];
  permutation: number[];
  default?: boolean;
}) {
  let gridLetters: string[] = [];

  if (isDefault) {
    gridLetters = Array(25).fill("x");
    const plettLetters = ["P", "L", "E", "T", "T"];
    for (let i = 0; i < 5; i++) {
      gridLetters[10 + i] = plettLetters[i];
    }
  } else {
    const grid = [];
    for (let i = 0; i < 25; i++) {
      grid[permutation[i]] = dieRolls[i];
    }

    // Map die rolls to letters (assuming dieRolls are numbers 0-5)
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    gridLetters = grid.map((value) => letters[value % 26]);
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <section className="grid grid-cols-5 gap-2 w-full text-xl max-w-[30ch]">
        {gridLetters.map((letter, index) => (
          <Die key={index} letter={letter} />
        ))}
      </section>
    </div>
  );
}

function Die({ letter }: { letter: string }) {
  return (
    <div className="border aspect-square rounded-md font-semibold flex items-center justify-center">
      {letter}
    </div>
  );
}
