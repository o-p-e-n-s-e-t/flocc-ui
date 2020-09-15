export default function globalStyle() {
  if (!document.getElementById("__floccUI-global")) {
    const style = document.createElement("style");
    style.id = "__floccUI-global";
    style.innerHTML = `
        [class^="__floccUI-"],
        [class^="__floccUI-"] *,
        [class^="__floccUI-"]:after,
        [class^="__floccUI-"]:before {
            font-family: "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
            position: relative;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
        }
    `;
    document.head.appendChild(style);
  }
}
