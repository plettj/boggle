/**
 * Generates a URL-safe encoded 5x5 Boggle game, prefixed with "-" to indicate it is a hash.
 * @returns {string} Encoded Boggle game string.
 */
export function generateBoggleGame() {
  const dieRolls = [];
  for (let i = 0; i < 25; i++) {
    dieRolls.push(Math.floor(Math.random() * 6));
  }

  const permutation = shuffle(Array.from({ length: 25 }, (_, i) => i));

  const dieRollsBytes = packDieRolls(dieRolls);
  const permutationBytes = packPermutation(permutation);

  const totalBytes = new Uint8Array(
    dieRollsBytes.length + permutationBytes.length
  );
  totalBytes.set(dieRollsBytes, 0);
  totalBytes.set(permutationBytes, dieRollsBytes.length);

  return "-" + base64Encode(totalBytes);
}

/**
 * Decodes a URL-safe encoded 5x5 Boggle game, expecting a hashed string prefixed with "-".
 * @param {string} encodedStr - Encoded Boggle game string.
 * @returns {object} An object containing the die rolls and permutation.
 */
export function decodeBoggleGame(encodedStr: string) {
  if (!encodedStr.startsWith("-")) {
    throw new Error('Hashed Big Boggle game must start with a "-" prefix.');
  }

  encodedStr = encodedStr.substring(1);

  const expectedLength = 35; // 35 base64 characters to encode 26 bytes without padding.

  if (encodedStr.length !== expectedLength) {
    throw new Error(
      `Hashed Big Boggle game must contain ${expectedLength} characters; found ${encodedStr.length}.`
    );
  }

  const totalBytes = base64Decode(encodedStr);

  // Expect the total bytes to be 26 (10 bytes for die rolls and 16 bytes for permutation)
  if (totalBytes.length !== 26) {
    throw new Error(
      `Hashed Big Boggle game must represent 26 bytes; found ${totalBytes.length}.`
    );
  }

  const dieByteNum = 10;
  const dieRollsBytes = totalBytes.slice(0, dieByteNum);
  const permutationBytes = totalBytes.slice(dieByteNum);

  const dieRolls = unpackDieRolls(dieRollsBytes);

  const permutation = unpackPermutation(permutationBytes);

  return { dieRolls, permutation };
}

/**
 * Packs the die rolls into a Uint8Array.
 * Each die roll is 3 bits (values 0-5).
 * @param {number[]} dieRolls - Array of 25 die rolls.
 * @returns {Uint8Array} Packed die rolls.
 */
function packDieRolls(dieRolls: number[]) {
  const bitsNeeded = 25 * 3; // 75 bits
  const bytesNeeded = Math.ceil(bitsNeeded / 8); // 10 bytes
  const buffer = new Uint8Array(bytesNeeded);
  let bitIndex = 0;

  for (let i = 0; i < dieRolls.length; i++) {
    const value = dieRolls[i];
    for (let j = 0; j < 3; j++) {
      const bit = (value >> (2 - j)) & 1;
      const byteIndex = Math.floor(bitIndex / 8);
      buffer[byteIndex] |= bit << (7 - (bitIndex % 8));
      bitIndex++;
    }
  }
  return buffer;
}

/**
 * Unpacks the die rolls from a Uint8Array.
 * @param {Uint8Array} buffer - Packed die rolls.
 * @returns {number[]} Array of 25 die rolls.
 */
function unpackDieRolls(buffer: Uint8Array) {
  const dieRolls = [];
  let bitIndex = 0;
  for (let i = 0; i < 25; i++) {
    let value = 0;
    for (let j = 0; j < 3; j++) {
      const byteIndex = Math.floor(bitIndex / 8);
      const bit = (buffer[byteIndex] >> (7 - (bitIndex % 8))) & 1;
      value = (value << 1) | bit;
      bitIndex++;
    }
    dieRolls.push(value);
  }
  return dieRolls;
}

/**
 * Packs the permutation into a Uint8Array.
 * Each index is 5 bits (values 0-24).
 * @param {number[]} permutation - Array of 25 indices.
 * @returns {Uint8Array} Packed permutation.
 */
function packPermutation(permutation: number[]) {
  const bitsNeeded = 25 * 5; // 125 bits
  const bytesNeeded = Math.ceil(bitsNeeded / 8); // 16 bytes
  const buffer = new Uint8Array(bytesNeeded);
  let bitIndex = 0;

  for (let i = 0; i < permutation.length; i++) {
    const value = permutation[i];
    for (let j = 0; j < 5; j++) {
      const bit = (value >> (4 - j)) & 1;
      const byteIndex = Math.floor(bitIndex / 8);
      buffer[byteIndex] |= bit << (7 - (bitIndex % 8));
      bitIndex++;
    }
  }
  return buffer;
}

/**
 * Unpacks the permutation from a Uint8Array.
 * @param {Uint8Array} buffer - Packed permutation.
 * @returns {number[]} Array of 25 indices.
 */
function unpackPermutation(buffer: Uint8Array) {
  const permutation = [];
  let bitIndex = 0;
  for (let i = 0; i < 25; i++) {
    let value = 0;
    for (let j = 0; j < 5; j++) {
      const byteIndex = Math.floor(bitIndex / 8);
      const bit = (buffer[byteIndex] >> (7 - (bitIndex % 8))) & 1;
      value = (value << 1) | bit;
      bitIndex++;
    }
    permutation.push(value);
  }
  return permutation;
}

/**
 * Base64 encodes a Uint8Array using URL-safe characters.
 * @param {Uint8Array} bytes - Bytes to encode.
 * @returns {string} Base64 encoded string.
 */
function base64Encode(bytes: Uint8Array) {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  let base64 = btoa(binary);

  // Replace '+' with '-', '/' with '_', and remove padding '='
  base64 = base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

  return base64;
}

/**
 * Decodes a base64 string into a Uint8Array.
 * @param {string} base64 - Base64 encoded string.
 * @returns {Uint8Array} Decoded bytes.
 */
function base64Decode(base64: string) {
  // Replace '-' with '+', '_' with '/', and add padding '='
  base64 = base64.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Shuffles an array using the Fisher-Yates algorithm.
 * @param {number[]} array - The array to shuffle.
 * @returns {number[]} The shuffled array.
 */
function shuffle(array: number[]) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
