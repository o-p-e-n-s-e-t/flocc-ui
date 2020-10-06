import Base from "./Base";
import { parsePair } from "../utils/serialize";
import createStyle from "../utils/createStyle";
import styles from "./Input.css";
import { createDiv, createInput } from "../utils/createElement";

interface InputOptions {
  value?: string | number;
  style?: {
    [key: string]: string | number;
  };
  onChange?: () => void;
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

    this.element = createDiv(
      { className: "__floccUI-input__container" },
      () => {
        this.input = createInput({
          className: "__floccUI-input",
          type: this.type === "number" ? "number" : "text",
          value: this.value.toString(),
        });
        this.input.addEventListener("input", () => {
          const value =
            this.type === "number" ? +this.input.value : this.input.value;
          this.value = value;
          this.callbacks.forEach(callback => callback(this.value));
        });
        return this.input;
      }
    );

    if (opts.style) {
      for (let key in opts.style) {
        const value = opts.style[key];
        const pair = parsePair(key, value);
        // @ts-ignore
        this.element.style[pair.key] = pair.value;
      }
    }

    // add CSS
    createStyle(styles, "__floccUI-input-css");
  }
}
