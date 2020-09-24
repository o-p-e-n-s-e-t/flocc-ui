import { parsePair } from "../utils/serialize";
import createStyle from "../utils/createStyle";
import Base from "./Base";
import styles from "./Slider.css";
import { createDiv, createLabel, createInput } from "../utils/createElement";

interface SliderOptions {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  style?: {
    [key: string]: string | number;
  };
}

const defaultSliderOptions = {
  min: 0,
  max: 1,
  step: 0.01,
  value: 0,
};

class Slider extends Base {
  callbacks: ((value: number) => void)[] = [];
  input: HTMLInputElement;
  marker: HTMLLabelElement;
  opts: SliderOptions = Object.assign({}, defaultSliderOptions);
  value: number;

  constructor(opts?: SliderOptions) {
    super();
    Object.assign(this.opts, opts);

    this.value = this.opts.value;

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
    for (let v = opts.min; v < opts.max; v += opts.step) {
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
          opts.label ? createLabel({}, () => opts.label) : null,
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
                value: this.opts.value.toString(),
              });
              this.input.addEventListener("input", () => {
                const value = +this.input.value;
                this.value = value;
                this.updateMarker();
                this.callbacks.forEach((callback) => callback(this.value));
              });
              return this.input;
            }
          ),
          this.marker,
        ];
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
    createStyle(styles, "__floccUI-slider-css");

    this.updateMarker();
  }

  updateMarker() {
    const { step } = this.opts;
    const decimals =
      (step | 0) === step ? 0 : step.toString().split(".")[1].length || 0;

    let strValue = this.value.toString();
    if (decimals > 0 && !strValue.includes(".")) strValue += ".";
    while (strValue.split(".")[1].length < decimals) strValue += "0";
    this.marker.innerHTML = strValue;
  }

  once(callback: (value: number) => void): this {
    callback(this.value);
    return this;
  }

  onChange(callback: (value: number) => void): this {
    this.callbacks.push(callback);
    return this;
  }
}

export { Slider };
