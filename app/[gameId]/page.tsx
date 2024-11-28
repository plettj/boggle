import { Metadata } from "next/types";
import { Code } from "@/components/ui/code";
import { AUTHOR, BASE_URL, OG_KEYWORDS } from "@/lib/constants";
import { getOGData } from "@/lib/utils";
import Container from "@/components/Container";
import Board from "@/components/game/Board";

type Params = {
  params: {
    gameId: string[];
  };
};

export default async function Game({ params }: Params) {
  const id = params.gameId[0];

  console.log("Game ID:", id);

  if (!id) {
    return (
      <Container>
        <p>
          Game <Code>{id}</Code> is not a valid 5x5 boggle game.
        </p>
      </Container>
    );
  }

  return (
    <Container>
      <Board id={id} />
    </Container>
  );
}

export function generateMetadata({ params }: Params): Metadata {
  const id = params.gameId[0];

  console.log("Game ID:", id);

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
      // ...(post.ogImage && {
      //   previewImage: {
      //     url: post.ogImage,
      //     alt: post.subtitle ?? "Post display image",
      //   },
      // }),
    }),
  };
}
