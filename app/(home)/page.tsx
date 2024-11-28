import Container from "@/components/Container";
import Board from "@/components/game/Board";

export default async function Home() {
  return (
    <Container>
      <Board id={"test"} />
    </Container>
  );
}
