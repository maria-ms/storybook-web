/** @type {import("@storybook/web-components-vite").StorybookConfig} */
export default {
  stories: ["../src/**/*.stories.mjs"],
  addons: ["@storybook/addon-themes", "@storybook/addon-designs"],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
};
