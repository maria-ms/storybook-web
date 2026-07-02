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
  if (state.suffix?.kind === "icon") {
    element.append(icon("suffix", state.suffix.name));
  }

  return element;
};

const sourceInput = (state) => {
  const attributes = sourceAttributes(inputAttributes(state));
  const children = [
    state.label && `<span slot="label">${escapeHtml(state.label)}</span>`,
    state.description &&
      `<span slot="description">${escapeHtml(state.description)}</span>`,
    state.suffix?.kind === "icon" &&
      `<svg slot="suffix" aria-hidden="true"><!-- ${state.suffix.name} icon --></svg>`,
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
  form.append(renderInput(state.input), button, output);

  return form;
};

const sourceForm = (state) => `
<form>
${indent(sourceInput(state.input))}
  <button type="submit">Submit</button>
  <output></output>
</form>
`;

const story = ({ design, play, state, wrap }) => ({
  render: () => (wrap === "form" ? renderForm(state) : renderInput(state)),
  parameters: {
    ...(design && { design: { type: "figma", url: figmaNodeUrl(design) } }),
    docs: docsSource(wrap === "form" ? sourceForm(state) : sourceInput(state)),
  },
  play,
});

const baseInput = {
  label: "Label",
  description: "This is an input description",
  name: "number",
  placeholder: "0",
  step: "1",
};

const states = {
  default: baseInput,
  disabled: { ...baseInput, disabled: true, value: "1" },
  filled: { ...baseInput, value: "1" },
  focused: { ...baseInput, value: "1" },
  form: {
    input: {
      ...baseInput,
      name: "amount",
      required: true,
      value: "1",
    },
  },
  invalid: { ...baseInput, ariaInvalid: true, value: "1" },
  labelStart: { ...baseInput, labelPosition: "start" },
  small: { ...baseInput, size: "small" },
  suffix: {
    ...baseInput,
    controls: "none",
    suffix: { kind: "icon", name: "visa" },
  },
  suffixFilled: {
    ...baseInput,
    controls: "none",
    suffix: { kind: "icon", name: "visa" },
    value: "1000",
  },
};

const meta = {
  title: "Input Number",
  component: "input-number",
  tags: ["autodocs"],
  ...story({ design: "40012630:35259", state: states.default }),
};

export default meta;

export const Default = story({
  design: "40012630:35504",
  state: states.default,
});

export const Filled = story({
  design: "40020640:1898",
  state: states.filled,
});

export const Small = story({
  design: "40012630:35260",
  state: states.small,
});

export const LabelStart = story({
  design: "40020640:2096",
  state: states.labelStart,
});

export const Suffix = story({
  design: "40020640:2196",
  state: states.suffix,
});

export const SuffixFilled = story({
  design: "40020640:2249",
  state: states.suffixFilled,
});

export const Disabled = story({
  design: "40020640:1922",
  state: states.disabled,
});

export const Invalid = story({
  design: "40020640:1946",
  state: states.invalid,
});

export const Focused = story({
  design: "40020640:1986",
  state: states.focused,
  play: async ({ canvasElement }) => {
    canvasElement
      .querySelector("input-number")
      ?.shadowRoot?.querySelector("input")
      ?.focus();
  },
});

export const Form = story({
  design: "40012630:35504",
  state: states.form,
  wrap: "form",
});
