import * as v from "valibot";
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

const commonSchema = v.object({
  mood: v.picklist(Moods),
  background: v.picklist(Background),
});

const bunnySchema = v.intersect([
  commonSchema,
  v.object({
    race: v.object({
      type: v.literal("bunny"),
      coat: v.picklist(BunnyCoats),
      size: v.picklist(BunnySizes),
    }),
  }),
]);

const doggieSchema = v.intersect([
  commonSchema,
  v.object({
    race: v.object({
      type: v.literal("doggie"),
      size: v.picklist(DoggieSizes),
    }),
  }),
]);

const piggieSchema = v.intersect([
  commonSchema,
  v.object({
    race: v.object({
      type: v.literal("piggie"),
      painting: v.picklist(PiggieColor),
      receiver: v.picklist(PiggieDecoration),
    }),
  }),
]);

const ancientSchema = v.intersect([
  commonSchema,
  v.object({
    race: v.object({
      type: v.literal("ancient"),
      character: v.picklist(AncientCharacters),
      outfits: v.picklist(AncientOutfits),
    }),
  }),
]);

const otherSchema = v.intersect([
  commonSchema,
  v.object({
    race: v.object({
      type: v.literal("other"),
      kind: v.picklist(OtherKinds),
    }),
  }),
]);

export const schema = v.union([
  bunnySchema,
  doggieSchema,
  piggieSchema,
  ancientSchema,
  otherSchema,
]);
