import "@maria-ms/components-web/field";
import "@maria-ms/components-web/tabs";
import "@maria-ms/components-web/text-input";

const figmaUrl =
  "https://www.figma.com/design/quQrWVWWnKGO2y2IHMudis/Design-System-v2.0-2026?node-id=40024596-2&m=dev";

const tabs = ({ activation = "manual" } = {}) => {
  const formColumn = document.createElement("div");
  const component = document.createElement("ds-tabs");
  const tablist = document.createElement("div");
  const overview = document.createElement("button");
  const activity = document.createElement("button");
  const settings = document.createElement("button");
  const overviewPanel = document.createElement("section");
  const activityPanel = document.createElement("section");
  const settingsPanel = document.createElement("section");
  const field = document.createElement("ds-field");
  const label = document.createElement("label");
  const textInput = document.createElement("ds-text-input");
  const input = document.createElement("input");
  const message = document.createElement("p");

  formColumn.dataset.tabsStory = "";
  formColumn.style.display = "block";
  formColumn.style.inlineSize = "480px";
  formColumn.style.maxInlineSize = "100%";

  component.setAttribute("activation", activation);
  tablist.setAttribute("role", "tablist");
  tablist.setAttribute("aria-label", "Account settings");

  [
    [overview, "Overview", "tabs-story-overview", "tabs-story-overview-panel", true],
    [activity, "Activity", "tabs-story-activity", "tabs-story-activity-panel", false],
    [settings, "Settings", "tabs-story-settings", "tabs-story-settings-panel", false],
  ].forEach(([tab, labelText, id, panelId, selected]) => {
    tab.id = id;
    tab.textContent = labelText;
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", panelId);
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });

  overviewPanel.id = "tabs-story-overview-panel";
  overviewPanel.setAttribute("role", "tabpanel");
  overviewPanel.setAttribute("aria-labelledby", overview.id);
  activityPanel.id = "tabs-story-activity-panel";
  activityPanel.setAttribute("role", "tabpanel");
  activityPanel.setAttribute("aria-labelledby", activity.id);
  activityPanel.hidden = true;
  activityPanel.tabIndex = 0;
  settingsPanel.id = "tabs-story-settings-panel";
  settingsPanel.setAttribute("role", "tabpanel");
  settingsPanel.setAttribute("aria-labelledby", settings.id);
  settingsPanel.hidden = true;
  settingsPanel.tabIndex = 0;

  label.slot = "label";
  label.textContent = "Display name";
  textInput.slot = "control";
  textInput.setAttribute("size", "medium");
  input.name = "display-name";
  input.value = "Maria";
  textInput.append(input);
  message.slot = "message";
  message.textContent = "Shown on your public profile.";
  field.append(label, textInput, message);

  activityPanel.textContent = "Recent account activity.";
  settingsPanel.textContent = "Account settings.";
  overviewPanel.append(field);
  tablist.append(overview, activity, settings);
  component.append(tablist, overviewPanel, activityPanel, settingsPanel);
  // Story-only: a stable panel region keeps the preview from jumping while
  // real product layouts remain free to own the panel's block size.
  component.style.minBlockSize = "128px";
  formColumn.append(component);

  return formColumn;
};

export default {
  title: "Components/Tabs",
  component: "ds-tabs",
  args: { activation: "manual" },
  argTypes: {
    activation: {
      control: "select",
      options: ["manual", "automatic"],
      description: "Manual requires Enter or Space after Arrow navigation. Use automatic only for local, instant panels.",
      table: { category: "Behavior" },
    },
  },
  parameters: { design: { type: "figma", url: figmaUrl } },
  render: tabs,
};

export const Playground = {};
