import "@maria-ms/components-web/alert";
import "@maria-ms/components-web/button";
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

  const button = document.createElement("ds-button");

  button.slot = "action";
  button.setAttribute("variant", "secondary");
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
    ? `<ds-button slot="action" variant="secondary">${escapeHtml(state.actionLabel)}</ds-button>`
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
  urgent: alert({
    live: "assertive",
    tone: "error",
    title: "Session expired",
    description: "Sign in again to continue.",
  }),
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
  title: "Alert",
  component: "ds-alert",
  tags: ["autodocs"],
  render: renderAlert,
  args: states.default,
  argTypes: {
    live: {
      control: "select",
      options: ["", "polite", "assertive"],
    },
    size: {
      control: "select",
      options: ["", "large", "medium", "small"],
    },
    tone: {
      control: "select",
      options: ["", "success", "info", "warning", "error"],
    },
    actionLabel: { control: false, table: { disable: true } },
    description: { control: false, table: { disable: true } },
    title: { control: false, table: { disable: true } },
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

export const WithAction = {
  args: states.withAction,
  parameters: alertParameters(states.withAction, "40012630:1307"),
};

export const UrgentLiveRegion = {
  args: states.urgent,
  parameters: alertParameters(states.urgent, "40012630:1307"),
};
