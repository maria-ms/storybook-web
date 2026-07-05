import "@maria-ms/components-web/button";
import "@maria-ms/components-web/input-text";
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
  inputmode: state.inputmode,
  "label-position": state.labelPosition,
  maxlength: state.maxlength,
  minlength: state.minlength,
  name: state.name,
  pattern: state.pattern,
  placeholder: state.placeholder,
  readonly: state.readonly,
  required: state.required,
  size: state.size,
  type: state.type,
  value: state.value,
  "aria-invalid": state.ariaInvalid && "true",
  "aria-label": state.ariaLabel,
});

const renderInput = (state) => {
  const element = document.createElement("ds-input-text");

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
    ? `<ds-input-text${sourceAttributes(inputAttributes(state))}>\n${indent(
        children.join("\n"),
      )}\n</ds-input-text>`
    : `<ds-input-text${sourceAttributes(inputAttributes(state))}></ds-input-text>`;
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
  label: "Label",
  description: "This is an input description",
  name: "text",
  placeholder: "Placeholder",
};

const stateItems = [
  { ...baseInput, value: "Value" },
  { ...baseInput, disabled: true, value: "Value" },
  { ...baseInput, ariaInvalid: true, value: "Value" },
];

const meta = {
  title: "Input Text",
  component: "ds-input-text",
  tags: ["autodocs"],
  render: renderInput,
  args: baseInput,
  argTypes: {
    ariaInvalid: { control: "boolean", name: "aria-invalid" },
    ariaLabel: { control: "text", name: "aria-label" },
    autocomplete: { control: "text" },
    description: { control: "text" },
    disabled: { control: "boolean" },
    inputmode: { control: "text" },
    label: { control: "text" },
    labelPosition: {
      control: "select",
      name: "label-position",
      options: ["", "start"],
    },
    maxlength: { control: "text" },
    minlength: { control: "text" },
    name: { control: "text" },
    pattern: { control: "text" },
    placeholder: { control: "text" },
    readonly: { control: "boolean" },
    required: { control: "boolean" },
    size: { control: "select", options: ["", "small"] },
    type: { control: "select", options: ["", "text", "email", "password", "tel", "url"] },
    value: { control: "text" },
    prefixIcon: { control: false, table: { disable: true } },
    suffixIcon: { control: false, table: { disable: true } },
  },
  parameters: inputParameters(baseInput, "40002105:7781"),
};

export default meta;

export const Default = {
  args: baseInput,
  parameters: inputParameters(baseInput, "40002105:7781"),
};

export const WithIcons = {
  args: {
    ...baseInput,
    prefixIcon: "user",
    suffixIcon: "settings",
    value: "Isabel Navarro",
  },
  parameters: inputParameters(
    {
      ...baseInput,
      prefixIcon: "user",
      suffixIcon: "settings",
      value: "Isabel Navarro",
    },
    "40002105:7781",
  ),
};

export const States = {
  args: { items: stateItems },
  render: renderGroup,
  parameters: groupParameters(stateItems, "40002105:7781"),
  argTypes: {
    items: { control: false, table: { disable: true } },
  },
};

export const Form = {
  args: { ...baseInput, name: "email", type: "email", required: true },
  render: renderForm,
  parameters: {
    ...storyParameters(
      sourceForm({ ...baseInput, name: "email", type: "email", required: true }),
    ),
  },
};
