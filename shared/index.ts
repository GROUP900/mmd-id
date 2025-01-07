import {
  AncientCharacters,
  AncientOutfits,
  Background,
  BunnyCoats,
  BunnySizes,
  DoggieSizes,
  Moods,
  OtherKinds,
  PiggieColor,
  PiggieDecoration,
} from "./constants";

// https://www.npmjs.com/package/cartesian-product
export const product = <T extends string[][]>(
  elements: T
): { [K in keyof T]: T[K][number] }[] => {
  if (!Array.isArray(elements)) {
    throw new TypeError();
  }

  const end = elements.length - 1;
  const result: { [K in keyof T]: T[K][number] }[] = [];

  function addTo(curr: any[], start: number) {
    var first = elements[start],
      last = start === end;

    for (var i = 0; i < first.length; ++i) {
      var copy = curr.slice();
      copy.push(first[i]);

      if (last) {
        result.push(copy as { [K in keyof T]: T[K][number] });
      } else {
        addTo(copy, start + 1);
      }
    }
  }

  if (elements.length) {
    addTo([], 0);
  } else {
    result.push([] as { [K in keyof T]: T[K][number] });
  }
  return result;
};

export const generateCombinations = () => {
  const bunnyCombinations = product([
    ["bunny"],
    [...Background],
    [...Moods],
    [...BunnySizes],
    [...BunnyCoats],
  ] as const);
  const doggieCombinations = product([
    ["doggie"],
    [...Background],
    [...Moods],
    [...DoggieSizes],
  ] as const);
  const piggieCombinations = product([
    ["piggie"],
    [...Background],
    [...Moods],
    [...PiggieColor],
    [...PiggieDecoration],
  ] as const);
  const otherCombinations = product([
    ["other"],
    [...Background],
    [...Moods],
    [...OtherKinds],
  ] as const);
  const ancientCombinations = product([
    ["ancient"],
    [...Background],
    [...AncientCharacters],
    [...AncientOutfits],
  ] as const);
  return {
    bunnyCombinations,
    doggieCombinations,
    piggieCombinations,
    otherCombinations,
    ancientCombinations,
  };
};
