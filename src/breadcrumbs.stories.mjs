import { expect } from "storybook/test";

import "@maria-ms/components-web/breadcrumbs";
import "@maria-ms/components-web/link";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40024818-45&m=dev";

const ancestor = (label, href) => {
  const item = document.createElement("li");
  const link = document.createElement("ds-link");
  const anchor = document.createElement("a");

  link.setAttribute("tone", "muted");
  link.setAttribute("size", "x-small");
  anchor.href = href;
  anchor.textContent = label;
  link.append(anchor);
  item.append(link);

  return item;
};

const breadcrumbs = ({ ariaLabel = "Breadcrumb" } = {}) => {
  const fixture = document.createElement("div");
  const component = document.createElement("ds-breadcrumbs");
  const nav = document.createElement("nav");
  const list = document.createElement("ol");
  const currentItem = document.createElement("li");
  const currentPage = document.createElement("span");

  fixture.dataset.breadcrumbsStory = "";
  fixture.style.inlineSize = "320px";
  fixture.style.maxInlineSize = "100%";

  nav.setAttribute("aria-label", ariaLabel);
  currentPage.setAttribute("aria-current", "page");
  currentPage.textContent = "Breadcrumbs";
  currentItem.append(currentPage);
  list.append(
    ancestor("Workspace", "/workspace"),
    ancestor("Components", "/components"),
    currentItem,
  );
  nav.append(list);
  component.append(nav);
  fixture.append(component);

  return fixture;
};

export default {
  title: "Components/Breadcrumbs",
  component: "ds-breadcrumbs",
  args: { ariaLabel: "Breadcrumb" },
  argTypes: {
    ariaLabel: {
      control: "text",
      description: "Native accessible name for the navigation landmark.",
      table: { category: "Native semantics" },
    },
  },
  parameters: { design: { type: "figma", url: figmaUrl } },
  render: breadcrumbs,
};

export const Playground = {
  play: async ({ canvasElement }) => {
    const fixture = canvasElement.querySelector("[data-breadcrumbs-story]");
    const component = fixture?.querySelector("ds-breadcrumbs");
    const nav = component?.querySelector("nav");
    const list = nav?.querySelector("ol");
    const items = list?.querySelectorAll(":scope > li");
    const firstLink = items?.[0]?.querySelector("a");
    const currentPage = items?.[2]?.querySelector("[aria-current='page']");

    await expect(component).toBeTruthy();
    await expect(nav).toHaveAttribute("aria-label", "Breadcrumb");
    await expect(list).toBeTruthy();
    await expect(items).toHaveLength(3);
    await expect(currentPage).toHaveTextContent("Breadcrumbs");
    await expect(items?.[2]?.querySelector("a")).toBeNull();
    await expect(getComputedStyle(list).flexWrap).toBe("wrap");
    await expect(component?.getBoundingClientRect().width).toBeCloseTo(
      fixture?.getBoundingClientRect().width ?? 0,
      1,
    );
    await expect(nav?.getBoundingClientRect().width).toBeCloseTo(
      component?.getBoundingClientRect().width ?? 0,
      1,
    );
    await expect(list?.getBoundingClientRect().width).toBeCloseTo(
      component?.getBoundingClientRect().width ?? 0,
      1,
    );

    firstLink?.focus();
    await expect(firstLink).toHaveFocus();
    await expect(getComputedStyle(firstLink).textDecorationLine).toContain("underline");
  },
};
