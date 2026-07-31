import "@maria-ms/components-web/field";
import "@maria-ms/components-web/number-input";
import "@maria-ms/components-web/select";
import "@maria-ms/components-web/text-input";
import "@maria-ms/components-web/textarea";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40022216-56&m=dev";

const createControl = ({
  control = "text-input",
  disabled,
  invalid,
  name,
  placeholder,
  required,
  size,
  type,
  value,
}) => {
  const wrapper = document.createElement(`ds-${control}`);

  wrapper.slot = "control";
  if (control !== "textarea") wrapper.setAttribute("size", size);

  if (control === "textarea") {
    const nativeControl = document.createElement("textarea");

    nativeControl.name = name;
    nativeControl.placeholder = placeholder;
    nativeControl.value = value;
    nativeControl.disabled = disabled;
    nativeControl.required = required;
    invalid
      ? nativeControl.setAttribute("aria-invalid", "true")
      : nativeControl.removeAttribute("aria-invalid");
    wrapper.append(nativeControl);
    return wrapper;
  }

  if (control === "select") {
    const nativeControl = document.createElement("select");
    const button = document.createElement("button");
    const selectedContent = document.createElement("selectedcontent");
    const placeholderOption = new Option("Choose a country", "");

    placeholderOption.disabled = true;
    button.append(selectedContent);
    nativeControl.append(
      button,
      placeholderOption,
      new Option("Romania", "ro"),
      new Option("France", "fr"),
    );
    nativeControl.name = name;
    nativeControl.value = value;
    nativeControl.disabled = disabled;
    nativeControl.required = required;
    invalid
      ? nativeControl.setAttribute("aria-invalid", "true")
      : nativeControl.removeAttribute("aria-invalid");
    wrapper.append(nativeControl);
    return wrapper;
  }

  const nativeControl = document.createElement("input");

  nativeControl.type = control === "number-input" ? "number" : type;
  nativeControl.name = name;
  nativeControl.placeholder = placeholder;
  nativeControl.value = value;
  nativeControl.disabled = disabled;
  nativeControl.required = required;
  invalid
    ? nativeControl.setAttribute("aria-invalid", "true")
    : nativeControl.removeAttribute("aria-invalid");
  wrapper.append(nativeControl);
  return wrapper;
};

const field = ({
  control = "text-input",
  disabled = false,
  invalid = false,
  label = "Email address",
  message = "We’ll only use this for account updates.",
  name = "email",
  placeholder = "name@example.com",
  required = true,
  showMessage = true,
  size = "medium",
  type = "email",
  value = "name@example.com",
} = {}) => {
  const component = document.createElement("ds-field");
  const labelElement = document.createElement("label");

  labelElement.slot = "label";
  labelElement.textContent = label;
  component.append(
    labelElement,
    createControl({
      control,
      disabled,
      invalid,
      name,
      placeholder,
      required,
      size,
      type,
      value,
    }),
  );

  if (showMessage) {
    const messageElement = document.createElement("p");

    messageElement.slot = "message";
    messageElement.textContent = message;
    component.append(messageElement);
  }

  return component;
};

export default {
  title: "Components/Field",
  component: "ds-field",
  args: {
    control: "text-input",
    disabled: false,
    invalid: false,
    label: "Email address",
    message: "We’ll only use this for account updates.",
    name: "email",
    placeholder: "name@example.com",
    required: true,
    showMessage: true,
    size: "medium",
    type: "email",
    value: "name@example.com",
  },
  argTypes: {
    control: {
      control: "select",
      options: ["text-input", "textarea", "select", "number-input"],
      description: "One public text-like child inserted into Field’s Control slot.",
      table: { category: "Composition" },
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Applied to the selected child when it supports Size.",
      table: { category: "Appearance" },
    },
    label: { control: "text", table: { category: "Content" } },
    message: { control: "text", table: { category: "Content" } },
    showMessage: { control: "boolean", table: { category: "Content" } },
    value: { control: "text", table: { category: "Content" } },
    placeholder: { control: "text", table: { category: "Content" } },
    type: {
      control: "select",
      options: ["text", "email", "password", "search", "tel", "url"],
      table: { category: "Native behavior" },
    },
    name: { control: "text", table: { category: "Native behavior" } },
    disabled: { control: "boolean", table: { category: "Native behavior" } },
    required: { control: "boolean", table: { category: "Native behavior" } },
    invalid: {
      control: "boolean",
      description: "Maps to aria-invalid on the nested native control.",
      table: { category: "Validation" },
    },
  },
  parameters: { actions: { disable: true }, design: { type: "figma", url: figmaUrl } },
  render: field,
};

export const Playground = {};
