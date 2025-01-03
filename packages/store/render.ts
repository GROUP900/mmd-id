import {
  existsSync,
  mkdirSync,
  readdirSync,
  unlinkSync,
  writeFileSync,
} from "fs";
import { generateCombinations } from "../../shared";
import { generate, generateDefault } from "@mmd-id/generator";

(async () => {
  const {
    bunnyCombinations,
    doggieCombinations,
    piggieCombinations,
    otherCombinations,
    ancientCombinations,
  } = generateCombinations();

  if (!existsSync("dist")) {
    mkdirSync("dist");
  }

  readdirSync("dist").forEach((file) => {
    unlinkSync(`dist/${file}`);
  });

  bunnyCombinations.forEach(async (combination) => {
    const [raceType, background, mood, size, coat] = combination;
    const buffer = await generate({
      background,
      mood,
      race: { type: raceType, coat, size },
    });

    writeFileSync(`dist/${combination.join("-")}.png`, buffer);
  });

  doggieCombinations.forEach(async (combination) => {
    const [raceType, background, mood, size] = combination;
    const buffer = await generate({
      background,
      mood,
      race: { type: raceType, size },
    });
    writeFileSync(`dist/${combination.join("-")}.png`, buffer);
  });

  piggieCombinations.forEach(async (combination) => {
    const [raceType, background, mood, painting, receiver] = combination;
    const buffer = await generate({
      background,
      mood,
      race: {
        type: raceType,
        painting,
        receiver,
      },
    });
    writeFileSync(`dist/${combination.join("-")}.png`, buffer);
  });

  otherCombinations.forEach(async (combination) => {
    const [raceType, background, mood, race] = combination;
    const buffer = await generate({
      background,
      mood,
      race: {
        type: raceType,
        race,
      },
    });
    writeFileSync(`dist/${combination.join("-")}.png`, buffer);
  });

  ancientCombinations.forEach(async (combination) => {
    const [raceType, background, character, outfits] = combination;
    const buffer = await generate({
      background,
      mood: "sober",
      race: {
        type: raceType,
        character,
        outfits,
      },
    });
    writeFileSync(`dist/${combination.join("-")}.png`, buffer);
  });

  const buffer = await generateDefault();
  writeFileSync(`dist/default.png`, buffer);
})();
