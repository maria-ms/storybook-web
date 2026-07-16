import "@maria-ms/components-web/button";
import { fn } from "storybook/test";
import {
  escapeHtml,
  renderStoryGroup,
  setAttributes,
  sourceAttributes,
  sourceStoryGroup,
  staticStoryParametersFor,
  storyParameters,
} from "./story-helpers.mjs";

const plusIcon = () => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "var(--ds-button-icon-size)");
  svg.setAttribute("height", "var(--ds-button-icon-size)");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("aria-hidden", "true");
  svg.innerHTML = '<path d="M12 5v14M5 12h14" stroke-linecap="round" />';

  return svg;
};

const wrapperAttributes = (state) => ({
  "icon-only": state.iconOnly,
  size: state.size,
  tone: state.tone,
  variant: state.variant,
});

const renderButton = (state) => {
  const wrapper = document.createElement("ds-button");
  const control = document.createElement(state.href ? "a" : "button");

  setAttributes(wrapper, wrapperAttributes(state));
  if (state.href) {
    control.href = state.href;
    if (state.disabled) control.setAttribute("aria-disabled", "true");
  } else {
    control.type = state.submit ? "submit" : "button";
    control.disabled = Boolean(state.disabled);
  }
  if (state.onClick) control.addEventListener("click", state.onClick);

  if (state.iconOnly) {
    control.setAttribute("aria-label", state.label);
    control.append(plusIcon());
  } else {
    control.append(state.label);
  }

  wrapper.append(control);

  return wrapper;
};

const sourceButton = (state) => {
  const wrapper = sourceAttributes(wrapperAttributes(state));
  const content = state.iconOnly
    ? '\n    <svg aria-hidden="true"><!-- icon --></svg>\n  '
    : escapeHtml(state.label);

  if (state.href) {
    const attributes = sourceAttributes({
      href: state.href,
      "aria-disabled": state.disabled,
      "aria-label": state.iconOnly ? state.label : "",
    });

    return `<ds-button${wrapper}>\n  <a${attributes}>${content}</a>\n</ds-button>`;
  }

  const attributes = sourceAttributes({
    type: state.submit ? "submit" : "button",
    disabled: state.disabled,
    "aria-label": state.iconOnly ? state.label : "",
  });

  return `<ds-button${wrapper}>\n  <button${attributes}>${content}</button>\n</ds-button>`;
};

const parametersFor = (state, design) => ({
  ...storyParameters(sourceButton(state), design),
});

const renderGroup = (items) =>
  renderStoryGroup(items, renderButton, {
    alignItems: "center",
    gap: "var(--ds-primitive-space-05)",
  });

const groupParameters = (items, design) => ({
  ...staticStoryParametersFor(sourceStoryGroup(items, sourceButton), design),
});

const button = (state = {}) => ({
  label: "Button",
  size: "md",
  variant: "primary",
  ...state,
});

const variants = [
  "primary",
  "secondary",
  "outline",
  "ghost",
  "link",
  "link-muted",
].map((variant) => button({ variant }));

const sizes = ["xs", "sm", "md", "lg"].map((size) => button({ size }));

const iconButtons = ["xs", "sm", "md", "lg"].map((size) =>
  button({ iconOnly: true, label: "Add item", size }),
);

const meta = {
  title: "Components/Button",
  component: "ds-button",
  render: renderButton,
  args: {
    ...button(),
    onClick: fn(),
  },
  argTypes: {
    label: { control: "text", table: { category: "Content" } },
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "link", "link-muted"],
      table: { category: "Appearance" },
    },
    tone: {
      control: "select",
      options: ["", "destructive"],
      table: { category: "Appearance" },
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      table: { category: "Appearance" },
    },
    iconOnly: {
      control: "boolean",
      name: "icon-only",
      table: { category: "Appearance" },
    },
    disabled: { control: "boolean", table: { category: "State" } },
    href: { control: "text", table: { category: "Semantics" } },
    submit: { control: "boolean", table: { category: "Semantics" } },
    onClick: { control: false, table: { category: "Events" } },
    items: { control: false, table: { disable: true } },
  },
  parameters: parametersFor(button(), "40002012:9001"),
};

export default meta;

export const Default = {
  args: button(),
  parameters: parametersFor(button(), "40002012:9001"),
};

export const Variants = {
  args: { items: variants },
  render: ({ items }) => renderGroup(items),
  parameters: groupParameters(variants, "40002012:8988"),
};

export const Sizes = {
  args: { items: sizes },
  render: ({ items }) => renderGroup(items),
  parameters: groupParameters(sizes, "40002012:8988"),
};

export const Destructive = {
  args: button({ tone: "destructive" }),
  parameters: parametersFor(button({ tone: "destructive" }), "40020628:2911"),
};

export const IconOnly = {
  args: { items: iconButtons },
  render: ({ items }) => renderGroup(items),
  parameters: groupParameters(iconButtons, "40002020:11358"),
};
