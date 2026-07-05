import "@maria-ms/components-web/button";
import "@maria-ms/components-web/input-search";
import { icon } from "./icons.mjs";
import {
  escapeHtml,
  indent,
  renderStoryGroup,
  renderSubmitForm,
  setAttributes,
  sourceAttributes,
  sourceStoryGroup,
  sourceSubmitForm,
  staticStoryParametersFor,
  storyParameters,
  textSlot,
} from "./story-helpers.mjs";

const inputAttributes = (state) => ({
  autocomplete: state.autocomplete,
  disabled: state.disabled,
  name: state.name,
  placeholder: state.placeholder,
  readonly: state.readonly,
  required: state.required,
  size: state.size,
  value: state.value,
  "aria-invalid": state.ariaInvalid && "true",
  "aria-label": state.ariaLabel,
});

const renderInput = (state) => {
  const element = document.createElement("ds-input-search");

  setAttributes(element, inputAttributes(state));
  if (state.label) element.append(textSlot("label", state.label));
  if (state.description) element.append(textSlot("description", state.description));
  if (state.prefixIcon) element.append(icon("prefix", state.prefixIcon));
  if (state.suffixIcon) element.append(icon("suffix", state.suffixIcon));

  return element;
};

const sourceInput = (state) => {
  const children = [
    state.label && `<span slot="label">${escapeHtml(state.label)}</span>`,
    state.description &&
      `<span slot="description">${escapeHtml(state.description)}</span>`,
    state.prefixIcon &&
      `<svg slot="prefix" aria-hidden="true"><!-- ${state.prefixIcon} icon --></svg>`,
    state.suffixIcon &&
      `<svg slot="suffix" aria-hidden="true"><!-- ${state.suffixIcon} icon --></svg>`,
  ].filter(Boolean);

  return children.length
    ? `<ds-input-search${sourceAttributes(inputAttributes(state))}>\n${indent(
        children.join("\n"),
      )}\n</ds-input-search>`
    : `<ds-input-search${sourceAttributes(inputAttributes(state))}></ds-input-search>`;
};

const inputParameters = (args, design) => ({
  ...storyParameters(sourceInput(args), design),
});

const renderGroup = ({ items }) => renderStoryGroup(items, renderInput);

const groupParameters = (items, design) => ({
  ...staticStoryParametersFor(sourceStoryGroup(items, sourceInput), design),
});

const renderForm = (state) => renderSubmitForm(renderInput(state));

const sourceForm = (state) => sourceSubmitForm(sourceInput(state));

const baseInput = {
  ariaLabel: "Search",
  name: "search",
  placeholder: "Search",
};

const stateItems = [
  { ...baseInput },
  { ...baseInput, value: "Settings" },
  { ...baseInput, disabled: true, value: "Settings" },
];

const meta = {
  title: "Input Search",
  component: "ds-input-search",
  tags: ["autodocs"],
  render: renderInput,
  args: baseInput,
  argTypes: {
    ariaInvalid: { control: "boolean", name: "aria-invalid" },
    ariaLabel: { control: "text", name: "aria-label" },
    autocomplete: { control: "text" },
    disabled: { control: "boolean" },
    name: { control: "text" },
    placeholder: { control: "text" },
    readonly: { control: "boolean" },
    required: { control: "boolean" },
    size: { control: "select", options: ["", "small"] },
    value: { control: "text" },
    description: { control: false, table: { disable: true } },
    label: { control: false, table: { disable: true } },
    prefixIcon: { control: false, table: { disable: true } },
    suffixIcon: { control: false, table: { disable: true } },
  },
  parameters: inputParameters(baseInput, "40008734:168"),
};

export default meta;

export const Default = {
  args: baseInput,
  parameters: inputParameters(baseInput, "40008734:168"),
};

export const WithSuffix = {
  args: { ...baseInput, suffixIcon: "settings", value: "Settings" },
  parameters: inputParameters(
    { ...baseInput, suffixIcon: "settings", value: "Settings" },
    "40008734:168",
  ),
};

export const States = {
  args: { items: stateItems },
  render: renderGroup,
  parameters: groupParameters(stateItems, "40008734:168"),
  argTypes: {
    items: { control: false, table: { disable: true } },
  },
};

export const Form = {
  args: { ...baseInput, required: true },
  render: renderForm,
  parameters: {
    ...storyParameters(sourceForm({ ...baseInput, required: true })),
  },
};
