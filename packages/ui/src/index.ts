import {
  AncientCharacters,
  AncientOutfits,
  BunnyCoats,
  BunnySizes,
  DoggieSizes,
  OtherKinds,
  PiggieColor,
  PiggieDecoration,
} from "./constants";
import { Appearance } from "./types";
import * as v from "valibot";
import { schema } from "./schemas";

export * from "./constants";
export * from "./types";
export * from "./schemas";

const baseURL = "https://cdn.jsdelivr.net/npm/@mmd-id/store@latest";

/**
 * get avatar URL with resource key
 */
export const getResourceURL = (input: string) => {
  const appearance = resoureKeyToAppearance(input);
  const key = appearance ? input : "default";
  return `${baseURL}/dist/${encodeURIComponent(key)}.png`;
};

/**
 * generate Resource key with appearance object
 */
export const appearanceToResourceKey = ({
  race,
  background,
  mood,
}: Appearance) => {
  switch (race.type) {
    case "bunny":
      return [race.type, background, mood, race.size, race.coat].join("-");
    case "doggie":
      return [race.type, background, mood, race.size].join("-");
    case "piggie":
      return [race.type, background, mood, race.painting, race.receiver].join(
        "-"
      );
    case "other":
      return [race.type, background, mood, race.kind].join("-");
    case "ancient":
      return [race.type, background, race.character, race.outfits].join("-");
    default:
      return "" as never;
  }
};

/**
 * generate appearance object with resource key
 */
export const resoureKeyToAppearance = (input: string): Appearance | null => {
  if (!input) return null;
  let race: unknown = {};
  let mood = "sober";
  const [raceType, background, ...rest] = input.split("-");
  switch (raceType) {
    case "bunny":
      {
        const [_mood, size, coat] = rest;
        mood = _mood;
        race = { type: "bunny", size, coat };
      }
      break;
    case "doggie":
      {
        const [_mood, size] = rest;
        mood = _mood;
        race = { type: "doggie", size };
      }
      break;
    case "piggie":
      {
        const [_mood, painting, receiver] = rest;
        mood = _mood;
        race = { type: "piggie", painting, receiver };
      }
      break;
    case "ancient":
      {
        const [character, outfits] = rest;
        race = {
          type: "ancient",
          character,
          outfits,
        };
      }
      break;
    case "other":
      {
        const [_mood, kind] = rest;
        mood = _mood;
        race = {
          type: "other",
          kind,
        };
      }
      break;
    default:
      return null;
  }
  const data = {
    mood,
    background,
    race,
  };
  const result = v.safeParse(schema, data);
  return result.success ? result.output : null;
};

/**
 * apperance property to options maps
 */
export const optionsMap: Record<string, Record<string, string[]>> = {
  bunny: {
    size: [...BunnySizes],
    coat: [...BunnyCoats],
  },
  doggie: {
    size: [...DoggieSizes],
  },
  other: {
    kind: [...OtherKinds],
  },
  ancient: {
    character: [...AncientCharacters],
    outfits: [...AncientOutfits],
  },
  piggie: {
    painting: [...PiggieColor],
    receiver: [...PiggieDecoration],
  },
};
