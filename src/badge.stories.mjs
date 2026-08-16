import { expect } from "storybook/test";

import "@maria-ms/components-web/badge";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40023969-20&m=dev";

const draftingCompass = () => {
  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

  icon.setAttribute("aria-hidden", "true");
  icon.setAttribute("fill", "none");
  icon.setAttribute("viewBox", "0 0 19.5003 19.5001");
  path.setAttribute(
    "d",
    "M10.7401 4.48999L12.6701 7.92999M16.8861 9.75C15.9553 10.698 14.8449 11.4511 13.6197 11.9651C12.3946 12.4792 11.0792 12.744 9.75062 12.744C8.422 12.744 7.10669 12.4792 5.88154 11.9651C4.65639 11.4511 3.54596 10.698 2.61512 9.75M18.7502 18.7499L16.5902 14.9099M0.750133 18.75L8.77013 4.48999M11.7501 2.75C11.7501 3.85457 10.8547 4.75 9.75013 4.75C8.64556 4.75 7.75013 3.85457 7.75013 2.75C7.75013 1.64543 8.64556 0.75 9.75013 0.75C10.8547 0.75 11.7501 1.64543 11.7501 2.75Z",
  );
  path.setAttribute("stroke", "currentColor");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute("stroke-width", "1.5");
  icon.append(path);
  return icon;
};

const badge = ({
  color = "neutral",
  leadingIcon = false,
  size = "small",
  text = "Badge",
} = {}) => {
  const component = document.createElement("ds-badge");

  component.setAttribute("color", color);
  component.setAttribute("size", size);
  if (leadingIcon) component.append(draftingCompass());
  component.append(text);
  return component;
};

export default {
  title: "Components/Badge",
  component: "ds-badge",
  args: { color: "neutral", leadingIcon: false, size: "small", text: "Badge" },
  argTypes: {
    color: {
      control: "select",
      options: ["neutral", "primary", "success", "warning", "destructive", "blue"],
      table: { category: "Appearance" },
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      table: { category: "Appearance" },
    },
    text: {
      control: "text",
      description: "Required badge text. An optional decorative SVG may precede it in product markup.",
      table: { category: "Content" },
    },
    leadingIcon: {
      control: "boolean",
      description: "Story fixture: inserts Figma’s decorative drafting-compass SVG. It is not a ds-badge attribute.",
      table: { category: "Content" },
    },
  },
  parameters: { design: { type: "figma", url: figmaUrl } },
  render: badge,
};

export const Playground = {
  play: async ({ canvasElement }) => {
    const component = canvasElement.querySelector("ds-badge");
    const colors = ["neutral", "primary", "success", "warning", "destructive", "blue"];
    const themeTarget = canvasElement.closest("[data-theme]") ?? document.documentElement;
    const previousTheme = themeTarget.getAttribute("data-theme");

    await expect(component).toBeTruthy();

    const backgroundsForTheme = (theme) => {
      const backgrounds = new Map();

      themeTarget.setAttribute("data-theme", theme);
      for (const color of colors) {
        component.setAttribute("color", color);
        backgrounds.set(color, getComputedStyle(component).backgroundColor);
      }
      return backgrounds;
    };

    try {
      const lightBackgrounds = backgroundsForTheme("light");
      const darkBackgrounds = backgroundsForTheme("dark");

      await expect(new Set(lightBackgrounds.values()).size).toBe(colors.length);
      await expect(new Set(darkBackgrounds.values()).size).toBe(colors.length);

      for (const color of colors) {
        await expect(darkBackgrounds.get(color)).not.toBe(lightBackgrounds.get(color));
      }

      for (const [size, expectedHeight] of [
        ["small", 20],
        ["medium", 24],
        ["large", 32],
      ]) {
        component.setAttribute("size", size);
        await expect(component.offsetHeight).toBe(expectedHeight);
      }
    } finally {
      if (previousTheme === null) themeTarget.removeAttribute("data-theme");
      else themeTarget.setAttribute("data-theme", previousTheme);

      component.setAttribute("color", "neutral");
      component.setAttribute("size", "small");
    }
  },
};
