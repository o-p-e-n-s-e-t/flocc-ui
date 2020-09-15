const numeric = [
  "margin",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "padding",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "fontSize",
];

type StyleObj = {
  [key: string]: number | string;
};

export function parsePair(
  key: string,
  value: string | number
): {
  key: string;
  value: string | number;
} {
  let parsedValue = value;
  if (numeric.indexOf(key) > -1 && +value === value) {
    parsedValue = value.toString() + "px";
  }

  const parsedKey = key.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);

  return { key: parsedKey, value: parsedValue };
}

export default function serialize(obj: StyleObj = {}) {
  return Object.keys(obj)
    .map((key) => {
      const value = obj[key];
      let parsedValue = value;

      if (numeric.indexOf(key) > -1 && +value === value) {
        parsedValue = value.toString() + "px";
      }

      const parsedKey = key.replace(
        /([A-Z])/g,
        (g) => `-${g[0].toLowerCase()}`
      );

      return `${parsedKey}:${parsedValue};`;
    })
    .join("");
}
