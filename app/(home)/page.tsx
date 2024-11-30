import Container from "@/components/Container";
import Board from "@/components/game/Board";
import GenerateButton from "@/components/GenerateButton";

export default async function Home() {
  return (
    <Container>
      <Board isDefault dieRolls={[]} permutation={[]} />
      <GenerateButton primary />
    </Container>
  );
}
