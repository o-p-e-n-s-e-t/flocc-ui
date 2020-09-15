interface SliderOptions {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
}

const defaultSliderOptions = {
  min: 0,
  max: 1,
  step: 0.01,
  value: 0,
};

class Slider {
  element: HTMLInputElement;
  opts: SliderOptions = defaultSliderOptions;
  value: number;

  constructor(opts?: SliderOptions) {
    Object.assign(this.opts, opts);
    this.element = document.createElement("input");
    this.element.type = "range";
    this.element.min = this.opts.min.toString();
    this.element.max = this.opts.max.toString();
    this.element.step = this.opts.step.toString();
    this.element.value = this.opts.value.toString();
  }

  mount(el: string | HTMLElement): this {
    const container = typeof el === "string" ? document.querySelector(el) : el;
    if (container) container.appendChild(this.element);
    return this;
  }

  attach(v: Value): this {
    return this;
  }

  onChange(callback: (value: number) => void): this {
    this.element.addEventListener("input", () => {
      const value = +this.element.value;
      this.value = value;
      callback(this.value);
    });
    return this;
  }
}

export { Slider };
