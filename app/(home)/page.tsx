import Container from "@/components/Container";
import Board from "@/components/game/Board";
import ShareButton from "@/components/ShareButton";

export default async function Home() {
  return (
    <Container>
      <Board isDefault dieRolls={[]} permutation={[]} />
      <ShareButton />
    </Container>
  );
}
