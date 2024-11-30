import { Metadata } from "next/types";
import { Code } from "@/components/ui/code";
import { AUTHOR, BASE_URL, OG_KEYWORDS } from "@/lib/constants";
import { getOGData } from "@/lib/utils";
import Container from "@/components/Container";
import Board from "@/components/game/Board";
import { decodeBoggleGame } from "@/lib/game/gameHash";

type GameProps = {
  params: Promise<{ gameId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Game({ params }: GameProps) {
  const id = (await params).gameId;

  let dieRolls,
    permutation: number[] = [];

  try {
    const gameData = decodeBoggleGame(id);
    dieRolls = gameData.dieRolls;
    permutation = gameData.permutation;
  } catch (e: unknown) {
    console.error(e);
    return (
      <Container>
        <p>
          {(e as { message: string })?.message || (
            <>
              Game <Code>{id}</Code> is not a valid 5x5 boggle game.
            </>
          )}
        </p>
      </Container>
    );
  }

  return (
    <Container>
      <Board dieRolls={dieRolls} permutation={permutation} />
    </Container>
  );
}

export async function generateMetadata({
  params,
}: GameProps): // parent: ResolvingMetadata
Promise<Metadata> {
  const id = (await params).gameId;

  // Optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  if (!id) {
    return {
      title: "Game 404",
      description: "Game not found",
      openGraph: getOGData({
        title: "Game 404",
        description: "Game not found",
        url: `${BASE_URL}/${id}`,
      }),
    };
  }

  return {
    title: "Custom Game",
    description: "A custom game of 5x5 Boggle.",
    keywords: OG_KEYWORDS,
    alternates: {
      canonical: `/${id}`,
    },
    authors: AUTHOR,
    creator: AUTHOR.name,
    openGraph: getOGData({
      title: "Custom Game",
      description: "A custom game of 5x5 Boggle.",
      url: `${BASE_URL}/${id}`,
    }),
  };
}
