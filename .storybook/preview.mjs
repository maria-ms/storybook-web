import { withThemeByDataAttribute } from "@storybook/addon-themes";

import "@maria-ms/tokens/css/light";
import "@maria-ms/tokens/css/dark";

/** @type {import("@storybook/web-components-vite").Preview} */
export default {
  parameters: {
    controls: { expanded: true },
    layout: "centered",
    backgrounds: {
      options: {
        light: { name: "Light", value: "#fafafa" },
        dark: { name: "Dark", value: "#0a0a0a" },
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: "light", grid: false },
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
