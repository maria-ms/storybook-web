import "@maria-ms/components-web/accordion";
import "@maria-ms/components-web/badge";
import "@maria-ms/components-web/link";
import { createAccordionExample } from "./fixtures/accordion.mjs";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40023994-10&m=dev";

const accordion = ({ openItem = "accessibility" } = {}) => {
  const component = createAccordionExample({ openItem });

  const fixture = document.createElement("div");
  fixture.style.inlineSize = "var(--ds-semantic-layout-container-sm)";
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
      options: ["none", "accessibility", "styling", "animation", "rich"],
      description: "Native details open state. The Accordion keeps zero or one Item open.",
      table: { category: "State" },
    },
  },
  parameters: {
    layout: "centered",
    design: { type: "figma", url: figmaUrl },
  },
  render: accordion,
};

export const Playground = {};
