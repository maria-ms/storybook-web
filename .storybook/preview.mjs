import { withThemeByDataAttribute } from "@storybook/addon-themes";

import "@maria-ms/tokens/css/light";
import "@maria-ms/tokens/css/dark";
import "../src/preview.css";

/** @type {import("@storybook/web-components-vite").Preview} */
export default {
  parameters: {
    docs: { disable: true },
    layout: "centered",
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
      attributeName: "data-theme",
    }),
  ],
};
