import { expect, userEvent } from "storybook/test";

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
      table: { category: "Native behavior" },
    },
  },
  parameters: { design: { type: "figma", url: figmaUrl } },
  render: tabs,
};

export const Playground = {
  play: async ({ canvasElement }) => {
    const component = canvasElement.querySelector("ds-tabs");
    const tablist = component?.querySelector('[role="tablist"]');
    const tabs = component?.querySelectorAll('button[role="tab"]');
    const panels = component?.querySelectorAll('[role="tabpanel"]');
    const [overview, activity, settings] = tabs ?? [];
    const [, activityPanel, settingsPanel] = panels ?? [];
    const themeTarget = canvasElement.closest("[data-theme]") ?? document.documentElement;
    const previousTheme = themeTarget.getAttribute("data-theme");

    await expect(component).toBeTruthy();
    await expect(tablist?.getBoundingClientRect().height).toBeCloseTo(24, 1);
    await expect(overview?.getBoundingClientRect().height).toBeCloseTo(24, 1);
    await expect(component?.getBoundingClientRect().height).toBeCloseTo(128, 1);

    overview?.focus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(activity).toHaveFocus();
    await expect(overview).toHaveAttribute("aria-selected", "true");
    await expect(activityPanel).toHaveAttribute("hidden");

    try {
      themeTarget.setAttribute("data-theme", "light");
      const lightFocus = getComputedStyle(activity);
      const lightBackground = lightFocus.backgroundColor;
      const lightShadow = lightFocus.boxShadow;
      await expect(lightFocus.borderRadius).toBe("4px");
      await expect(lightShadow).not.toBe("none");

      themeTarget.setAttribute("data-theme", "dark");
      const darkFocus = getComputedStyle(activity);
      await expect(darkFocus.backgroundColor).not.toBe(lightBackground);
      await expect(darkFocus.boxShadow).not.toBe(lightShadow);
    } finally {
      if (previousTheme === null) themeTarget.removeAttribute("data-theme");
      else themeTarget.setAttribute("data-theme", previousTheme);
    }

    await userEvent.keyboard("{Enter}");
    await expect(activity).toHaveAttribute("aria-selected", "true");
    await expect(activityPanel).not.toHaveAttribute("hidden");

    component.activation = "automatic";
    await userEvent.keyboard("{ArrowRight}");
    await expect(settings).toHaveFocus();
    await expect(settings).toHaveAttribute("aria-selected", "true");
    await expect(settingsPanel).not.toHaveAttribute("hidden");
  },
};
