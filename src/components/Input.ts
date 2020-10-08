import Base from "./Base";
import { parsePair } from "../utils/serialize";
import createStyle from "../utils/createStyle";
import styles from "./Input.css";
import {
  createButton,
  createDiv,
  createInput,
  createLabel,
} from "../utils/createElement";

interface InputOptions {
  name?: string;
  label?: string;
  value?: string | number;
  style?: {
    [key: string]: string | number;
  };
  step?: number;
  min?: number;
  max?: number;
  live?: boolean;
}

const defaultInputOptions: InputOptions = {
  value: "",
  live: false,
};

export class Input extends Base {
  input: HTMLInputElement;
  type: "string" | "number";
  value: string | number;
  opts: InputOptions = Object.assign({}, defaultInputOptions);
  promptButton: HTMLButtonElement;

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

        if (this.type === "number") {
          this.input.step = (this.opts.step || 1).toString();
          this.opts.hasOwnProperty("min") &&
            (this.input.min = this.opts.min.toString());
          this.opts.hasOwnProperty("max") &&
            (this.input.max = this.opts.max.toString());
        }

        this.promptButton = createButton(
          {
            className: "__floccUI-input__prompt-button",
            style: "display: none;",
          },
          () => "⏎"
        );
        this.promptButton.addEventListener("click", () => this.update());

        return [
          this.opts.label && createLabel({}, () => this.opts.label),
          this.input,
          this.promptButton,
        ];
      }
    );

    if (!this.opts.live) {
      this.input.addEventListener("input", () => {
        const { value } = this;
        this.promptButton.style.display =
          this.getInputValue() !== value ? "block" : "none";
      });
      this.input.addEventListener("keyup", e => {
        if (e.key === "Enter") {
          e.preventDefault();
          this.update();
        }
      });
    } else {
      this.input.addEventListener("keyup", () => this.update());
    }

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

    this.listen();
  }

  getInputValue(): number | string {
    return this.type === "number" ? +this.input.value : this.input.value;
  }

  listen() {
    // don't update the input value if the input is focused
    if (
      document.activeElement !== this.input &&
      document.activeElement !== this.promptButton &&
      this.environment &&
      this.opts.name
    ) {
      this.input.value = this.environment.get(this.opts.name);
    }
    window.requestAnimationFrame(() => this.listen());
  }

  update() {
    this.value = this.getInputValue();
    this.input.focus();
    this.promptButton.style.display = "none";
    this.opts.name && this.environment?.set(this.opts.name, this.value);
  }
}
