import "@maria-ms/components-web/button";
import {
  docsSource,
  escapeHtml,
  figmaNodeUrl,
  indent,
  setAttributes,
  setStyles,
  sourceAttributes,
  sourceStyle,
} from "./story-helpers.mjs";

const iconPaths = {
  arrowUpRight: "M7 17L17 7M17 7H7M17 7V17",
  search:
    "M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z",
};

const iconLabels = {
  arrowUpRight: "arrow-up-right",
  search: "search",
};

const buttonAttributes = (state) => ({
  type: state.type,
  variant: state.variant,
  size: state.size,
  tone: state.tone,
  disabled: state.disabled,
  href: state.href,
  target: state.target,
  rel: state.rel,
  "aria-label": state.ariaLabel,
});

const buttonStyles = (state) => ({
  ...(state.width ? { width: state.width } : {}),
});

const buttonIcon = (slot, name) => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("slot", slot);
  path.setAttribute("d", iconPaths[name]);
  path.setAttribute("stroke", "currentColor");
  path.setAttribute("stroke-width", "1.5");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  svg.append(path);

  return svg;
};

const renderButton = (state) => {
  const element = document.createElement("ds-button");

  setAttributes(element, buttonAttributes(state));
  setStyles(element, buttonStyles(state));

  if (state.mediaIcon) element.append(buttonIcon("media", state.mediaIcon));
  if (state.label) element.append(state.label);
  if (state.endIcon) element.append(buttonIcon("end", state.endIcon));

  return element;
};

const sourceIcon = (slot, name) =>
  `<svg${sourceAttributes({ slot, "aria-hidden": "true" })}><!-- ${iconLabels[name]} icon --></svg>`;

const sourceButton = (state) => {
  const attributes = sourceAttributes({
    ...buttonAttributes(state),
    style: sourceStyle(buttonStyles(state)),
  });
  const children = [
    state.mediaIcon && sourceIcon("media", state.mediaIcon),
    state.label && escapeHtml(state.label),
    state.endIcon && sourceIcon("end", state.endIcon),
  ].filter(Boolean);

  return children.length
    ? `<ds-button${attributes}>\n${indent(children.join("\n"))}\n</ds-button>`
    : `<ds-button${attributes}></ds-button>`;
};

const buttonParameters = (args, design) => ({
  ...(design && { design: { type: "figma", url: figmaNodeUrl(design) } }),
  docs: docsSource(sourceButton(args)),
});

const button = (state = {}) => ({
  label: "Button",
  mediaIcon: "search",
  endIcon: "arrowUpRight",
  ...state,
});

const states = {
  default: button(),
  disabled: button({ disabled: true }),
  focused: button(),
  iconOnly: {
    ariaLabel: "Search",
    mediaIcon: "search",
  },
  link: button({ href: "#button-link", variant: "link" }),
  linkMuted: button({ href: "#button-link-muted", variant: "link-muted" }),
  ghost: button({ variant: "ghost" }),
  outline: button({ variant: "outline" }),
  secondary: button({ variant: "secondary" }),
  destructive: button({ tone: "destructive" }),
  destructiveSecondary: button({ tone: "destructive", variant: "secondary" }),
  sizes: [
    button({ size: "x-small" }),
    button({ size: "small" }),
    button({ size: "medium" }),
    button({ size: "large" }),
  ],
  withoutIcons: button({ endIcon: "", mediaIcon: "" }),
};

const renderGroup = (items) => {
  const container = document.createElement("div");

  container.style.display = "flex";
  container.style.alignItems = "center";
  container.style.flexWrap = "wrap";
  container.style.gap = "var(--ds-primitive-space-04)";
  container.append(...items.map(renderButton));

  return container;
};

const sourceGroup = (items) =>
  `<div>\n${indent(items.map(sourceButton).join("\n"))}\n</div>`;

const groupParameters = (items, design) => ({
  ...(design && { design: { type: "figma", url: figmaNodeUrl(design) } }),
  docs: docsSource(sourceGroup(items)),
});

const meta = {
  title: "Button",
  component: "ds-button",
  tags: ["autodocs"],
  render: renderButton,
  args: states.default,
  argTypes: {
    ariaLabel: { control: "text", name: "aria-label" },
    disabled: { control: "boolean" },
    href: { control: "text" },
    rel: { control: "text" },
    size: {
      control: "select",
      options: ["", "x-small", "small", "medium", "large"],
    },
    target: { control: "text" },
    tone: { control: "select", options: ["", "destructive"] },
    type: { control: "select", options: ["", "button", "submit", "reset"] },
    variant: {
      control: "select",
      options: ["", "primary", "secondary", "outline", "link", "link-muted", "ghost"],
    },
    endIcon: { control: false, table: { disable: true } },
    label: { control: false, table: { disable: true } },
    mediaIcon: { control: false, table: { disable: true } },
    width: { control: false, table: { disable: true } },
  },
  parameters: buttonParameters(states.default, "40002012:9001"),
};

export default meta;

export const Default = {
  args: states.default,
  parameters: buttonParameters(states.default, "40002012:9001"),
};

export const Secondary = {
  args: states.secondary,
  parameters: buttonParameters(states.secondary, "40002012:8956"),
};

export const Outline = {
  args: states.outline,
  parameters: buttonParameters(states.outline, "40010741:10901"),
};

export const Link = {
  args: states.link,
  parameters: buttonParameters(states.link, "40002278:5081"),
};

export const LinkMuted = {
  args: states.linkMuted,
  parameters: buttonParameters(states.linkMuted, "40020628:2838"),
};

export const Ghost = {
  args: states.ghost,
  parameters: buttonParameters(states.ghost, "40002012:8911"),
};

export const Destructive = {
  args: states.destructive,
  parameters: buttonParameters(states.destructive, "40020628:2943"),
};

export const DestructiveSecondary = {
  args: states.destructiveSecondary,
  parameters: buttonParameters(states.destructiveSecondary, "40020628:3007"),
};

export const Disabled = {
  args: states.disabled,
  parameters: buttonParameters(states.disabled, "40002012:9009"),
};

export const Focused = {
  args: states.focused,
  parameters: buttonParameters(states.focused, "40020627:2187"),
  play: async ({ canvasElement }) => {
    canvasElement.querySelector("ds-button")?.focus();
  },
};

export const IconOnly = {
  args: states.iconOnly,
  parameters: buttonParameters(states.iconOnly, "40002012:9001"),
};

export const WithoutIcons = {
  args: states.withoutIcons,
  parameters: buttonParameters(states.withoutIcons),
};

export const Sizes = {
  args: { items: states.sizes },
  render: ({ items }) => renderGroup(items),
  parameters: groupParameters(states.sizes, "40002012:8988"),
  argTypes: {
    items: { control: false, table: { disable: true } },
  },
};
