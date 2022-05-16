export class SiteThemeController {

  private currentTheme: string = "";

  private readonly dropdown: HTMLSelectElement;
  private readonly body: HTMLBodyElement;

  constructor() {
    this.dropdown = document.getElementById("siteThemeSelector") as HTMLSelectElement;
    this.body = document.getElementsByTagName("body")[0]!;

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
    this.body.classList.add(themeClass);
    this.currentTheme = themeName;
    this.saveThemeSelection();
  }

  private clearCurrentTheme() {
    if (this.currentTheme === "") return;
    const themeClass = this.getThemeCssClass(this.currentTheme);
    this.body.classList.remove(themeClass);
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
