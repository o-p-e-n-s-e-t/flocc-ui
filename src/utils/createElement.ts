interface ElementOptions {
  className?: string;
  [key: string]: any;
}

type Contents = () => string | HTMLElement | HTMLElement[];

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
    } else {
      children.forEach(child => {
        if (child) {
          el.appendChild(child);
        }
      });
    }
  }

  // @ts-ignore
  return el;
}

export const createLabel = (opts?: ElementOptions, contents?: Contents) => {
  return createElement<HTMLLabelElement>("label", opts, contents);
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
