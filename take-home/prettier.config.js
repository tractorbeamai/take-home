import config from "@tractorbeam/prettier-config";

export default {
  ...config,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "src/styles.css",
  tailwindFunctions: ["cn", "cva"],
};
