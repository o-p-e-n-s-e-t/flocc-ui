import { parsePair } from "../utils/serialize";
import globalStyle from "../utils/globalStyle";

interface SliderOptions {
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

class Slider {
  callbacks: ((value: number) => void)[] = [];
  element: HTMLElement;
  input: HTMLInputElement;
  minLabel: HTMLLabelElement;
  maxLabel: HTMLLabelElement;
  marker: HTMLLabelElement;
  opts: SliderOptions = Object.assign({}, defaultSliderOptions);
  value: number;

  constructor(opts?: SliderOptions) {
    globalStyle();

    Object.assign(this.opts, opts);

    this.value = this.opts.value;

    this.element = document.createElement("div");
    this.element.classList.add("__floccUI-slider__container");
    if (opts.style) {
      for (let key in opts.style) {
        const value = opts.style[key];
        const pair = parsePair(key, value);
        // @ts-ignore
        this.element.style[pair.key] = pair.value;
      }
    }
    this.input = document.createElement("input");
    this.input.classList.add("__floccUI-slider");
    this.input.type = "range";
    this.input.min = this.opts.min.toString();
    this.input.max = this.opts.max.toString();
    this.input.step = this.opts.step.toString();
    this.input.value = this.opts.value.toString();
    this.input.addEventListener("input", () => {
      const value = +this.input.value;
      this.value = value;
      this.updateMarker();
      this.callbacks.forEach((callback) => callback(this.value));
    });
    this.element.appendChild(this.input);

    this.minLabel = document.createElement("label");
    this.minLabel.innerHTML = this.opts.min.toString();
    this.maxLabel = document.createElement("label");
    this.maxLabel.style.float = "right";
    this.maxLabel.innerHTML = this.opts.max.toString();

    this.element.appendChild(this.minLabel);
    this.element.appendChild(this.maxLabel);

    this.marker = document.createElement("label");
    this.marker.classList.add("__floccUI-slider__marker");
    this.updateMarker();
    this.element.appendChild(this.marker);

    // add CSS
    if (!document.getElementById("__floccUI-slider-css")) {
      const style = document.createElement("style");
      style.id = "__floccUI-slider-css";
      style.innerHTML = `
        .__floccUI-slider__container {
        }
        .__floccUI-slider {
          appearance: none;
          -webkit-appearance: none;
          display: block;
          width: 100%;
        }
        .__floccUI-slider__marker {
          background: #aaa;
          color: #fff;
          padding: 3px;
          position: absolute;
          top: -20px;
          transform: translateX(-50%);
          font-size: 14px;
        }
      `;
      document.head.appendChild(style);
    }
  }

  updateMarker() {
    const { min, max } = this.opts;
    const { value } = this;
    this.marker.innerHTML = value.toString();
    this.marker.style.left = `calc(10px + (100% - 16px) * ${
      (value - min) / (max - min)
    })`;
  }

  mount(el: string | HTMLElement): this {
    const container = typeof el === "string" ? document.querySelector(el) : el;
    if (container) container.appendChild(this.element);
    return this;
  }

  onChange(callback: (value: number) => void): this {
    this.element.addEventListener("input", () => {
      const value = +this.input.value;
      this.value = value;
      this.updateMarker();
      callback(this.value);
    });
    return this;
  }
}

export { Slider };
