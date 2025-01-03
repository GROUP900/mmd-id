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

interface Race {
  type: (typeof Races)[number];
}

export interface Piggie extends Race {
  type: "piggie";
  painting: (typeof PiggieColor)[number];
  receiver: (typeof PiggieDecoration)[number];
}

export interface Bunny extends Race {
  type: "bunny";
  coat: (typeof BunnyCoats)[number];
  size: (typeof BunnySizes)[number];
}

export interface Doggie extends Race {
  type: "doggie";
  size: (typeof DoggieSizes)[number];
}

export interface Other extends Race {
  type: "other";
  race: (typeof OtherRaces)[number];
}

export interface Ancient extends Race {
  type: "ancient";
  character: (typeof AncientCharacters)[number];
  outfits: (typeof AncientOutfits)[number];
}

export interface Appearance {
  background: (typeof Background)[number];
  mood: (typeof Moods)[number];
  race: Bunny | Doggie | Other | Ancient | Piggie;
}
