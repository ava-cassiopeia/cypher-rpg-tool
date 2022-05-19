export class SiteThemeController {

  private currentTheme: string = "";

  private readonly dropdown: HTMLSelectElement;
  private readonly themeElement: HTMLHtmlElement;

  constructor() {
    this.dropdown = document.getElementById("siteThemeSelector") as HTMLSelectElement;
    this.themeElement = document.getElementsByTagName("html")[0]!;

    this.dropdown.addEventListener("change", () => this.onDropdownChange());
    this.loadThemeSelection();
    this.updateTheme();
  }

  private onDropdownChange() {
    this.updateTheme();
  }

  private updateTheme() {
    this.clearCurrentTheme();
    const themeName = this.dropdown.value.toLowerCase();
    const themeClass = this.getThemeCssClass(themeName);
    this.themeElement.classList.add(themeClass);
    this.currentTheme = themeName;
    this.saveThemeSelection();
  }

  private clearCurrentTheme() {
    if (this.currentTheme === "") return;
    const themeClass = this.getThemeCssClass(this.currentTheme);
    this.themeElement.classList.remove(themeClass);
  }

  private getThemeCssClass(themeName: string): string {
    return `${themeName}-theme`;
  }

  private saveThemeSelection() {
    if (!window.localStorage) return;
    window.localStorage.setItem("siteThemeName", this.currentTheme);
  }

  private loadThemeSelection() {
    if (!window.localStorage) return;
    const storageValue = window.localStorage.getItem("siteThemeName");
    if (storageValue == null || storageValue === "") return;
    this.currentTheme = storageValue;
    this.dropdown.value = this.currentTheme;
  }

}
