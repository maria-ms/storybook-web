import "@maria-ms/components-web/button";
import "@maria-ms/components-web/input-otp";
import {
  docsSource,
  escapeHtml,
  figmaNodeUrl,
  indent,
  setAttributes,
  sourceAttributes,
  staticStoryParameters,
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
  const element = document.createElement("input-otp");

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
    ? `<input-otp${sourceAttributes(inputAttributes(state))}>\n${indent(
        children.join("\n"),
      )}\n</input-otp>`
    : `<input-otp${sourceAttributes(inputAttributes(state))}></input-otp>`;
};

const inputParameters = (args, design) => ({
  ...(design && { design: { type: "figma", url: figmaNodeUrl(design) } }),
  docs: docsSource(sourceInput(args)),
});

const renderGroup = ({ items }) => {
  const container = document.createElement("div");

  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.alignItems = "flex-start";
  container.style.gap = "var(--ds-primitive-space-06)";
  container.append(...items.map(renderInput));

  return container;
};

const groupParameters = (items, design) => ({
  ...staticStoryParameters,
  ...(design && { design: { type: "figma", url: figmaNodeUrl(design) } }),
  docs: docsSource(`<div>\n${indent(items.map(sourceInput).join("\n"))}\n</div>`),
});

const renderForm = (state) => {
  const form = document.createElement("form");
  const button = document.createElement("ds-button");
  const output = document.createElement("output");

  button.type = "submit";
  button.textContent = "Submit";
  output.setAttribute("aria-live", "polite");
  form.style.display = "grid";
  form.style.gap = "var(--ds-primitive-space-04)";
  form.append(renderInput(state), button, output);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    output.value = new URLSearchParams(new FormData(form)).toString();
  });

  return form;
};

const sourceForm = (state) => `
<form>
${indent(sourceInput(state))}
  <ds-button type="submit">Submit</ds-button>
  <output></output>
</form>
`;

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
  component: "input-otp",
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
    docs: docsSource(sourceForm({ ...baseInput, required: true })),
  },
};
