/**
 * Represents a single 'page' within the app.
 */
export class Page {

  readonly id: string;

  constructor(readonly element: HTMLElement) {
    this.id = element.getAttribute("data-page-id");
  }

  show() {
    this.element.classList.add("show");
  }

  hide() {
    this.element.classList.remove("show");
  }

}
