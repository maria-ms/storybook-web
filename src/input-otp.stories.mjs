import "@maria-ms/components-web/button";
import "@maria-ms/components-web/field";
import "@maria-ms/components-web/input-otp";
import {
  renderField,
  renderStoryGroup,
  renderSubmitForm,
  setAttributes,
  sourceAttributes,
  sourceField,
  sourceStoryGroup,
  sourceSubmitForm,
  staticStoryParametersFor,
  storyParameters,
} from "./story-helpers.mjs";

const inputAttributes = (state) => ({
  autocomplete: state.autocomplete,
  disabled: state.disabled,
  inputmode: state.inputmode,
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

  return element;
};

const sourceInput = (state) =>
  `<ds-input-otp${sourceAttributes(inputAttributes(state))}></ds-input-otp>`;

const fieldOptions = (state) => ({
  description: state.description,
  error: state.error,
  invalid: state.ariaInvalid,
  label: state.label,
});

const renderFieldInput = (state) =>
  renderField(renderInput(state), fieldOptions(state));

const sourceFieldInput = (state) =>
  sourceField(sourceInput(state), fieldOptions(state));

const inputParameters = (args, design) => ({
  ...storyParameters(sourceFieldInput(args), design),
});

const renderGroup = ({ items }) =>
  renderStoryGroup(items, renderFieldInput, { direction: "column", wrap: false });

const groupParameters = (items, design) => ({
  ...staticStoryParametersFor(sourceStoryGroup(items, sourceFieldInput), design),
});

const renderForm = (state) => renderSubmitForm(renderFieldInput(state));

const sourceForm = (state) => sourceSubmitForm(sourceFieldInput(state));

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
  render: renderFieldInput,
  args: baseInput,
  argTypes: {
    ariaInvalid: { control: "boolean", name: "aria-invalid" },
    ariaLabel: { control: "text", name: "aria-label" },
    autocomplete: { control: "text" },
    description: { control: false, table: { disable: true } },
    disabled: { control: "boolean" },
    inputmode: { control: "text" },
    label: { control: false, table: { disable: true } },
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
