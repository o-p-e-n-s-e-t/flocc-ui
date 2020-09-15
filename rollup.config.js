import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/main.ts",
  output: [
    {
      file: "dist/flocc-ui.js",
      format: "umd",
      name: "floccUI",
    },
    {
      file: "dist/flocc-ui.es.js",
      format: "es",
      name: "floccUI",
    },
    {
      file: "client/dist/flocc-ui.js",
      format: "umd",
      name: "floccUI",
    },
  ],
  plugins: [
    typescript({
      typescript: require("typescript"),
    }),
  ],
};
