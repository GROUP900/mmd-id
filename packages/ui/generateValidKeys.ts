import { generateCombinations } from "../../shared";
import fs from "fs";

const combinations = generateCombinations();
export type NestedObject = { [key: string]: NestedObject | boolean };
const arrayToObject = (arr: string[][]): NestedObject => {
  const result: NestedObject = {};

  arr.forEach((path) => {
    let current: NestedObject = result;

    path.forEach((key, index) => {
      if (!current[key]) {
        current[key] = {};
      }
      if (index === path.length - 1) {
        current[key] = true;
      }
      current = current[key] as NestedObject;
    });
  });

  return result;
};
const validKeysMap = arrayToObject(Object.values(combinations).flat());

const content = `
import { NestedObject } from "../generateValidKeys"
export const validKeysMap:NestedObject = ${JSON.stringify(validKeysMap)};
`;
fs.writeFileSync("src/validKeysMap.ts", content);
