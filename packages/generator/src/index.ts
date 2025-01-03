import { BlendMode, Jimp } from "jimp";
import { type Appearance } from "../../../shared/types";
import path from "path";

const assetsFolder = path.resolve(__dirname, "../assets");

const ASSET_SIZE = 750;

export const generate = async ({ background, mood, race }: Appearance) => {
  const raceType = race.type;
  let character: typeof Jimp | Awaited<ReturnType<typeof Jimp.read>> | null =
    null;

  if (raceType === "bunny") {
    const coatColor = new Jimp({
      width: ASSET_SIZE,
      height: ASSET_SIZE,
      color: race.coat,
    });
    const skin = await Jimp.read(`${assetsFolder}/bunny/${race.size}/skin.png`);
    const face = await Jimp.read(
      `${assetsFolder}/bunny/${race.size}/${mood}.png`
    );
    character = coatColor
      .composite(skin, 0, 0, {
        mode: BlendMode.MULTIPLY,
      })
      .composite(face, 0, 0)
      .mask(skin);
  }

  if (raceType === "doggie") {
    const skin = await Jimp.read(
      `${assetsFolder}/doggie/${race.size}/skin.png`
    );
    const face = await Jimp.read(
      `${assetsFolder}/doggie/${race.size}/${mood}.png`
    );
    character = skin.composite(face, 0, 0);
  }
  if (raceType === "other") {
    const skin = await Jimp.read(`${assetsFolder}/other/${race.race}/skin.png`);
    const face = await Jimp.read(
      `${assetsFolder}/other/${race.race}/${mood}.png`
    );
    character = skin.composite(face, 0, 0);
  }
  if (raceType === "ancient") {
    character = await Jimp.read(
      `${assetsFolder}/ancients/${race.character}/skin-${race.outfits}.png`
    );
  }
  if (raceType === "piggie") {
    const paintColor = new Jimp({
      width: ASSET_SIZE,
      height: ASSET_SIZE,
      color: race.painting,
    });
    const receiver = await Jimp.read(
      `${assetsFolder}/piggie/decoration-${race.receiver}.png`
    );
    const screen = await Jimp.read(`${assetsFolder}/piggie/screen.png`);
    const skin = await Jimp.read(`${assetsFolder}/piggie/skin.png`);
    const face = await Jimp.read(`${assetsFolder}/piggie/${mood}.png`);

    character = paintColor
      .composite(skin, 0, 0, { mode: BlendMode.MULTIPLY })
      .mask(skin)
      .composite(face, 0, 0)
      .composite(receiver, 0, 0)
      .composite(screen, 0, 0);
  }

  if (!character) throw new Error("Character not found");

  const image = new Jimp({
    width: ASSET_SIZE,
    height: ASSET_SIZE,
    color: background,
  }).composite(character, 0, 0);
  return image.getBuffer("image/png") as Promise<Buffer>;
};

export const generateDefault = async () => {
  const paintColor = new Jimp({
    width: ASSET_SIZE,
    height: ASSET_SIZE,
    color: "#d3d3d3",
  });
  const skin = await Jimp.read(`${assetsFolder}/piggie/skin.png`);

  const shell = paintColor.composite(skin, 0, 0, { mode: BlendMode.MULTIPLY });
  return shell.getBuffer("image/png") as Promise<Buffer>;
};
