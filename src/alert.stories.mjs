import "@maria-ms/components-web";
import {
  docsSource,
  escapeHtml,
  figmaNodeUrl,
  indent,
  setAttributes,
  setStyles,
  sourceAttributes,
  sourceStyle,
  textSlot,
} from "./story-helpers.mjs";

const alertAttributes = (state) => ({
  type: state.type,
  size: state.size,
});

const alertStyles = (state) => ({
  ...(state.width ? { width: state.width } : {}),
});

const renderAction = (state) => {
  if (!state.actionLabel) return null;

  const button = document.createElement("ds-button");

  button.slot = "action";
  button.setAttribute("type", "secondary");
  button.append(state.actionLabel);

  return button;
};

const renderAlert = (state) => {
  const element = document.createElement("ds-alert");
  const action = renderAction(state);

  setAttributes(element, alertAttributes(state));
  setStyles(element, alertStyles(state));
  if (state.title) element.append(textSlot("title", state.title));
  if (state.description) {
    element.append(textSlot("description", state.description));
  }
  if (action) element.append(action);

  return element;
};

const sourceAction = (state) =>
  state.actionLabel
    ? `<ds-button slot="action" type="secondary">${escapeHtml(state.actionLabel)}</ds-button>`
    : "";

const sourceAlert = (state) => {
  const attributes = sourceAttributes({
    ...alertAttributes(state),
    style: sourceStyle(alertStyles(state)),
  });
  const children = [
    state.title && `<span slot="title">${escapeHtml(state.title)}</span>`,
    state.description &&
      `<span slot="description">${escapeHtml(state.description)}</span>`,
    sourceAction(state),
  ].filter(Boolean);

  return children.length
    ? `<ds-alert${attributes}>\n${indent(children.join("\n"))}\n</ds-alert>`
    : `<ds-alert${attributes}></ds-alert>`;
};

const alertParameters = (args, design) => ({
  ...(design && { design: { type: "figma", url: figmaNodeUrl(design) } }),
  docs: docsSource(sourceAlert(args)),
});

const alert = (state = {}) => ({
  actionLabel: "Button",
  description: "This is an alert description.",
  title: "Success",
  type: "success",
  ...state,
});

const states = {
  default: alert(),
  error: alert({ title: "Error", type: "error" }),
  info: alert({ title: "Info", type: "info" }),
  medium: alert({ size: "medium" }),
  noAction: alert({ actionLabel: "" }),
  small: alert({ size: "small" }),
  success: alert(),
  warning: alert({ title: "Warning", type: "warning" }),
};

const variantItems = [
  { ...states.success, label: "Success" },
  { ...states.info, label: "Info" },
  { ...states.warning, label: "Warning" },
  { ...states.error, label: "Error" },
];

const sizeItems = [
  alert({ size: "large" }),
  alert({ size: "medium" }),
  alert({ size: "small" }),
];

const renderGroup = (items) => {
  const container = document.createElement("div");

  container.style.display = "flex";
  container.style.alignItems = "flex-start";
  container.style.flexDirection = "column";
  container.style.gap = "var(--ds-primitive-space-05)";
  container.append(...items.map(renderAlert));

  return container;
};

const sourceGroup = (items) =>
  `<div>\n${indent(items.map(sourceAlert).join("\n"))}\n</div>`;

const groupParameters = (items, design) => ({
  ...(design && { design: { type: "figma", url: figmaNodeUrl(design) } }),
  docs: docsSource(sourceGroup(items)),
});

const meta = {
  title: "Alert",
  component: "ds-alert",
  tags: ["autodocs"],
  render: renderAlert,
  args: states.default,
  argTypes: {
    actionLabel: { control: "text", name: "action slot" },
    description: { control: "text" },
    size: {
      control: "select",
      options: ["", "large", "medium", "small"],
    },
    title: { control: "text" },
    type: {
      control: "select",
      options: ["", "success", "info", "warning", "error"],
    },
    width: { control: false, table: { disable: true } },
  },
  parameters: alertParameters(states.default, "40012630:1307"),
};

export default meta;

export const Default = {
  args: states.default,
  parameters: alertParameters(states.default, "40012630:1307"),
};

export const Info = {
  args: states.info,
  parameters: alertParameters(states.info, "40012630:1336"),
};

export const Warning = {
  args: states.warning,
  parameters: alertParameters(states.warning, "40012630:1365"),
};

export const Error = {
  args: states.error,
  parameters: alertParameters(states.error, "40012630:1394"),
};

export const Medium = {
  args: states.medium,
  parameters: alertParameters(states.medium, "40012630:1317"),
};

export const Small = {
  args: states.small,
  parameters: alertParameters(states.small, "40012630:1327"),
};

export const WithoutAction = {
  args: states.noAction,
  parameters: alertParameters(states.noAction, "40012630:1307"),
};

export const Variants = {
  args: { items: variantItems },
  render: ({ items }) => renderGroup(items),
  parameters: groupParameters(variantItems, "40012630:1306"),
  argTypes: {
    items: { control: false, table: { disable: true } },
  },
};

export const Sizes = {
  args: { items: sizeItems },
  render: ({ items }) => renderGroup(items),
  parameters: groupParameters(sizeItems, "40012630:1306"),
  argTypes: {
    items: { control: false, table: { disable: true } },
  },
};
