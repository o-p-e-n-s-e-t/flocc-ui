import { parsePair } from "../utils/serialize";
import createStyle from "../utils/createStyle";
import Base from "./Base";
import styles from "./Slider.css";
import { createDiv, createLabel, createInput } from "../utils/createElement";

interface SliderOptions {
  label?: string;
  name?: string;
  min?: number;
  max?: number;
  step?: number;
  style?: {
    [key: string]: string | number;
  };
}

const defaultSliderOptions = {
  min: 0,
  max: 1,
  step: 0.01,
};

class Slider extends Base {
  listenerID: number;
  callbacks: ((value: number) => void)[] = [];
  input: HTMLInputElement;
  marker: HTMLLabelElement;
  opts: SliderOptions = Object.assign({}, defaultSliderOptions);

  constructor(opts?: SliderOptions) {
    super();
    Object.assign(this.opts, opts);

    this.marker = createLabel({
      className: "__floccUI-slider__marker",
    });

    const fauxMarker = createLabel({
      className: "__floccUI-slider__marker",
    });
    fauxMarker.style.position = "absolute";
    fauxMarker.style.opacity = "0";
    document.body.appendChild(fauxMarker);

    let longestNumString = "";
    for (let v = this.opts.min; v < this.opts.max; v += this.opts.step) {
      // prevent floating-point numbers from getting too long
      v = Math.round(v * 10000) / 10000;
      if (v.toString().length > longestNumString.length) {
        longestNumString = v.toString();
      }
    }
    fauxMarker.innerHTML = longestNumString;
    requestAnimationFrame(() => {
      this.marker.style.width = fauxMarker.clientWidth + "px";
      document.body.removeChild(fauxMarker);
    });

    this.element = createDiv(
      {
        className: "__floccUI-slider__container",
      },
      () => {
        return [
          this.opts.label || this.opts.name
            ? createLabel({}, () => this.opts.label || this.opts.name)
            : null,
          createDiv(
            {
              className: "__floccUI-slider__inner",
            },
            () => {
              this.input = createInput({
                classList: "__floccUI-slider",
                type: "range",
                min: this.opts.min.toString(),
                max: this.opts.max.toString(),
                step: this.opts.step.toString(),
              });
              this.input.addEventListener("input", () => {
                const value = +this.input.value;
                this.opts.name && this.environment?.set(this.opts.name, value);
              });
              return this.input;
            }
          ),
          this.marker,
        ];
      }
    );

    if (this.opts.style) {
      for (let key in this.opts.style) {
        const value = this.opts.style[key];
        const pair = parsePair(key, value);
        // @ts-ignore
        this.element.style[pair.key] = pair.value;
      }
    }

    // add CSS
    createStyle(styles, "__floccUI-slider-css");

    this.listen();
  }

  updateMarker() {
    const { step } = this.opts;
    const decimals =
      (step | 0) === step ? 0 : step.toString().split(".")[1].length || 0;

    const value = this.environment?.get(this.opts.name);
    if (value === null || value === undefined) return;

    let strValue = value.toString();

    if (decimals > 0 && !strValue.includes(".")) {
      strValue += ".";
      while (strValue.split(".")[1].length < decimals) strValue += "0";
    }
    this.marker.innerHTML = strValue;
  }

  listen() {
    if (this.environment && this.opts.name) {
      this.input.value = this.environment.get(this.opts.name);
      this.updateMarker();
    }
    window.requestAnimationFrame(() => this.listen());
  }
}

export { Slider };
