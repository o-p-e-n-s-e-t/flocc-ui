import { createButton } from "../utils/createElement";
import createStyle from "../utils/createStyle";
import Base from "./Base";
import styles from "./Button.css";

interface ButtonOptions {
  label?: string;
  onClick?: () => void;
}

const defaultButtonOptions = {
  label: "Click Me",
  onClick: () => {},
};

class Button extends Base {
  opts: ButtonOptions = Object.assign({}, defaultButtonOptions);

  constructor(opts?: ButtonOptions) {
    super();
    Object.assign(this.opts, opts);

    this.element = createButton(
      {
        className: "__floccUI-button",
      },
      () => this.opts.label
    );

    this.element.addEventListener("click", this.opts.onClick);

    createStyle(styles, "__floccUI-button");
  }
}

export { Button };
