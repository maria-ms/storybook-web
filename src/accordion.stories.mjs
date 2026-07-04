import "@maria-ms/components-web/accordion";
import {
  docsSource,
  escapeHtml,
  figmaNodeUrl,
  indent,
  setAttributes,
  sourceAttributes,
  sourceStyle,
  setStyles,
} from "./story-helpers.mjs";

const accordionAttributes = (state) => ({
  expanded: state.expanded,
  disabled: state.disabled,
  "aria-label": state.ariaLabel,
});

const accordionStyles = (state) => ({
  ...(state.width ? { "--accordion-width": state.width } : {}),
});

const accordionCardStyles = (state) => ({
  ...(state.width ? { "--accordion-card-width": state.width } : {}),
});

const renderAccordion = (state) => {
  const element = document.createElement("accordion-item");
  const header = document.createElement("accordion-header");
  const content = document.createElement("accordion-content");

  setAttributes(element, accordionAttributes(state));
  setStyles(element, accordionStyles(state));
  header.textContent = state.title || "Accordion 1";
  content.textContent = state.content || "";
  element.append(header, content);

  return element;
};

const renderAccordionCard = (state) => {
  const element = document.createElement("accordion-card");

  setAttributes(element, {
    "aria-label": state.ariaLabel,
    multiple: state.multiple,
  });
  setStyles(element, accordionCardStyles(state));
  element.append(...state.items.map(renderAccordion));

  return element;
};

const sourceAccordion = (state) => {
  const attributes = sourceAttributes({
    ...accordionAttributes(state),
    style: sourceStyle(accordionStyles(state)),
  });
  const children = [
    `<accordion-header>${escapeHtml(state.title || "Accordion 1")}</accordion-header>`,
    state.content &&
      `<accordion-content>${escapeHtml(state.content)}</accordion-content>`,
  ].filter(Boolean);

  return `<accordion-item${attributes}>\n${indent(children.join("\n"))}\n</accordion-item>`;
};

const sourceAccordionCard = (state) => {
  const attributes = sourceAttributes({
    "aria-label": state.ariaLabel,
    multiple: state.multiple,
    style: sourceStyle(accordionCardStyles(state)),
  });

  return `<accordion-card${attributes}>\n${indent(state.items.map(sourceAccordion).join("\n"))}\n</accordion-card>`;
};

const accordionParameters = (args, design) => ({
  ...(design && { design: { type: "figma", url: figmaNodeUrl(design) } }),
  docs: docsSource(sourceAccordion(args)),
});

const accordionCardParameters = (args, design) => ({
  ...(design && { design: { type: "figma", url: figmaNodeUrl(design) } }),
  docs: docsSource(sourceAccordionCard(args)),
});

const bodyText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempor lorem non est congue blandit. Praesent non lorem sodales, suscipit est sed, hendrerit dolor.";

const states = {
  default: {
    title: "Accordion 1",
    content: bodyText,
  },
  disabled: {
    title: "Accordion 1",
    content: bodyText,
    disabled: true,
  },
  expanded: {
    title: "Accordion 1",
    content: bodyText,
    expanded: true,
  },
  longContent: {
    title: "Billing and invoice settings",
    content:
      "Use accordion panels for progressive disclosure when the section title can stand on its own and the body contains supporting text or controls.",
    expanded: true,
    width: "420px",
  },
  card: {
    ariaLabel: "Frequently asked questions",
    items: [
      {
        title: "Is it accessible?",
        content: "Yes. It adheres to the WAI-ARIA design pattern.",
        expanded: true,
      },
      {
        title: "Is it styled?",
        content:
          "Yes. It uses design-system tokens for spacing, color, radius, and shadow.",
      },
      {
        title: "Is it animated?",
        content:
          "Yes. The icon rotates between collapsed and expanded states.",
      },
    ],
  },
};

const meta = {
  title: "Accordion",
  component: "accordion-item",
  tags: ["autodocs"],
  render: renderAccordion,
  args: states.default,
  argTypes: {
    ariaLabel: { control: "text", name: "aria-label" },
    disabled: { control: "boolean" },
    expanded: { control: "boolean" },
    width: {
      control: "text",
      name: "--accordion-width",
      table: { category: "CSS custom properties" },
    },
    content: { control: false, table: { disable: true } },
    items: { control: false, table: { disable: true } },
    multiple: { control: false, table: { disable: true } },
    title: { control: false, table: { disable: true } },
  },
  parameters: accordionParameters(states.default, "40002151:4271"),
};

export default meta;

export const Default = {
  args: states.default,
  parameters: accordionParameters(states.default, "40002151:4271"),
};

export const Expanded = {
  args: states.expanded,
  parameters: accordionParameters(states.expanded, "40002151:4276"),
};

export const Disabled = {
  args: states.disabled,
  parameters: accordionParameters(states.disabled, "40002151:4271"),
};

export const LongContent = {
  args: states.longContent,
  parameters: accordionParameters(states.longContent),
};

export const Card = {
  args: states.card,
  render: renderAccordionCard,
  parameters: accordionCardParameters(states.card, "40020761:13170"),
};
