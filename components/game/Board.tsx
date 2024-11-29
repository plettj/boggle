import { decodeBoggleGame, generateBoggleGame } from "@/lib/game/gameHash";

export default function Game({ id }: { id: string }) {
  console.log("Game ID:", id);

  // Generate an encoded Boggle game
  const encodedGame = generateBoggleGame();
  console.log("Encoded Game:", encodedGame);

  // Decode the encoded Boggle game
  const { dieRolls, permutation } = decodeBoggleGame(encodedGame);
  console.log("Die Rolls:", dieRolls);
  console.log("Permutation:", permutation);

  // Reconstruct the Boggle grid
  const grid = [];
  for (let i = 0; i < 25; i++) {
    grid[permutation[i]] = dieRolls[i];
  }

  // Display the grid
  console.log("Boggle Grid:");
  for (let i = 0; i < 5; i++) {
    console.log(grid.slice(i * 5, i * 5 + 5).join(" "));
  }

  return (
    <div>
      <i>
        5x5 Boggle goes here! Coming soon<sup>TM</sup>.
        <br />
        <br />
        <span className="font-semibold not-italic">B</span>
      </i>
    </div>
  );
}
