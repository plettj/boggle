import { BASE_URL } from "../constants";

export function getShareString(id: string) {
  return `🔠 5x5 Boggle | Play this board\nThe link below encodes our custom game:\n${BASE_URL}/${id}`;
}
