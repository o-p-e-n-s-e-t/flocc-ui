import labelStyles from "../components/Label.css";
import createStyle from "./createStyle";

interface ElementOptions {
  className?: string;
  [key: string]: any;
}

type Contents = () => string | HTMLElement | (string | HTMLElement)[];

const defaultElementOptions: ElementOptions = Object.assign(
  {},
  {
    className: "",
  }
);

export default function createElement<T extends HTMLElement>(
  tag: string,
  opts: ElementOptions = defaultElementOptions,
  contents?: Contents
): T {
  const el = document.createElement(tag);

  for (let key in opts) {
    if (key === "className") {
      opts.className.split(" ").forEach(c => {
        el.classList.add(c);
      });
    } else if (key === "checked") {
      // @ts-ignore
      if (opts[key]) el.setAttribute("checked", "");
    } else {
      // @ts-ignore
      el[key] = opts[key];
    }
  }

  if (contents) {
    const children = contents();
    if (typeof children === "string") {
      el.innerHTML = children;
    } else if (children instanceof HTMLElement) {
      el.appendChild(children);
    } else if (children) {
      children.forEach(child => {
        if (child instanceof HTMLElement) {
          el.appendChild(child);
        } else if (child) {
          el.innerHTML += child;
        }
      });
    }
  }

  // @ts-ignore
  return el;
}

export const createLabel = (opts?: ElementOptions, contents?: Contents) => {
  createStyle(labelStyles, "__floccUI-label");
  return createElement<HTMLLabelElement>(
    "label",
    Object.assign({ className: "__floccUI-label" }, opts),
    contents
  );
};

export const createDiv = (opts?: ElementOptions, contents?: Contents) => {
  return createElement<HTMLDivElement>("div", opts, contents);
};

export const createInput = (opts?: ElementOptions, contents?: Contents) => {
  return createElement<HTMLInputElement>("input", opts, contents);
};

export const createButton = (opts?: ElementOptions, contents?: Contents) => {
  return createElement<HTMLButtonElement>("button", opts, contents);
};

export const createSpan = (opts?: ElementOptions, contents?: Contents) => {
  return createElement<HTMLSpanElement>("span", opts, contents);
};
