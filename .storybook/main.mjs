/** @type {import("@storybook/web-components-vite").StorybookConfig} */
export default {
  stories: [
    {
      directory: "../src",
      files: "**/*.stories.mjs",
      titlePrefix: "Web Components",
    },
  ],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-themes",
    "@storybook/addon-designs",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
};
