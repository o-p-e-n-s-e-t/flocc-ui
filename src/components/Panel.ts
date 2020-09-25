import { Environment } from "flocc";
import Base from "./Base";
import createStyle from "../utils/createStyle";
import { createButton, createDiv } from "../utils/createElement";
import styles from "./Panel.css";

interface PanelOptions {}

const defaultPanelOptions: PanelOptions = Object.assign({}, {});

class Panel extends Base {
  collapsed: boolean = false;
  dragging: boolean = false;
  toggleButton: HTMLButtonElement = createButton(
    {
      className: "__floccUI-panel__toggle",
    },
    () => "&ndash;"
  );

  constructor(
    environment: Environment,
    children: Base[] = [],
    opts: PanelOptions = defaultPanelOptions
  ) {
    super();

    this.environment = environment;
    this.panel = this;

    const dragBar = createDiv(
      { className: "__floccUI-panel__toggle-container" },
      () => this.toggleButton
    );

    const components = createDiv({ className: "__floccUI-panel__components" });

    this.element = createDiv({ className: "__floccUI-panel" }, () => [
      dragBar,
      components,
    ]);
    document.body.appendChild(this.element);

    dragBar.addEventListener("mousedown", e => (this.dragging = true));
    document.body.addEventListener("mouseup", e => (this.dragging = false));

    document.body.addEventListener("mousemove", e => {
      if (!this.dragging) return;
      const { left, top } = this.element.getBoundingClientRect();
      this.element.style.left = left + e.movementX + "px";
      this.element.style.top = top + e.movementY + "px";
    });

    // add CSS
    createStyle(styles, "__floccUI-panel-css");

    children.forEach(child => {
      child.panel = this;
      child.environment = this.environment;
      child.update();
      components.appendChild(child.element);
    });

    this.toggleButton.addEventListener("click", () => {
      this.toggle();
    });

    this.update();
  }

  toggle() {
    this.collapsed = !this.collapsed;
    this.toggleButton.innerHTML = this.collapsed ? "+" : "&ndash;";
    this.update();
  }

  update() {
    if (this.collapsed) {
      this.element.classList.add("__floccUI-panel--collapsed");
    } else {
      this.element.classList.remove("__floccUI-panel--collapsed");
    }
  }
}

export { Panel };
