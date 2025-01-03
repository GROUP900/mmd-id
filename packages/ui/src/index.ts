import { useMemo } from "react";
import { validKeysMap } from "./validKeysMap";
import { NestedObject } from "../generateValidKeys";
import {
  AncientCharacters,
  AncientOutfits,
  Background,
  BunnyCoats,
  BunnySizes,
  DoggieSizes,
  Moods,
  OtherRaces,
  PiggieColor,
  PiggieDecoration,
  Races,
} from "./constants";
import { Appearance } from "./types";

const baseURL = "https://cdn.jsdelivr.net/npm/@mmd-id/store@latest";

const getNode = (obj: NestedObject, path: string[]) => {
  let current: NestedObject | boolean = obj;

  for (let i = 0; i < path.length; i++) {
    const key = path[i];
    if (typeof current === "boolean" && i < path.length - 1) return undefined;
    if (typeof current === "object" && !(key in current)) {
      return undefined;
    }
    if (typeof current === "boolean") return current as never;
    current = current[key];
  }

  return current;
};

const getSuggestion = (obj: NestedObject, path: string[] = []): string => {
  for (const key in obj) {
    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      return getSuggestion(obj[key] as NestedObject, [...path, key]);
    } else {
      return [...path, key].join("-");
    }
  }
  return null as never;
};

const checkPath = (obj: NestedObject, path: string[]) => {
  const node = getNode(obj, path);
  return typeof node === "boolean";
};

export const getResourceURL = (input: string) => {
  const parts = input.split("-");
  const valid = checkPath(validKeysMap, parts);
  const key = valid ? input : "default";
  return `${baseURL}/dist/${encodeURIComponent(key)}.png`;
};

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
      return [race.type, background, mood, race.race].join("-");
    case "ancient":
      return [race.type, background, race.character, race.outfits].join("-");
    default:
      return "" as never;
  }
};

export const useResourceURL = (input: string) =>
  useMemo(() => getResourceURL(input), [input]);

export const useKeySuggestion = (input: string[]): [string, string[]] =>
  useMemo(() => {
    if (!input.length) return ["default", [...Races]];
    const node = getNode(validKeysMap, input);
    if (!node) return ["default", []];
    if (typeof node === "boolean") return [input.join("-"), []];
    const suggestion = getSuggestion(node, input);
    return [suggestion, Object.keys(node)];
  }, [input]);

export const useAppearanceOptions = (race: (typeof Races)[number] | null) =>
  useMemo(() => {
    const commonOptions = {
      race: Races,
      background: Background,
    };
    switch (race ?? "bunny") {
      case "bunny":
        return {
          ...commonOptions,
          mood: Moods,
          size: BunnySizes,
          coat: BunnyCoats,
        };
      case "doggie":
        return {
          ...commonOptions,
          mood: Moods,
          size: DoggieSizes,
        };
      case "other":
        return {
          ...commonOptions,
          mood: Moods,
          race: OtherRaces,
        };
      case "piggie":
        return {
          ...commonOptions,
          mood: Moods,
          painting: PiggieColor,
          receiver: PiggieDecoration,
        };
      case "ancient":
        return {
          ...commonOptions,
          character: AncientCharacters,
          outfits: AncientOutfits,
        };
      default:
        return null as never;
    }
  }, [race]);
