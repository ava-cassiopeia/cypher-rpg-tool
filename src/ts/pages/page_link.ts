export class PageLink {

  readonly targetPageID: string;

  constructor(readonly element: HTMLElement) {
    this.targetPageID = element.getAttribute("data-go-to-page");
  }

  addClickListener(callback: (pageLink: PageLink) => void) {
    this.element.addEventListener("click", () => {
      callback(this);
    });
  }

}
