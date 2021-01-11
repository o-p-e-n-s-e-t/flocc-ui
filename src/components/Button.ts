import { createButton } from "../utils/createElement";
import createStyle from "../utils/createStyle";
import Base from "./Base";
import styles from "./Button.css";

interface ButtonOptions {
  label?: string | (() => string);
  onClick?: () => void;
}

const defaultButtonOptions = {
  label: "Click Me",
  onClick: () => {}
};

class Button extends Base {
  opts: ButtonOptions = Object.assign({}, defaultButtonOptions);

  constructor(opts?: ButtonOptions) {
    super();
    Object.assign(this.opts, opts);

    this.element = createButton(
      {
        className: "__floccUI-button"
      },
      () => {
        const { label } = this.opts;
        return typeof label === "string" ? label : label();
      }
    );

    this.opts.onClick &&
      this.element.addEventListener("click", () => {
        this.opts.onClick();
      });

    createStyle(styles, "__floccUI-button-css");

    this.listen();
  }

  listen() {
    const { label } = this.opts;
    this.element.innerHTML = typeof label === "string" ? label : label();
    window.requestAnimationFrame(() => this.listen());
  }
}

export { Button };
