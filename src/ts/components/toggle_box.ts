/**
 * Controller class for the ToggleBox UI element. ToggleBoxes are basically just
 * checkbox-like things but with keyboard shortcuts and better styling.
 */
export class ToggleBox {

  private readonly element: HTMLElement;
  private readonly checkbox: HTMLInputElement;
  private readonly eventListeners: ToggleBoxListener[] = [];

  constructor(elementId: string, private readonly keyboardShortcut: string) {
    this.element = document.getElementById(`${elementId}_container`);
    this.checkbox = this.element.querySelector(".checkbox") as HTMLInputElement;

    this.checkbox.addEventListener("change", () => this.onCheckboxChange());
    window.addEventListener("keypress", (e) => this.onKeyPress(e));
  }

  get checked(): boolean {
    return this.checkbox.checked;
  }

  addListener(listener: ToggleBoxListener) {
    this.eventListeners.push(listener);
  }

  toggle() {
    this.checkbox.checked = !this.checkbox.checked;
    this.notifyListeners();
  }

  private onCheckboxChange() {
    this.notifyListeners();
  }

  private onKeyPress(event: KeyboardEvent) {
    if (event.key !== this.keyboardShortcut) return;
    event.preventDefault();
    this.toggle();
  }

  private notifyListeners() {
    for (const listener of this.eventListeners) {
      listener(this.checkbox.checked);
    }
  }

}

type ToggleBoxListener = (checked: boolean) => void;
