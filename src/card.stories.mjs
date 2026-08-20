import "@maria-ms/components-web/accordion";
import "@maria-ms/components-web/badge";
import "@maria-ms/components-web/button";
import "@maria-ms/components-web/card";
import "@maria-ms/components-web/link";
import { createAccordionExample } from "./fixtures/accordion.mjs";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40024255-2&m=dev";

const button = ({ label, type = "button", variant = "primary" }) => {
  const component = document.createElement("ds-button");
  const control = document.createElement("button");

  component.setAttribute("size", "medium");
  component.setAttribute("variant", variant);
  control.type = type;
  control.textContent = label;
  component.append(control);
  return component;
};

const cardStory = () => {
  const fixture = document.createElement("div");
  const card = document.createElement("ds-card");
  const header = document.createElement("header");
  const heading = document.createElement("div");
  const title = document.createElement("h2");
  const description = document.createElement("p");
  const accordion = createAccordionExample();
  const footer = document.createElement("footer");
  const actions = document.createElement("div");

  fixture.style.inlineSize = "680px";
  fixture.style.maxInlineSize = "100%";
  fixture.style.marginInline = "auto";

  header.dataset.cardHeader = "";
  heading.dataset.cardHeading = "";
  title.dataset.cardTitle = "";
  title.textContent = "Frequently asked questions";
  description.dataset.cardDescription = "";
  description.textContent = "Find answers about accessibility, styling, and interaction.";
  heading.append(title, description);
  header.append(heading);

  accordion.dataset.cardContent = "";

  footer.dataset.cardFooter = "";
  actions.dataset.cardActions = "";
  actions.append(button({ label: "View all questions" }));
  footer.append(actions);

  card.append(header, accordion, footer);
  fixture.append(card);
  return fixture;
};

export default {
  title: "Components/Card",
  component: "ds-card",
  parameters: {
    layout: "centered",
    design: { type: "figma", url: figmaUrl },
  },
  render: cardStory,
};

export const Playground = {};
