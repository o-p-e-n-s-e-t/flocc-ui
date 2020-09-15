import Base from "./Base";
import { parsePair } from "../utils/serialize";

interface InputOptions {
  value?: string | number;
  style?: {
    [key: string]: string | number;
  };
}

const defaultInputOptions: InputOptions = {
  value: "",
};

export class Input extends Base {
  callbacks: ((value: number | string) => void)[] = [];
  input: HTMLInputElement;
  type: "string" | "number";
  value: string | number;
  opts: InputOptions = Object.assign({}, defaultInputOptions);

  constructor(opts?: InputOptions) {
    super();
    Object.assign(this.opts, opts);

    this.value = this.opts.value;
    this.type = +this.value === this.value ? "number" : "string";

    this.element = document.createElement("div");
    this.element.classList.add("__floccUI-input__container");
    if (opts.style) {
      for (let key in opts.style) {
        const value = opts.style[key];
        const pair = parsePair(key, value);
        // @ts-ignore
        this.element.style[pair.key] = pair.value;
      }
    }
    this.input = document.createElement("input");
    this.input.classList.add("__floccUI-input");
    this.input.type = this.type === "number" ? "number" : "text";
    this.input.value = this.value.toString();
    this.input.addEventListener("input", () => {
      const value =
        this.type === "number" ? +this.input.value : this.input.value;
      this.value = value;
      this.callbacks.forEach((callback) => callback(this.value));
    });
    this.element.appendChild(this.input);

    // add CSS
    if (!document.getElementById("__floccUI-input-css")) {
      const style = document.createElement("style");
      style.id = "__floccUI-input-css";
      style.innerHTML = `
          .__floccUI-input__container {
          }
          .__floccUI-input {
            appearance: none;
            -webkit-appearance: none;
            border: 1px solid #aaa;
            border-radius: 3px;
            display: block;
            font-size: 12px;
            padding: 4px 6px;
            width: 100%;
          }
        `;
      document.head.appendChild(style);
    }
  }

  once(callback: (value: number | string) => void): this {
    callback(this.value);
    return this;
  }

  onChange(callback: (value: number | string) => void): this {
    this.callbacks.push(callback);
    return this;
  }
}
