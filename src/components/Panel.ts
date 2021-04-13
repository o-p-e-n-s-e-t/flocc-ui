import { Environment } from "flocc";
import Base from "./Base";
import createStyle from "../utils/createStyle";
import { createButton, createDiv } from "../utils/createElement";
import styles from "./Panel.css";

interface PanelOptions {
  mount?: string | HTMLElement;
}

const defaultPanelOptions: PanelOptions = Object.assign(
  {},
  {
    mount: null,
  }
);

class Panel extends Base {
  collapsed: boolean = false;
  dragging: boolean = false;
  floating: boolean;
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

    let container: HTMLElement = document.body;

    if (opts.hasOwnProperty("mount") && opts.mount !== null) {
      container =
        opts.mount instanceof HTMLElement
          ? opts.mount
          : document.querySelector(opts.mount);
      if (container) {
        this.floating = false;
      } else {
        console.warn(
          "You passed a selector or element, but it wasn't found on the page. Falling back to a floating Panel instead."
        );
        container = document.body;
        this.floating = true;
      }
    } else {
      this.floating = true;
    }

    const dragBar = createDiv(
      {
        className:
          "__floccUI-panel__toggle-container" +
          (this.floating ? " __floccUI-panel__toggle-container--floating" : ""),
      },
      () => this.toggleButton
    );

    const components = createDiv({ className: "__floccUI-panel__components" });

    this.element = createDiv({ className: "__floccUI-panel" }, () => [
      dragBar,
      components,
    ]);

    container.appendChild(this.element);

    const dragOn = () => (this.dragging = true);
    const dragOff = () => (this.dragging = false);

    if (this.floating) {
      dragBar.addEventListener("mousedown", dragOn);
      document.body.addEventListener("mouseup", dragOff);
      document.body.addEventListener("mouseleave", dragOff);

      document.body.addEventListener("mousemove", e => {
        // do nothing if we're not currently dragging
        if (!this.dragging) return;
        const { left, top } = this.element.getBoundingClientRect();
        this.element.style.left = left + e.movementX + "px";
        this.element.style.top = top + e.movementY + "px";
      });
    }

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
