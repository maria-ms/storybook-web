import { expect } from "storybook/test";

import "@maria-ms/components-web/badge";
import { validateDataTableModel } from "@maria-ms/components-web/data-table";
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

export const Playground = {
  play: async ({ canvasElement }) => {
    const frame = canvasElement.querySelector("[data-data-table-story]");
    const component = frame?.querySelector("ds-data-table");
    const table = component?.querySelector("table");
    const headers = table?.querySelectorAll("thead th");
    const bodyRows = table?.querySelectorAll("tbody tr");
    const sortButton = table?.querySelector(".ds-data-table__sort-button");
    const headerCheckbox = headers?.[0]?.querySelector(
      'input[type="checkbox"]',
    );
    const rowCheckbox = bodyRows?.[0]?.querySelector('input[type="checkbox"]');

    await expect(frame).toBeTruthy();
    await expect(component).toBeTruthy();
    await expect(component.offsetWidth).toBe(frame.offsetWidth);
    await expect(table).toBeTruthy();
    await expect(table?.querySelector("caption")).toHaveTextContent(
      "Fulfilment records",
    );
    await expect(headers).toHaveLength(4);
    await expect(bodyRows).toHaveLength(2);
    await expect(headers?.[0]?.offsetWidth).toBe(48);
    await expect(headers?.[0]?.parentElement?.offsetHeight).toBe(40);
    await expect(bodyRows?.[0]?.offsetHeight).toBe(48);
    await expect(table?.querySelector("caption")?.offsetHeight).toBe(28);
    await expect(headers?.[1]).toHaveAttribute("aria-sort", "ascending");
    await expect(bodyRows?.[0]?.querySelector('th[scope="row"]')).toBeTruthy();
    await expect(headerCheckbox).toBeTruthy();
    await expect(rowCheckbox).toBeTruthy();
    const warningBadge = table?.querySelector('ds-badge[color="warning"]');
    const successBadge = table?.querySelector('ds-badge[color="success"]');
    await expect(warningBadge).toHaveTextContent("In progress");
    await expect(successBadge).toHaveTextContent("Done");
    // A Badge is intrinsically inline-flex. It is blockified to `flex` only
    // because this Cell composes direct children with a flex layout.
    await expect(getComputedStyle(warningBadge).display).toBe("flex");
    await expect(getComputedStyle(warningBadge).flexGrow).toBe("0");
    await expect(warningBadge?.offsetHeight).toBe(20);
    await expect(headerCheckbox?.getBoundingClientRect().x).toBe(
      rowCheckbox?.getBoundingClientRect().x,
    );

    sortButton?.click();
    await expect(component?.dataset.sortChange).toBe(
      JSON.stringify({ column: "order", direction: "descending" }),
    );
    await expect(
      component?.querySelector("th[scope='row'] a"),
    ).toHaveTextContent("ORD-1052");

    component
      ?.querySelectorAll("tbody tr")[1]
      ?.querySelector('input[type="checkbox"]')
      ?.click();
    await expect(component?.dataset.selectionChange).toBe(
      JSON.stringify({ selectedIds: ["ord-1052", "ord-1051"] }),
    );
    await expect(
      component?.querySelectorAll('tbody tr[data-selected="true"]'),
    ).toHaveLength(2);

    component.model = {
      ...defaultModel,
      state: { kind: "loading", message: "Loading fulfilment records" },
    };
    const loadingScrollRegion = component?.querySelector(".ds-data-table__scroll");
    const loadingCell = component?.querySelector("tbody td");
    await expect(loadingScrollRegion).toHaveAttribute("aria-busy", "true");
    await expect(loadingCell).toHaveAttribute("colspan", "4");
    await expect(loadingCell?.querySelector("ds-spinner")).toHaveAttribute(
      "aria-hidden",
      "true",
    );

    component.model = {
      ...defaultModel,
      state: { kind: "empty", message: "No fulfilment records" },
    };
    const emptyScrollRegion = component?.querySelector(".ds-data-table__scroll");
    const emptyCell = component?.querySelector("tbody td");
    await expect(emptyScrollRegion).not.toHaveAttribute("aria-busy");
    await expect(emptyCell).toHaveAttribute("colspan", "4");
    await expect(emptyCell).toHaveTextContent("No fulfilment records");

    component.model = {
      ...defaultModel,
      state: {
        kind: "error",
        message: "Fulfilment records could not be loaded.",
        action: { id: "retry", label: "Retry" },
      },
    };
    const errorCell = component?.querySelector("tbody td");
    const errorBadge = errorCell?.querySelector('ds-badge[color="destructive"]');
    const retryButton = errorCell?.querySelector('ds-button[variant="outline"] > button');
    const errorAnnouncement = component?.querySelector(".ds-data-table__live-region");
    await expect(errorCell).toHaveAttribute("colspan", "4");
    await expect(errorBadge).toHaveTextContent("Load error");
    await expect(retryButton).toHaveTextContent("Retry");
    await expect(errorAnnouncement).toHaveTextContent(
      "Fulfilment records could not be loaded.",
    );
    retryButton?.click();
    await expect(component?.dataset.dataTableAction).toBe(
      JSON.stringify({ id: "retry", state: "error" }),
    );

    await expect(() =>
      validateDataTableModel({
        ...defaultModel,
        columns: defaultModel.columns.map((column, index) =>
          index === 0 ? { ...column, hiddenLabel: true } : column,
        ),
      }),
    ).toThrow("cannot be both hiddenLabel and sortable");
    await expect(() =>
      validateDataTableModel({
        ...defaultModel,
        columns: defaultModel.columns.map((column, index) => {
          if (index !== 0) return column;
          const { renderer, ...plainColumn } = column;
          return plainColumn;
        }),
      }),
    ).toThrow("unless columns[0] supplies a renderer");

    const themeTarget = canvasElement.closest("[data-theme]") ?? document.documentElement;
    const previousTheme = themeTarget.getAttribute("data-theme");
    try {
      component.model = defaultModel;
      themeTarget.setAttribute("data-theme", "light");
      const lightSelectedRow = component?.querySelector('tbody tr[data-selected="true"]');
      const lightSelectedBackground = getComputedStyle(lightSelectedRow).backgroundColor;
      themeTarget.setAttribute("data-theme", "dark");
      const darkSelectedRow = component?.querySelector('tbody tr[data-selected="true"]');
      const darkSelectedBackground = getComputedStyle(darkSelectedRow).backgroundColor;
      await expect(darkSelectedBackground).not.toBe(lightSelectedBackground);

      frame.style.inlineSize = "180px";
      const narrowScrollRegion = component?.querySelector(".ds-data-table__scroll");
      await expect(narrowScrollRegion?.scrollWidth).toBeGreaterThan(
        narrowScrollRegion?.clientWidth,
      );
    } finally {
      frame.style.inlineSize = "760px";
      if (previousTheme === null) themeTarget.removeAttribute("data-theme");
      else themeTarget.setAttribute("data-theme", previousTheme);
    }
  },
};
