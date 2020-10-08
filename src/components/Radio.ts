import {
  createDiv,
  createInput,
  createLabel,
  createSpan,
} from "../utils/createElement";
import { utils } from "flocc";
import Base from "./Base";
import styles from "./Radio.css";
import createStyle from "../utils/createStyle";

interface RadioOptions {
  choices: (string | number)[];
  choiceLabels: string[];
  label?: string;
  name?: string;
  value?: string | number;
}

const defaultRadioOptions: RadioOptions = {
  choices: [],
  choiceLabels: [],
  label: "",
  name: "",
  value: "",
};

class Radio extends Base {
  opts: RadioOptions = Object.assign({}, defaultRadioOptions);
  id: string = utils.uuid();

  constructor(opts?: RadioOptions) {
    super();

    Object.assign(this.opts, opts);

    const onChange = (e: Event) => {
      if (!this.environment) return;
      const input = e.target;
      if (!(input instanceof HTMLInputElement)) return;
      const { value } = input;
      this.opts.name &&
        this.environment.set(this.opts.name, !isNaN(+value) ? +value : value);
    };

    this.element = createDiv(
      {
        className: "__floccUI-radio-container",
      },
      () => {
        const els: (string | HTMLElement)[] = [];
        const label =
          this.opts.name || this.opts.label
            ? [createLabel({}, () => this.opts.name || this.opts.label)]
            : [];
        const choices = this.opts.choices.map((choice, i) => {
          const labelText = this.opts.choiceLabels[i];

          return createLabel(
            {
              className: "__floccUI-radio__label",
            },
            () => {
              const checked = this.opts.hasOwnProperty("value")
                ? this.opts.value === choice
                : i === 0;

              const input = createInput({
                type: "radio",
                name: `__floccUI-radio-${this.id}`,
                value: choice,
                checked,
              });
              input.addEventListener("change", onChange);

              return [
                input,
                createSpan({}, () => labelText || choice.toString()),
              ];
            }
          );
        });

        return els.concat(label).concat(choices);
      }
    );

    createStyle(styles, "__floccUI-radio-css");

    this.listen();
  }

  listen() {
    if (this.environment && this.opts.name) {
      const choices = Array.from(
        this.element.querySelectorAll(`[name="__floccUI-radio-${this.id}"]`)
      );
      choices.forEach((choice, i) => {
        if (!(choice instanceof HTMLInputElement)) return;
        const value = this.environment.get(this.opts.name);
        choice.checked = value === this.opts.choices[i];
      });
    }
    window.requestAnimationFrame(() => this.listen());
  }
}

export { Radio };
