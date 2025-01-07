import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  appearanceToResourceKey,
  Background,
  Moods,
  optionsMap,
  Races,
  useResourceURL,
} from ".";
import { Appearance } from "./types";
import * as v from "valibot";
import { schema } from "./schemas";

export const GetFallbackImageOnBadInput = () => {
  const url = useResourceURL("bad-input");
  return <img src={url} width="75" height="75" alt="resource" />;
};

export const GetFallbackImageOnPartiallyCorrectInput = () => {
  const url = useResourceURL("piggie-#3157E1-happy");
  return <img src={url} width="75" height="75" alt="resource" />;
};

export const GetImageURL = () => {
  const url = useResourceURL("piggie-#3157E1-happy-#d3d3d3-A");
  return <img src={url} width="75" height="75" alt="resource" />;
};

export const AppearanceToResourceKey = () => {
  const appearance: Appearance = {
    background: "#3157E1",
    mood: "happy",
    race: {
      type: "bunny",
      coat: "#D9B391",
      size: "big",
    },
  };
  const key = appearanceToResourceKey(appearance);
  const url = useResourceURL(key);
  return (
    <>
      <p>
        You can build more complex avatar builder ui based on the options
        exported constants. <br />
        You can consider generating image addresses from strings. But if you
        need type constraints, you can create objects that satisfy the
        Appearance interface.
        <br /> And use the appearanceToResourceKey function to convert it to the
        final resource identifier.
      </p>
      <img src={url} width="75" height="75" alt="resource" />
    </>
  );
};

export const Rounded = () => {
  const piggie = useResourceURL("piggie-#3157E1-happy-#d3d3d3-A");
  const cat = useResourceURL("other-#C42F23-happy-cat");
  const style = useMemo(
    () => ({
      borderRadius: "50%",
    }),
    []
  );
  return (
    <>
      <img style={style} src={piggie} width="32" height="32" alt="resource" />
      <img style={style} src={cat} width="32" height="32" alt="resource" />
    </>
  );
};

const RacePropertySelector = ({
  field,
  options,
  setValue,
}: {
  field: string;
  options: string[];
  setValue: Dispatch<SetStateAction<Record<string, string>>>;
}) => {
  const handleSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      setValue((prev) => ({ ...prev, [field]: value }));
    },
    [field, setValue]
  );
  return (
    <select onChange={handleSelect}>
      {options.map((i) => (
        <option value={i}>{i}</option>
      ))}
    </select>
  );
};

const RaceSelectors = ({
  raceType,
  setRace,
}: {
  raceType: string;
  setRace: Dispatch<SetStateAction<Record<string, string>>>;
}) => {
  const options = optionsMap[raceType];

  if (!(raceType in optionsMap)) return null;
  return (
    <>
      {Object.entries(options).map(([field, options]) => (
        <RacePropertySelector
          key={field}
          field={field}
          options={options}
          setValue={setRace}
        />
      ))}
    </>
  );
};

export const Builder = () => {
  const defaultValue = useMemo<Appearance>(
    () => ({
      mood: "sober",
      background: "#3157E1",
      race: { type: "bunny", coat: "#D9B391", size: "baby" },
    }),
    []
  );
  const [type, setType] = useState("bunny");
  const [background, setBackground] = useState("#3157E1");
  const [mood, setMood] = useState("sober");
  const [race, setRace] = useState<Record<string, string>>({});

  useEffect(() => {
    const { background, mood, race } = defaultValue;
    const { type, ...rest } = race;
    setType(type);
    setBackground(background);
    setMood(mood);
    setRace(rest);
  }, [defaultValue]);

  const key = useMemo(() => {
    const data = {
      mood,
      background,
      race: { type, ...race },
    };
    const result = v.safeParse(schema, data);
    if (!result.success) return "default";
    return appearanceToResourceKey(result.output);
  }, [background, mood, race, type]);
  const url = useResourceURL(key);

  const handleRaceChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  }, []);
  const handleMoodChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setMood(e.target.value);
  }, []);
  const handleBackgroundChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setBackground(e.target.value);
    },
    []
  );
  return (
    <>
      <img src={url} width="32" height="32" alt="resource" />
      <select value={type} onChange={handleRaceChange}>
        {Races.map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
      <select value={background} onChange={handleBackgroundChange}>
        {Background.map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
      <select value={mood} onChange={handleMoodChange}>
        {Moods.map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
      <RaceSelectors raceType={type} setRace={setRace} />
    </>
  );
};
