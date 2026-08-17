import "@maria-ms/components-web/badge";
import "@maria-ms/components-web/data-table";
import "@maria-ms/components-web/link";
import "@maria-ms/components-web/progress";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40024692-71&m=dev";

const defaultModel = {
  caption: "Fulfilment records",
  rowKey: "id",
  columns: [
    {
      id: "order",
      label: "Order",
      width: "fill",
      rowHeader: true,
      sortable: true,
      renderer: "order-link",
    },
    {
      id: "progress",
      label: "Fulfilment",
      width: 220,
      align: "end",
      renderer: "progress",
    },
    {
      id: "status",
      label: "Status",
      width: 172,
      renderer: "status-badge",
    },
  ],
  rows: [
    {
      id: "ord-1051",
      order: { label: "ORD-1051", href: "/orders/ord-1051" },
      progress: { value: 50, label: "50%" },
      status: { label: "In progress", color: "warning" },
    },
    {
      id: "ord-1052",
      order: { label: "ORD-1052", href: "/orders/ord-1052" },
      progress: { value: 100, label: "100%" },
      status: { label: "Done", color: "success" },
    },
  ],
  selection: { selectedIds: ["ord-1052"] },
  sort: { column: "order", direction: "ascending" },
};

const renderers = {
  "order-link": ({ value }) => {
    const link = document.createElement("ds-link");
    const anchor = document.createElement("a");
    anchor.href = value.href;
    anchor.textContent = value.label;
    link.setAttribute("size", "medium");
    link.append(anchor);
    return link;
  },
  progress: ({ row, value }) => {
    const progress = document.createElement("ds-progress");
    const control = document.createElement("progress");
    control.max = 100;
    control.value = value.value;
    control.setAttribute("aria-label", `Fulfilment progress for ${row.id}`);
    progress.setAttribute("size", "medium");
    progress.append(control);
    return progress;
  },
  "status-badge": ({ value }) => {
    const badge = document.createElement("ds-badge");
    badge.setAttribute("color", value.color);
    badge.textContent = value.label;
    return badge;
  },
};

const sortableText = (value) => {
  if (
    value !== null &&
    typeof value === "object" &&
    (typeof value.label === "string" || typeof value.label === "number")
  ) {
    return String(value.label);
  }
  return String(value ?? "");
};

const dataTable = ({ model = defaultModel } = {}) => {
  const frame = document.createElement("div");
  const component = document.createElement("ds-data-table");

  frame.dataset.dataTableStory = "";
  frame.style.inlineSize = "760px";
  frame.style.maxInlineSize = "100%";
  component.cellRenderers = renderers;
  component.model = model;
  component.addEventListener("ds-sort-change", ({ detail }) => {
    component.dataset.sortChange = JSON.stringify(detail);
    component.model = {
      ...component.model,
      rows: [...component.model.rows].sort((first, second) => {
        const left = sortableText(first[detail.column]);
        const right = sortableText(second[detail.column]);
        return detail.direction === "ascending"
          ? left.localeCompare(right)
          : right.localeCompare(left);
      }),
    };
  });
  component.addEventListener("ds-selection-change", ({ detail }) => {
    component.dataset.selectionChange = JSON.stringify(detail);
  });
  component.addEventListener("ds-data-table-action", ({ detail }) => {
    component.dataset.dataTableAction = JSON.stringify(detail);
  });
  frame.append(component);
  return frame;
};

export default {
  title: "Components/Data Table",
  component: "ds-data-table",
  args: { model: defaultModel },
  argTypes: {
    model: {
      control: "object",
      description:
        "The public JSON-serializable model. It must satisfy the Data Table schema; the fixture registers renderers before applying it.",
      table: { category: "Data" },
    },
    cellRenderers: {
      control: false,
      description:
        "A JavaScript property whose functions return existing component nodes for rich Cell content.",
      table: { category: "Data" },
    },
  },
  parameters: { design: { type: "figma", url: figmaUrl } },
  render: dataTable,
};

export const Playground = {};
