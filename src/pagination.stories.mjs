import "@maria-ms/components-web/pagination";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40025057-3&m=dev";

const direction = ({ direction: value, disabled = false, href, label }) => {
  const item = document.createElement("li");
  const control = document.createElement(disabled ? "button" : "a");

  control.dataset.paginationDirection = value;
  control.textContent = label;
  if (disabled) {
    control.disabled = true;
    control.type = "button";
  } else {
    control.href = href;
  }
  item.append(control);

  return item;
};

const page = ({ current = false, href, value }) => {
  const item = document.createElement("li");
  const link = document.createElement("a");

  link.href = href;
  link.setAttribute("aria-label", `Page ${value}`);
  if (current) link.setAttribute("aria-current", "page");
  link.textContent = value;
  item.append(link);

  return item;
};

const ellipsis = () => {
  const item = document.createElement("li");

  item.dataset.paginationEllipsis = "";
  item.setAttribute("aria-hidden", "true");
  item.textContent = "…";

  return item;
};

const pagination = ({ ariaLabel = "Results pages" } = {}) => {
  const component = document.createElement("ds-pagination");
  const nav = document.createElement("nav");
  const list = document.createElement("ul");

  nav.setAttribute("aria-label", ariaLabel);
  list.append(
    direction({
      direction: "previous",
      href: "#page-1",
      label: "Previous",
    }),
    page({ href: "#page-1", value: "1" }),
    page({ current: true, href: "#page-2", value: "2" }),
    page({ href: "#page-3", value: "3" }),
    ellipsis(),
    page({ href: "#page-10", value: "10" }),
    direction({ direction: "next", href: "#page-3", label: "Next" }),
  );
  nav.append(list);
  component.append(nav);

  return component;
};

export default {
  title: "Components/Pagination",
  component: "ds-pagination",
  args: { ariaLabel: "Results pages" },
  argTypes: {
    ariaLabel: {
      control: "text",
      description: "Native accessible name for the navigation landmark.",
      table: { category: "Native semantics" },
    },
  },
  parameters: { design: { type: "figma", url: figmaUrl } },
  render: pagination,
};

export const Playground = {};
