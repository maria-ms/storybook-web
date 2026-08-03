import { expect, userEvent } from "storybook/test";

import "@maria-ms/components-web/accordion";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40023994-10&m=dev";

const accordion = ({ openItem = "accessibility" } = {}) => {
  const component = document.createElement("ds-accordion");
  const items = [
    ["accessibility", "Is it accessible?", "Yes. It uses native disclosure semantics."],
    ["styling", "Is it styled?", "Yes. It uses token-bound spacing, dividers, and focus treatment."],
    ["animation", "Is it animated?", "Yes. Content expands and collapses with the native disclosure control."],
  ];

  items.forEach(([value, header, body]) => {
    const item = document.createElement("details");
    const summary = document.createElement("summary");
    const content = document.createElement("p");

    item.open = openItem === value;
    summary.textContent = header;
    content.textContent = body;
    item.append(summary, content);
    component.append(item);
  });

  const fixture = document.createElement("div");
  fixture.style.inlineSize = "var(--ds-semantic-container-sm)";
  fixture.style.maxInlineSize = "100%";
  fixture.append(component);
  return fixture;
};

export default {
  title: "Components/Accordion",
  component: "ds-accordion",
  args: { openItem: "accessibility" },
  argTypes: {
    openItem: {
      control: "select",
      options: ["none", "accessibility", "styling", "animation"],
      description: "Native details open state. The Accordion keeps zero or one Item open.",
      table: { category: "Native behavior" },
    },
  },
  parameters: {
    layout: "centered",
    design: { type: "figma", url: figmaUrl },
  },
  render: accordion,
};

export const Playground = {
  play: async ({ canvasElement }) => {
    const component = canvasElement.querySelector("ds-accordion");
    const fixture = component.parentElement;
    const items = canvasElement.querySelectorAll("ds-accordion > details");
    const widthBeforeToggle = component.getBoundingClientRect().width;

    await expect(getComputedStyle(component).borderTopStyle).toBe("solid");
    await expect(component.getBoundingClientRect().width).toBe(fixture.getBoundingClientRect().width);
    await expect(CSS.supports("selector(details::details-content)")).toBe(true);
    await expect(getComputedStyle(items[0], "::details-content").transitionProperty).toContain(
      "block-size",
    );

    await userEvent.click(items[1].querySelector("summary"));
    await expect(items[0]).not.toHaveAttribute("open");
    await expect(items[1]).toHaveAttribute("open");
    await expect(component.getBoundingClientRect().width).toBe(widthBeforeToggle);

    await userEvent.click(items[1].querySelector("summary"));
    await expect(items[1]).not.toHaveAttribute("open");
    await expect(component.getBoundingClientRect().width).toBe(widthBeforeToggle);
  },
};
