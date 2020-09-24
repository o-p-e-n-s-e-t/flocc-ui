import { Environment } from "flocc";
import Base from "./Base";
import createStyle from "../utils/createStyle";
import { createDiv } from "../utils/createElement";
import styles from "./Panel.css";

interface PanelOptions {}

const defaultPanelOptions: PanelOptions = Object.assign({}, {});

class Panel extends Base {
  constructor(
    environment: Environment,
    children: () => Base[] = () => [],
    opts: PanelOptions = defaultPanelOptions
  ) {
    super();

    this.environment = environment;
    this.panel = this;

    const panel = createDiv({ className: "__floccUI-panel" });
    document.body.appendChild(panel);

    // add CSS
    createStyle(styles, "__floccUI-panel-css");

    const c = children();
    c.forEach((child) => {
      child.panel = this;
      child.environment = this.environment;
      child.update();
      panel.appendChild(child.element);
    });
  }

  listen() {}
}

export { Panel };
