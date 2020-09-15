import globalStyle from "../utils/globalStyle";

export default class Base {
  element: HTMLElement;
  constructor() {
    globalStyle();
  }
  mount(el: string | HTMLElement): this {
    const container = typeof el === "string" ? document.querySelector(el) : el;
    if (container) container.appendChild(this.element);
    return this;
  }
}
