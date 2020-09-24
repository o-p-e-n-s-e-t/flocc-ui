import { parsePair } from "../utils/serialize";
import Base from "./Base";

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

class Slider extends Base {
  callbacks: ((value: number) => void)[] = [];
  input: HTMLInputElement;
  inner: HTMLDivElement;
  minLabel: HTMLLabelElement;
  maxLabel: HTMLLabelElement;
  marker: HTMLLabelElement;
  opts: SliderOptions = Object.assign({}, defaultSliderOptions);
  value: number;

  constructor(opts?: SliderOptions) {
    super();
    Object.assign(this.opts, opts);

    this.value = this.opts.value;

    this.element = document.createElement("div");
    this.element.classList.add("__floccUI-slider__container");

    this.inner = document.createElement("div");
    this.inner.classList.add("__floccUI-slider__inner");
    this.element.appendChild(this.inner);

    if (opts.style) {
      for (let key in opts.style) {
        const value = opts.style[key];
        const pair = parsePair(key, value);
        // @ts-ignore
        this.element.style[pair.key] = pair.value;
      }
    }

    this.marker = document.createElement("label");
    this.marker.classList.add("__floccUI-slider__marker");
    this.element.appendChild(this.marker);

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
    this.inner.appendChild(this.input);

    this.minLabel = document.createElement("label");
    this.minLabel.innerHTML = this.opts.min.toString();
    this.minLabel.classList.add(
      "__floccUI-slider__marker",
      "__floccUI-slider__min"
    );
    this.maxLabel = document.createElement("label");
    this.maxLabel.innerHTML = this.opts.max.toString();
    this.maxLabel.classList.add(
      "__floccUI-slider__marker",
      "__floccUI-slider__max"
    );

    this.inner.appendChild(this.minLabel);
    this.inner.appendChild(this.maxLabel);

    // add CSS
    if (!document.getElementById("__floccUI-slider-css")) {
      const style = document.createElement("style");
      style.id = "__floccUI-slider-css";
      style.innerHTML = `
        .__floccUI-slider__container {
          user-select: none;
        }
        .__floccUI-slider__inner {
          padding: 30px 0 24px;
        }
        .__floccUI-slider {
          appearance: none;
          -webkit-appearance: none;
          display: block;
          width: 100%;
        }
        .__floccUI-slider:focus {
          outline: 0;
        }
        .__floccUI-slider::-webkit-slider-thumb {
          appearance: none;
          -webkit-appearance: none;
          border: 1px solid #000000;
          border-radius: 50%;
          height: 12px;
          width: 12px;
          background: #ffffff;
          cursor: pointer;
          margin-top: -6px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
        }
        .__floccUI-slider::-webkit-slider-runnable-track {
          width: 100%;
          height: 4px;
          cursor: pointer;
          background: rgba(0, 0, 0, 0.15);
          border-radius: 2px;
        }
        .__floccUI-slider::-ms-track {
          width: 100%;
          cursor: pointer;
          background: transparent; 
          border-color: transparent;
          color: transparent;
        }
        .__floccUI-slider__marker {
          background: #fff;
          border: 1px solid #aaa;
          padding: 3px;
          position: absolute;
          top: 0;
          transform: translateX(-50%);
          font-size: 11px;
        }
        .__floccUI-slider__marker:before {
          content: "";
          display: block;
          position: absolute;
          bottom: -4px;
          left: calc(50% - 4px);
          height: 7px;
          width: 7px;
          transform: rotate(45deg);
          background: #fff;
          border-bottom: 1px solid #aaa;
          border-right: 1px solid #aaa;
        }
        .__floccUI-slider__min {
          bottom: 0;
          top: unset;
          left: 8px;
        }
        .__floccUI-slider__max {
          float: right;
          top: unset;
          bottom: 0;
          right: -16px;
        }
        .__floccUI-slider__min:before,
        .__floccUI-slider__max:before {
          content: "";
          display: block;
          position: absolute;
          top: -4px;
          left: calc(50% - 4px);
          height: 7px;
          width: 7px;
          transform: rotate(225deg);
          background: #fff;
          border-bottom: 1px solid #aaa;
          border-right: 1px solid #aaa;
        }
      `;
      document.head.appendChild(style);
    }

    requestAnimationFrame(() => this.updateMarker());
  }

  updateMarker() {
    const { min, max } = this.opts;
    const { value } = this;
    const containerWidth = this.element.getBoundingClientRect().width;
    const { width } = this.input.getBoundingClientRect();
    const left = this.input.offsetLeft;
    const top = this.input.offsetTop;
    // console.log(left, top, width);
    this.marker.innerHTML = value.toString();
    this.marker.style.top = `${top - 32}px`;

    // console.log(width / (width - 2 * left));
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
