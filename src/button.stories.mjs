import "@maria-ms/components-web/button";
import "@maria-ms/components-web/input-text";
import {
  docsSource,
  escapeHtml,
  figmaNodeUrl,
  indent,
  setAttributes,
  setStyles,
  sourceAttributes,
  sourceStyle,
  staticStoryParameters,
  textSlot,
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
  autofocus: state.autofocus,
  download: state.download,
  form: state.form,
  formaction: state.formaction,
  formenctype: state.formenctype,
  formmethod: state.formmethod,
  formnovalidate: state.formnovalidate,
  formtarget: state.formtarget,
  name: state.name,
  type: state.type,
  value: state.value,
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

const sourceForm = (state) => `
<form>
  <input-text type="email" name="email" value="isabel@example.com" required>
    <span slot="label">Email</span>
  </input-text>
${indent(sourceButton(state))}
</form>
`;

const button = (state = {}) => ({
  label: "Button",
  ...state,
});

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
  ...staticStoryParameters,
  ...(design && { design: { type: "figma", url: figmaNodeUrl(design) } }),
  docs: docsSource(sourceGroup(items)),
});

const formParameters = (args) => ({
  docs: docsSource(sourceForm(args)),
});

const renderForm = (state) => {
  const form = document.createElement("form");
  const input = document.createElement("input-text");
  const output = document.createElement("output");

  form.style.display = "grid";
  form.style.width = "min(100%, 360px)";
  form.style.gap = "var(--ds-primitive-space-04)";
  setAttributes(input, {
    name: "email",
    required: true,
    type: "email",
    value: "isabel@example.com",
  });
  input.append(textSlot("label", "Email"));
  output.setAttribute("aria-live", "polite");
  form.append(input, renderButton(state), output);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form, event.submitter);
    output.value = `Submitted ${data.get("email")} with ${data.get(state.name)}`;
  });

  return form;
};

const states = {
  default: button(),
  asLink: button({ href: "#settings", variant: "link" }),
  disabled: button({ disabled: true }),
  focused: button(),
  iconOnly: {
    ariaLabel: "Search",
    mediaIcon: "search",
  },
  form: button({ label: "Save", name: "intent", type: "submit", value: "save" }),
  withIcons: button({ mediaIcon: "search", endIcon: "arrowUpRight" }),
};

const variantItems = [
  button(),
  button({ variant: "secondary" }),
  button({ variant: "outline" }),
  button({ variant: "ghost" }),
  button({ href: "#link", variant: "link" }),
  button({ href: "#link-muted", variant: "link-muted" }),
];

const toneItems = [
  button(),
  button({ tone: "destructive" }),
  button({ tone: "destructive", variant: "secondary" }),
  button({ tone: "destructive", variant: "outline" }),
];

const sizeItems = [
  button({ size: "x-small" }),
  button({ size: "small" }),
  button({ size: "medium" }),
  button({ size: "large" }),
];

const meta = {
  title: "Button",
  component: "ds-button",
  tags: ["autodocs"],
  render: renderButton,
  args: states.default,
  argTypes: {
    disabled: { control: "boolean" },
    label: { control: "text" },
    size: {
      control: "select",
      options: ["", "x-small", "small", "medium", "large"],
    },
    tone: { control: "select", options: ["", "destructive"] },
    type: { control: "select", options: ["", "button", "submit", "reset"] },
    variant: {
      control: "select",
      options: ["", "primary", "secondary", "outline", "link", "link-muted", "ghost"],
    },
    ariaLabel: { control: false, table: { disable: true } },
    autofocus: { control: false, table: { category: "Native button attributes" } },
    download: { control: false, table: { category: "Link attributes" } },
    endIcon: { control: false, table: { disable: true } },
    form: { control: false, table: { category: "Native button attributes" } },
    formaction: { control: false, table: { category: "Native button attributes" } },
    formenctype: { control: false, table: { category: "Native button attributes" } },
    formmethod: { control: false, table: { category: "Native button attributes" } },
    formnovalidate: { control: false, table: { category: "Native button attributes" } },
    formtarget: { control: false, table: { category: "Native button attributes" } },
    href: { control: false, table: { category: "Link attributes" } },
    mediaIcon: { control: false, table: { disable: true } },
    name: { control: false, table: { category: "Native button attributes" } },
    rel: { control: false, table: { category: "Link attributes" } },
    target: { control: false, table: { category: "Link attributes" } },
    value: { control: false, table: { category: "Native button attributes" } },
    width: { control: false, table: { disable: true } },
  },
  parameters: buttonParameters(states.default, "40002012:9001"),
};

export default meta;

export const Default = {
  args: states.default,
  parameters: buttonParameters(states.default, "40002012:9001"),
};

export const Variants = {
  args: { items: variantItems },
  render: ({ items }) => renderGroup(items),
  parameters: groupParameters(variantItems, "40002012:8988"),
  argTypes: {
    items: { control: false, table: { disable: true } },
  },
};

export const Tones = {
  args: { items: toneItems },
  render: ({ items }) => renderGroup(items),
  parameters: groupParameters(toneItems, "40020628:2943"),
  argTypes: {
    items: { control: false, table: { disable: true } },
  },
};

export const Sizes = {
  args: { items: sizeItems },
  render: ({ items }) => renderGroup(items),
  parameters: groupParameters(sizeItems, "40002012:8988"),
  argTypes: {
    items: { control: false, table: { disable: true } },
  },
};

export const WithIcons = {
  args: states.withIcons,
  parameters: buttonParameters(states.withIcons, "40002012:9001"),
};

export const AsLink = {
  args: states.asLink,
  parameters: buttonParameters(states.asLink, "40002278:5081"),
};

export const Form = {
  args: states.form,
  render: renderForm,
  parameters: formParameters(states.form),
};

export const IconOnly = {
  args: states.iconOnly,
  parameters: buttonParameters(states.iconOnly, "40002012:9001"),
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
