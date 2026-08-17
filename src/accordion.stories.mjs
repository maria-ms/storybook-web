import "@maria-ms/components-web/accordion";
import "@maria-ms/components-web/badge";
import "@maria-ms/components-web/link";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40023994-10&m=dev";

const richItem = ({ open }) => {
  const item = document.createElement("details");
  const summary = document.createElement("summary");
  const body = document.createElement("div");
  const supportingText = document.createElement("p");
  const actions = document.createElement("div");
  const badge = document.createElement("ds-badge");
  const link = document.createElement("ds-link");
  const anchor = document.createElement("a");

  item.open = open;
  summary.textContent = "What accessibility standards are met?";
  supportingText.textContent =
    "This component meets WCAG 2.1 AA accessibility guidelines and has been tested with screen readers.";
  actions.style.display = "flex";
  actions.style.alignItems = "center";
  actions.style.gap = "var(--ds-semantic-spacing-xs)";
  badge.setAttribute("color", "success");
  badge.setAttribute("size", "small");
  badge.textContent = "WCAG 2.1 AA";
  link.setAttribute("size", "small");
  link.setAttribute("tone", "primary");
  anchor.href = "#accessibility-report";
  anchor.textContent = "View accessibility report";
  link.append(anchor);
  actions.append(badge, link);
  body.append(supportingText, actions);
  item.append(summary, body);
  return item;
};

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

  component.append(richItem({ open: openItem === "rich" }));

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
