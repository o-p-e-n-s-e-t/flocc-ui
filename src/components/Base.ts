import { Environment } from "flocc";
import globalStyle from "../utils/globalStyle";
import { Panel } from "./Panel";

export default class Base {
  element: HTMLElement;
  environment: Environment;
  panel: Panel;

  constructor() {
    globalStyle();
  }

  update() {}
}
