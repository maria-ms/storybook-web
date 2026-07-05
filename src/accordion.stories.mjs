import "@maria-ms/components-web/accordion";
import {
  escapeHtml,
  indent,
  setAttributes,
  sourceAttributes,
  sourceStyle,
  setStyles,
  staticStoryParametersFor,
  storyParameters,
} from "./story-helpers.mjs";

const accordionAttributes = (state) => ({
  expanded: state.expanded,
  disabled: state.disabled,
  "aria-label": state.ariaLabel,
});

const accordionStyles = (state) => ({
  ...(state.width ? { width: state.width } : {}),
});

const accordionCardStyles = (state) => ({
  ...(state.width ? { width: state.width } : {}),
});

const renderAccordion = (state) => {
  const element = document.createElement("ds-accordion-item");
  const header = document.createElement("ds-accordion-header");
  const content = document.createElement("ds-accordion-content");

  setAttributes(element, accordionAttributes(state));
  setStyles(element, accordionStyles(state));
  header.textContent = state.title || "Accordion item";
  content.textContent = state.content || "";
  element.append(header, content);

  return element;
};

const renderAccordionCard = (state) => {
  const element = document.createElement("ds-accordion");

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
    `<ds-accordion-header>${escapeHtml(state.title || "Accordion item")}</ds-accordion-header>`,
    state.content &&
      `<ds-accordion-content>${escapeHtml(state.content)}</ds-accordion-content>`,
  ].filter(Boolean);

  return `<ds-accordion-item${attributes}>\n${indent(children.join("\n"))}\n</ds-accordion-item>`;
};

const sourceAccordionCard = (state) => {
  const attributes = sourceAttributes({
    "aria-label": state.ariaLabel,
    multiple: state.multiple,
    style: sourceStyle(accordionCardStyles(state)),
  });

  return `<ds-accordion${attributes}>\n${indent(state.items.map(sourceAccordion).join("\n"))}\n</ds-accordion>`;
};

const accordionParameters = (args, design) => ({
  ...storyParameters(sourceAccordion(args), design),
});

const accordionCardParameters = (args, design) => ({
  ...staticStoryParametersFor(sourceAccordionCard(args), design),
});

const bodyText =
  "Use accordion panels for progressive disclosure when the section title can stand on its own and the body contains supporting text or controls.";

const states = {
  default: {
    title: "Accordion item",
    content: bodyText,
    width: "353px",
  },
  disabled: {
    title: "Accordion item",
    content: bodyText,
    disabled: true,
    width: "353px",
  },
  expanded: {
    title: "Accordion item",
    content: bodyText,
    expanded: true,
    width: "353px",
  },
  customContent: {
    title: "Billing and invoice settings",
    content: bodyText,
    expanded: true,
    width: "420px",
  },
  card: {
    ariaLabel: "Frequently asked questions",
    width: "440px",
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
        content: "Set multiple on ds-accordion when the grouped behavior requires it.",
      },
    ],
  },
};

const meta = {
  title: "Accordion",
  component: "ds-accordion-item",
  tags: ["autodocs"],
  render: renderAccordion,
  args: states.default,
  argTypes: {
    ariaLabel: { control: "text", name: "aria-label" },
    disabled: { control: "boolean" },
    expanded: { control: "boolean" },
    width: { control: false, table: { disable: true } },
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
