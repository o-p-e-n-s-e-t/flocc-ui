import { parsePair } from "../utils/serialize";
import createStyle from "../utils/createStyle";
import Base from "./Base";
import styles from "./Slider.css";
import createElement, { createLabel } from "../utils/createElement";

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
  textLabel: HTMLLabelElement;

  constructor(opts?: SliderOptions) {
    super();
    Object.assign(this.opts, opts);

    this.value = this.opts.value;

    this.element = createElement(
      "div",
      {
        className: "__floccUI-slider__container",
      },
      () => {
        const children: HTMLElement[] = [];
        if (opts.label) {
          children.push(createElement("label", {}, () => opts.label));
        }
        children.push(
          createElement(
            "div",
            {
              className: "__floccUI-slider__inner",
            },
            () => {
              this.marker = createLabel({
                className: "__floccUI-slider__marker",
              });

              this.input = createElement<HTMLInputElement>("input", {
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

              const minLabel = createLabel(
                {
                  classList: "__floccUI-slider__marker __floccUI-slider__min",
                },
                () => this.opts.min.toString()
              );

              const maxLabel = createLabel(
                {
                  classList: "__floccUI-slider__marker __floccUI-slider__max",
                },
                () => this.opts.max.toString()
              );

              return [this.marker, this.input, minLabel, maxLabel];
            }
          )
        );
        return children;
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

    requestAnimationFrame(() => this.updateMarker());
  }

  updateMarker() {
    const { min, max } = this.opts;
    const { value } = this;
    const containerWidth = this.element.getBoundingClientRect().width;
    const { width } = this.input.getBoundingClientRect();

    const left = this.input.offsetLeft;
    const top = this.input.offsetTop;
    this.marker.innerHTML = value.toString();
    this.marker.style.top = `${top - 32}px`;

    const percent = (value - min) / (max - min);
    this.marker.style.left = `calc(${left + 6}px + (${100 * percent}% / ${
      containerWidth / (width - 12)
    }))`;
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
