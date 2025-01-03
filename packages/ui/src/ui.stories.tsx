import { useCallback, useMemo, useState } from "react";
import { appearanceToResourceKey, useKeySuggestion, useResourceURL } from ".";
import { Appearance } from "./types";

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

export const KeySuggestion = () => {
  const [value, setValue] = useState("");
  const [suggestion, suggestions] = useKeySuggestion(
    value ? value.split("-") : []
  );
  const url = useResourceURL(suggestion);
  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    []
  );

  const Button = ({
    i,
    setValue,
  }: {
    i: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    const handleClick = useCallback(
      () => setValue((prev) => (prev += value ? `-${i}` : i)),
      [i, setValue]
    );
    return (
      <button key={i} onClick={handleClick}>
        {i}
      </button>
    );
  };
  return (
    <>
      <img src={url} width="75" height="75" />
      <div>
        <input
          value={value}
          onChange={handleOnChange}
          placeholder="Type a key"
        />
        {suggestions.map((i) => (
          <Button key={i} i={i} setValue={setValue} />
        ))}
      </div>
    </>
  );
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
