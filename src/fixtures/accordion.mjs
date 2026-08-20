export const createRichAccordionItem = ({ open }) => {
  const item = document.createElement("details");
  const summary = document.createElement("summary");
  const body = document.createElement("div");
  const supportingText = document.createElement("p");
  const actions = document.createElement("div");
  const badge = document.createElement("ds-badge");
  const link = document.createElement("ds-link");
  const anchor = document.createElement("a");

  item.open = open;
  summary.textContent = "What accessibility standards are met?";
  supportingText.textContent =
    "This component meets WCAG 2.1 AA accessibility guidelines and has been tested with screen readers.";
  actions.style.display = "flex";
  actions.style.alignItems = "center";
  actions.style.gap = "var(--ds-semantic-spacing-xs)";
  badge.setAttribute("color", "success");
  badge.setAttribute("size", "small");
  badge.textContent = "WCAG 2.1 AA";
  link.setAttribute("size", "small");
  link.setAttribute("tone", "primary");
  anchor.href = "#accessibility-report";
  anchor.textContent = "View accessibility report";
  link.append(anchor);
  actions.append(badge, link);
  body.append(supportingText, actions);
  item.append(summary, body);
  return item;
};

export const createAccordionExample = ({ openItem = "accessibility" } = {}) => {
  const component = document.createElement("ds-accordion");
  const items = [
    ["accessibility", "Is it accessible?", "Yes. It uses native disclosure semantics."],
    ["styling", "Is it styled?", "Yes. It uses token-bound spacing, dividers, and focus treatment."],
    ["animation", "Is it animated?", "Yes. Content expands and collapses with the native disclosure control."],
  ];

  items.forEach(([value, header, body]) => {
    const item = document.createElement("details");
    const summary = document.createElement("summary");
    const content = document.createElement("p");

    item.open = openItem === value;
    summary.textContent = header;
    content.textContent = body;
    item.append(summary, content);
    component.append(item);
  });

  component.append(createRichAccordionItem({ open: openItem === "rich" }));
  return component;
};
