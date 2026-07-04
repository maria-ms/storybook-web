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
  staticStoryParameters,
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
  header.textContent = state.title || "Accordion item";
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
    `<accordion-header>${escapeHtml(state.title || "Accordion item")}</accordion-header>`,
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
  ...staticStoryParameters,
  ...(design && { design: { type: "figma", url: figmaNodeUrl(design) } }),
  docs: docsSource(sourceAccordionCard(args)),
});

const bodyText =
  "Use accordion panels for progressive disclosure when the section title can stand on its own and the body contains supporting text or controls.";

const states = {
  default: {
    title: "Accordion item",
    content: bodyText,
  },
  disabled: {
    title: "Accordion item",
    content: bodyText,
    disabled: true,
  },
  expanded: {
    title: "Accordion item",
    content: bodyText,
    expanded: true,
  },
  customContent: {
    title: "Billing and invoice settings",
    content: bodyText,
    expanded: true,
    width: "420px",
  },
  card: {
    ariaLabel: "Frequently asked questions",
    items: [
      {
        title: "Is it accessible?",
        content: "Yes. It follows the disclosure pattern and manages expanded state.",
        expanded: true,
      },
      {
        title: "Can it contain controls?",
        content:
          "Yes. Use the content slot for supporting copy, controls, or composed markup.",
      },
      {
        title: "Can multiple panels stay open?",
        content: "Set multiple on accordion-card when the grouped behavior requires it.",
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

export const CustomContent = {
  args: states.customContent,
  parameters: accordionParameters(states.customContent),
};

export const Card = {
  args: states.card,
  render: renderAccordionCard,
  parameters: accordionCardParameters(states.card, "40020761:13170"),
};
