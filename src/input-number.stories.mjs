import "@maria-ms/components-web/input-number";
import { icon } from "./icons.mjs";
import {
  docsSource,
  escapeHtml,
  figmaNodeUrl,
  indent,
  setAttributes,
  sourceAttributes,
  textSlot,
} from "./story-helpers.mjs";

const inputAttributes = (state) => ({
  name: state.name,
  placeholder: state.placeholder,
  value: state.value,
  min: state.min,
  max: state.max,
  step: state.step,
  "label-position": state.labelPosition,
  size: state.size,
  controls: state.controls,
  "aria-label": state.ariaLabel,
  "aria-invalid": state.ariaInvalid && "true",
  disabled: state.disabled,
  readonly: state.readonly,
  required: state.required,
});

const renderInput = (state) => {
  const element = document.createElement("input-number");

  setAttributes(element, inputAttributes(state));
  if (state.label) element.append(textSlot("label", state.label));
  if (state.description) {
    element.append(textSlot("description", state.description));
  }
  if (state.suffixIcon) {
    element.append(icon("suffix", state.suffixIcon));
  }

  return element;
};

const sourceInput = (state) => {
  const attributes = sourceAttributes(inputAttributes(state));
  const children = [
    state.label && `<span slot="label">${escapeHtml(state.label)}</span>`,
    state.description &&
      `<span slot="description">${escapeHtml(state.description)}</span>`,
    state.suffixIcon &&
      `<svg slot="suffix" aria-hidden="true"><!-- ${state.suffixIcon} icon --></svg>`,
  ].filter(Boolean);

  return children.length
    ? `<input-number${attributes}>\n${indent(children.join("\n"))}\n</input-number>`
    : `<input-number${attributes}></input-number>`;
};

const renderForm = (state) => {
  const form = document.createElement("form");
  const button = document.createElement("button");
  const output = document.createElement("output");

  button.type = "submit";
  button.textContent = "Submit";
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    output.value = new URLSearchParams(new FormData(form)).toString();
  });
  form.append(renderInput(state), button, output);

  return form;
};

const sourceForm = (state) => `
<form>
${indent(sourceInput(state))}
  <button type="submit">Submit</button>
  <output></output>
</form>
`;

const inputParameters = (args, design) => ({
  ...(design && { design: { type: "figma", url: figmaNodeUrl(design) } }),
  docs: docsSource(sourceInput(args)),
});

const formParameters = (args, design) => ({
  ...(design && { design: { type: "figma", url: figmaNodeUrl(design) } }),
  docs: docsSource(sourceForm(args)),
});

const baseInput = {
  label: "Label",
  description: "This is an input description",
  name: "number",
  placeholder: "0",
  step: "1",
};

const states = {
  default: { ...baseInput },
  disabled: { ...baseInput, disabled: true, value: "1" },
  filled: { ...baseInput, value: "1" },
  focused: { ...baseInput, value: "1" },
  form: { ...baseInput, name: "amount", required: true, value: "1" },
  invalid: { ...baseInput, ariaInvalid: true, value: "1" },
  labelStart: { ...baseInput, labelPosition: "start" },
  small: { ...baseInput, size: "small" },
  suffix: {
    ...baseInput,
    controls: "none",
    suffixIcon: "visa",
  },
  suffixFilled: {
    ...baseInput,
    controls: "none",
    suffixIcon: "visa",
    value: "1000",
  },
};

const meta = {
  title: "Input Number",
  component: "input-number",
  tags: ["autodocs"],
  render: renderInput,
  args: states.default,
  argTypes: {
    ariaInvalid: { control: "boolean", name: "aria-invalid" },
    ariaLabel: { control: "text", name: "aria-label" },
    controls: { control: "select", options: ["", "none"] },
    disabled: { control: "boolean" },
    labelPosition: {
      control: "select",
      name: "label-position",
      options: ["", "start"],
    },
    max: { control: "text" },
    min: { control: "text" },
    name: { control: "text" },
    placeholder: { control: "text" },
    readonly: { control: "boolean" },
    required: { control: "boolean" },
    size: { control: "select", options: ["", "small"] },
    step: { control: "text" },
    value: { control: "text" },
    description: { control: false, table: { disable: true } },
    label: { control: false, table: { disable: true } },
    suffixIcon: { control: false, table: { disable: true } },
  },
  parameters: inputParameters(states.default, "40012630:35259"),
};

export default meta;

export const Default = {
  args: states.default,
  parameters: inputParameters(states.default, "40012630:35504"),
};

export const Filled = {
  args: states.filled,
  parameters: inputParameters(states.filled, "40020640:1898"),
};

export const Small = {
  args: states.small,
  parameters: inputParameters(states.small, "40012630:35260"),
};

export const LabelStart = {
  args: states.labelStart,
  parameters: inputParameters(states.labelStart, "40020640:2096"),
};

export const Suffix = {
  args: states.suffix,
  parameters: inputParameters(states.suffix, "40020640:2196"),
};

export const SuffixFilled = {
  args: states.suffixFilled,
  parameters: inputParameters(states.suffixFilled, "40020640:2249"),
};

export const Disabled = {
  args: states.disabled,
  parameters: inputParameters(states.disabled, "40020640:1922"),
};

export const Invalid = {
  args: states.invalid,
  parameters: inputParameters(states.invalid, "40020640:1946"),
};

export const Focused = {
  args: states.focused,
  parameters: inputParameters(states.focused, "40020640:1986"),
  play: async ({ canvasElement }) => {
    canvasElement
      .querySelector("input-number")
      ?.shadowRoot?.querySelector("input")
      ?.focus();
  },
};

export const Form = {
  args: states.form,
  render: renderForm,
  parameters: formParameters(states.form, "40012630:35504"),
};
