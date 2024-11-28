import { Author } from "./types";
import { isProd } from "./utils";

export const BASE_URL = isProd()
  ? "https://boggle5.com"
  : "http://localhost:3000";

export const PATH_HOME = "/";

export const OG_SITE_NAME = "boggle5.com";
export const OG_NAME = "Big Boggle";
export const OG_NAME_FULL = "5x5 Online | Big Boggle";
export const OG_DESCRIPTION =
  "A 5x5 version of the classic word game Boggle, built by Josiah Plett.";
export const OG_KEYWORDS = [
  "boggle",
  "games",
  "words",
  "puzzle",
  "online",
  "5x5",
  "big",
  "social",
];

export const AUTHOR: Author = {
  name: "Josiah Plett",
  url: "https://plett.dev",
};

export const COPYRIGHT_STRING = `© ${new Date().getFullYear()} ${AUTHOR.name}`;
