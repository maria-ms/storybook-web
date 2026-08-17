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

export const Playground = {};
