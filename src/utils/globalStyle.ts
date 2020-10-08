import createStyle from "./createStyle";

export default function globalStyle() {
  createStyle(
    `
    [class^="__floccUI-"],
    [class^="__floccUI-"] *,
    [class^="__floccUI-"]:after,
    [class^="__floccUI-"]:before {
        font-family: "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 12px;
        position: relative;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }`,
    "__floccUI-global"
  );
}
