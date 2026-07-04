import "@maria-ms/components-web/button";
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
  disabled: state.disabled,
  "label-position": state.labelPosition,
  name: state.name,
  required: state.required,
  size: state.size,
  value: state.value,
  "aria-invalid": state.ariaInvalid && "true",
  "aria-label": state.ariaLabel,
});

const renderOption = (option) => {
  const element = document.createElement("option");

  element.value = option.value;
  element.disabled = Boolean(option.disabled);

  if (option.icon) {
    const label = document.createElement("span");

    label.className = "option-label";
    label.textContent = option.label;
    element.append(icon("", option.icon), label);
  } else {
    element.textContent = option.label;
  }

  return element;
};

const renderOptgroup = (group) => {
  const element = document.createElement("optgroup");
  const legend = document.createElement("legend");

  element.label = group.label;
  legend.textContent = group.label;
  element.append(legend, ...group.options.map(renderOption));

  return element;
};

const optionNodes = (state) =>
  state.groups?.length
    ? state.groups.map(renderOptgroup)
    : state.options.map(renderOption);

const renderInput = (state) => {
  const element = document.createElement("input-select");

  setAttributes(element, inputAttributes(state));
  if (state.label) element.append(textSlot("label", state.label));
  if (state.description) element.append(textSlot("description", state.description));
  if (state.prefixIcon) element.append(icon("prefix", state.prefixIcon));
  element.append(...optionNodes(state));

  return element;
};

const sourceOptionContent = (option) =>
  option.icon
    ? `<svg aria-hidden="true"><!-- ${option.icon} icon --></svg>
<span class="option-label">${escapeHtml(option.label)}</span>`
    : escapeHtml(option.label);

const sourceOption = (option) => {
  const content = sourceOptionContent(option);
  const attributes = sourceAttributes({
    disabled: option.disabled,
    value: option.value,
  });

  return option.icon
    ? `<option${attributes}>\n${indent(content)}\n</option>`
    : `<option${attributes}>${content}</option>`;
};

const sourceOptgroup = (group) => `<optgroup label="${escapeHtml(group.label)}">
${indent(`<legend>${escapeHtml(group.label)}</legend>`)}
${indent(group.options.map(sourceOption).join("\n"))}
</optgroup>`;

const sourceOptions = (state) =>
  state.groups?.length
    ? state.groups.map(sourceOptgroup)
    : state.options.map(sourceOption);

const sourceInput = (state) => {
  const children = [
    state.label && `<span slot="label">${escapeHtml(state.label)}</span>`,
    state.description &&
      `<span slot="description">${escapeHtml(state.description)}</span>`,
    state.prefixIcon &&
      `<svg slot="prefix" aria-hidden="true"><!-- ${state.prefixIcon} icon --></svg>`,
    ...sourceOptions(state),
  ].filter(Boolean);

  return `<input-select${sourceAttributes(inputAttributes(state))}>\n${indent(
    children.join("\n"),
  )}\n</input-select>`;
};

const inputParameters = (args, design) => ({
  ...(design && { design: { type: "figma", url: figmaNodeUrl(design) } }),
  docs: docsSource(sourceInput(args)),
});

const renderGroup = ({ items }) => {
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

const options = [
  { label: "Romania", value: "ro" },
  { label: "United Kingdom", value: "gb" },
  { label: "United States", value: "us" },
];

const richOptions = [
  { icon: "building", label: "Operations", value: "operations" },
  { icon: "users", label: "People", value: "people" },
  { disabled: true, icon: "settings", label: "Settings", value: "settings" },
];

const groupedOptions = [
  {
    label: "Europe",
    options: [
      { label: "Romania", value: "ro" },
      { label: "United Kingdom", value: "gb" },
    ],
  },
  {
    label: "North America",
    options: [
      { label: "United States", value: "us" },
      { label: "Canada", value: "ca" },
    ],
  },
];

const baseInput = {
  label: "Country",
  description: "Select a country",
  name: "country",
  groups: [],
  options,
  value: "ro",
};

const richInput = {
  ...baseInput,
  description: "Options can contain non-interactive markup.",
  name: "team",
  options: richOptions,
  value: "operations",
};

const groupedInput = {
  ...baseInput,
  groups: groupedOptions,
  options: [],
  value: "gb",
};

const optionValues = (items) => items.map((option) => option.value);
const groupValues = (groups) =>
  groups.flatMap((group) => optionValues(group.options));
const valueArgType = (values) => ({
  value: { control: "select", options: values },
});

const stateItems = [
  { ...baseInput },
  { ...baseInput, disabled: true },
  { ...baseInput, ariaInvalid: true },
];

const meta = {
  title: "Input Select",
  component: "input-select",
  tags: ["autodocs"],
  render: renderInput,
  args: baseInput,
  argTypes: {
    ariaInvalid: { control: "boolean", name: "aria-invalid" },
    ariaLabel: { control: "text", name: "aria-label" },
    description: { control: "text" },
    disabled: { control: "boolean" },
    label: { control: "text" },
    labelPosition: {
      control: "select",
      name: "label-position",
      options: ["", "start"],
    },
    name: { control: "text" },
    required: { control: "boolean" },
    size: { control: "select", options: ["", "small"] },
    ...valueArgType(optionValues(options)),
    groups: { control: false, table: { disable: true } },
    options: { control: false, table: { disable: true } },
    prefixIcon: { control: false, table: { disable: true } },
  },
  parameters: inputParameters(baseInput, "40020640:9290"),
};

export default meta;

export const Default = {
  args: baseInput,
  parameters: inputParameters(baseInput, "40020640:9290"),
};

export const WithPrefix = {
  args: { ...baseInput, prefixIcon: "building" },
  parameters: inputParameters(
    { ...baseInput, prefixIcon: "building" },
    "40020646:2326",
  ),
};

export const RichOptions = {
  args: richInput,
  argTypes: valueArgType(optionValues(richOptions)),
  parameters: inputParameters(richInput),
};

export const GroupedOptions = {
  args: groupedInput,
  argTypes: valueArgType(groupValues(groupedOptions)),
  parameters: inputParameters(groupedInput),
};

export const States = {
  args: { items: stateItems },
  render: renderGroup,
  parameters: groupParameters(stateItems, "40020640:9290"),
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
