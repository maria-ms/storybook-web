import "@maria-ms/components-web/button";
import "@maria-ms/components-web/input-otp";
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
  length: state.length,
  name: state.name,
  readonly: state.readonly,
  required: state.required,
  value: state.value,
  "aria-invalid": state.ariaInvalid && "true",
  "aria-label": state.ariaLabel,
});

const renderInput = (state) => {
  const element = document.createElement("ds-input-otp");

  setAttributes(element, inputAttributes(state));
  if (state.label) element.append(textSlot("label", state.label));
  if (state.description) element.append(textSlot("description", state.description));

  return element;
};

const sourceInput = (state) => {
  const children = [
    state.label && `<span slot="label">${escapeHtml(state.label)}</span>`,
    state.description &&
      `<span slot="description">${escapeHtml(state.description)}</span>`,
  ].filter(Boolean);

  return children.length
    ? `<ds-input-otp${sourceAttributes(inputAttributes(state))}>\n${indent(
        children.join("\n"),
      )}\n</ds-input-otp>`
    : `<ds-input-otp${sourceAttributes(inputAttributes(state))}></ds-input-otp>`;
};

const inputParameters = (args, design) => ({
  ...storyParameters(sourceInput(args), design),
});

const renderGroup = ({ items }) =>
  renderStoryGroup(items, renderInput, { direction: "column", wrap: false });

const groupParameters = (items, design) => ({
  ...staticStoryParametersFor(sourceStoryGroup(items, sourceInput), design),
});

const renderForm = (state) => renderSubmitForm(renderInput(state));

const sourceForm = (state) => sourceSubmitForm(sourceInput(state));

const baseInput = {
  label: "Code",
  description: "Enter the verification code",
  length: "6",
  name: "code",
};

const stateItems = [
  { ...baseInput, value: "123" },
  { ...baseInput, disabled: true, value: "123456" },
  { ...baseInput, ariaInvalid: true, value: "123" },
];

const meta = {
  title: "Input OTP",
  component: "ds-input-otp",
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
    length: { control: "number" },
    name: { control: "text" },
    readonly: { control: "boolean" },
    required: { control: "boolean" },
    value: { control: "text" },
  },
  parameters: inputParameters(baseInput, "40002108:11535"),
};

export default meta;

export const Default = {
  args: baseInput,
  parameters: inputParameters(baseInput, "40002108:11535"),
};

export const Filled = {
  args: { ...baseInput, value: "123456" },
  parameters: inputParameters({ ...baseInput, value: "123456" }, "40002108:11535"),
};

export const States = {
  args: { items: stateItems },
  render: renderGroup,
  parameters: groupParameters(stateItems, "40002108:11535"),
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
