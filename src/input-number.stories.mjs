import "@maria-ms/components-web/button";
import "@maria-ms/components-web/field";
import "@maria-ms/components-web/input-number";
import "@maria-ms/components-web/input-select";
import { icon } from "./icons.mjs";
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
  const element = document.createElement("ds-input-number");

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
    ? `<ds-input-number${attributes}>\n${indent(children.join("\n"))}\n</ds-input-number>`
    : `<ds-input-number${attributes}></ds-input-number>`;
};

const renderForm = (state) => {
  const form = document.createElement("form");
  const button = document.createElement("ds-button");
  const output = document.createElement("output");

  form.style.display = "grid";
  form.style.width = "min(100%, 276px)";
  form.style.gap = "var(--ds-primitive-space-04)";
  button.type = "submit";
  button.textContent = "Submit";
  output.setAttribute("aria-live", "polite");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    output.value = new URLSearchParams(new FormData(form)).toString();
  });
  form.append(renderInput(state), button, output);

  return form;
};

const sourceForm = (state) => `
<form style="display: grid; gap: var(--ds-primitive-space-04); width: min(100%, 276px);">
${indent(sourceInput(state))}
  <ds-button type="submit">Submit</ds-button>
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

const renderGroup = (items) => {
  const container = document.createElement("div");

  container.style.display = "flex";
  container.style.alignItems = "flex-start";
  container.style.flexWrap = "wrap";
  container.style.gap = "var(--ds-primitive-space-06)";
  container.append(...items.map(renderInput));

  return container;
};

const groupParameters = (items, design) => ({
  ...staticStoryParameters,
  ...(design && { design: { type: "figma", url: figmaNodeUrl(design) } }),
  docs: docsSource(`<div>\n${indent(items.map(sourceInput).join("\n"))}\n</div>`),
});

const currencyOptions = [
  { label: "EUR", value: "eur" },
  { label: "USD", value: "usd" },
  { label: "GBP", value: "gbp" },
];

const renderOption = ({ label, value }) => {
  const option = document.createElement("option");

  option.value = value;
  option.textContent = label;

  return option;
};

const renderCurrencyInput = (state) => {
  const group = document.createElement("ds-field-group");
  const select = document.createElement("ds-input-select");
  const number = document.createElement("ds-input-number");

  group.append(
    textSlot("label", state.label),
    select,
    number,
    textSlot("description", state.description),
  );
  setAttributes(select, {
    "aria-label": "Currency",
    name: state.currencyName,
    value: state.currency,
  });
  select.append(...currencyOptions.map(renderOption));
  setAttributes(number, {
    "aria-label": "Amount",
    controls: "none",
    min: "0",
    name: state.amountName,
    step: "0.01",
    value: state.amount,
  });

  return group;
};

const sourceCurrencyInput = (state) => `
<ds-field-group>
  <span slot="label">${escapeHtml(state.label)}</span>
  <ds-input-select name="${escapeHtml(state.currencyName)}" value="${escapeHtml(
    state.currency,
  )}" aria-label="Currency">
${indent(
  currencyOptions
    .map(
      (option) =>
        `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`,
    )
    .join("\n"),
)}
  </ds-input-select>
  <ds-input-number
    name="${escapeHtml(state.amountName)}"
    value="${escapeHtml(state.amount)}"
    min="0"
    step="0.01"
    controls="none"
    aria-label="Amount"
  ></ds-input-number>
  <span slot="description">${escapeHtml(state.description)}</span>
</ds-field-group>
`;

const currencyParameters = (args, design) => ({
  ...staticStoryParameters,
  ...(design && { design: { type: "figma", url: figmaNodeUrl(design) } }),
  docs: docsSource(sourceCurrencyInput(args)),
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
  focused: { ...baseInput, value: "1" },
  form: { ...baseInput, name: "amount", required: true, value: "1" },
  horizontalLabel: { ...baseInput, labelPosition: "start" },
  small: { ...baseInput, description: "", size: "small" },
  suffix: {
    ...baseInput,
    controls: "none",
    suffixIcon: "visa",
    value: "1000",
  },
  currency: {
    amount: "1250",
    amountName: "amount",
    currency: "eur",
    currencyName: "currency",
    description: "Enter the amount before tax.",
    label: "Amount",
  },
};

const stateItems = [
  { ...baseInput, value: "1" },
  { ...baseInput, disabled: true, value: "1" },
  { ...baseInput, ariaInvalid: true, value: "1" },
];

const meta = {
  title: "Input Number",
  component: "ds-input-number",
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

export const States = {
  args: { items: stateItems },
  render: ({ items }) => renderGroup(items),
  parameters: groupParameters(stateItems, "40020640:1898"),
  argTypes: {
    items: { control: false, table: { disable: true } },
  },
};

export const Small = {
  args: states.small,
  parameters: inputParameters(states.small, "40020640:2096"),
};

export const HorizontalLabel = {
  args: states.horizontalLabel,
  parameters: inputParameters(states.horizontalLabel, "40020640:2096"),
};

export const WithSuffix = {
  args: states.suffix,
  parameters: inputParameters(states.suffix, "40020640:2249"),
};

export const Currency = {
  args: states.currency,
  render: renderCurrencyInput,
  parameters: currencyParameters(states.currency, "40020967:14091"),
};

export const Focused = {
  args: states.focused,
  parameters: inputParameters(states.focused, "40020640:1986"),
  play: async ({ canvasElement }) => {
    canvasElement
      .querySelector("ds-input-number")
      ?.shadowRoot?.querySelector("input")
      ?.focus();
  },
};

export const Form = {
  args: states.form,
  render: renderForm,
  parameters: formParameters(states.form, "40012630:35504"),
};
