import "@maria-ms/components-web/alert";
import { fn } from "storybook/test";
import {
  escapeHtml,
  indent,
  renderStoryGroup,
  setAttributes,
  setStyles,
  sourceAttributes,
  sourceStoryGroup,
  sourceStyle,
  staticStoryParametersFor,
  storyParameters,
  textSlot,
} from "./story-helpers.mjs";

const alertAttributes = (state) => ({
  live: state.live,
  tone: state.tone,
  size: state.size,
});

const alertWidth = (size) =>
  `min(100%, ${size === "small" ? "343px" : size === "medium" ? "560px" : "976px"})`;

const alertStyles = (state) => ({
  width: alertWidth(state.size),
});

const renderAction = (state) => {
  if (!state.actionLabel) return null;

  const button = document.createElement("button");

  button.slot = "action";
  button.type = "button";
  if (state.onActionClick) button.addEventListener("click", state.onActionClick);
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
    ? `<button slot="action" type="button">${escapeHtml(state.actionLabel)}</button>`
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
  ...storyParameters(sourceAlert(args), design),
});

const alert = (state = {}) => ({
  description: "This is an alert description.",
  tone: "success",
  title: "Success",
  ...state,
});

const renderGroup = (items) =>
  renderStoryGroup(items, renderAlert, {
    direction: "column",
    gap: "var(--ds-primitive-space-05)",
    wrap: false,
  });

const groupParameters = (items, design) => ({
  ...staticStoryParametersFor(sourceStoryGroup(items, sourceAlert), design),
});

const states = {
  default: alert(),
  withAction: alert({ actionLabel: "Button" }),
};

const toneItems = [
  alert(),
  alert({ title: "Info", tone: "info" }),
  alert({ title: "Warning", tone: "warning" }),
  alert({ title: "Error", tone: "error" }),
];

const sizeItems = [
  alert({ size: "large" }),
  alert({ size: "medium" }),
  alert({ size: "small" }),
];

const meta = {
  title: "Components/Alert",
  component: "ds-alert",
  render: renderAlert,
  args: {
    ...states.default,
    onActionClick: fn(),
  },
  argTypes: {
    title: { control: "text", table: { category: "Content" } },
    description: { control: "text", table: { category: "Content" } },
    actionLabel: { control: "text", table: { category: "Content" } },
    tone: {
      control: "select",
      options: ["success", "info", "warning", "error"],
      table: { category: "Appearance" },
    },
    size: {
      control: "select",
      options: ["large", "medium", "small"],
      table: { category: "Appearance" },
    },
    live: {
      control: "select",
      options: ["", "polite", "assertive"],
      table: { category: "Accessibility" },
    },
    onActionClick: { control: false, table: { category: "Events" } },
  },
  parameters: alertParameters(states.default, "40012630:1307"),
};

export default meta;

export const Default = {
  args: states.default,
  parameters: alertParameters(states.default, "40012630:1307"),
};

export const Tones = {
  args: { items: toneItems },
  render: ({ items }) => renderGroup(items),
  parameters: groupParameters(toneItems, "40012630:1306"),
};

export const Sizes = {
  args: { items: sizeItems },
  render: ({ items }) => renderGroup(items),
  parameters: groupParameters(sizeItems, "40012630:1306"),
};

export const WithAction = {
  args: states.withAction,
  parameters: alertParameters(states.withAction, "40012630:1307"),
};
