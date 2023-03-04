import {Page} from "./page";
import {PageLink} from "./page_link";

/**
 * Singleton-style class intended to manage the state of pages in the app.
 */
export class PageManager {

  readonly pages = new Map<string, Page>();
  readonly pageLinks: PageLink[] = [];

  constructor(readonly defaultPageID: string) {
    // Find all page elements within the page
    const pageElementList = document.querySelectorAll("[data-page-id]");
    for (const pageElement of pageElementList) {
      const page = new Page(pageElement as HTMLElement);
      this.pages.set(page.id, page);
    }

    // Find all elements on the page that have a data-go-to-page attribute,
    // which marks them as a page link.
    const pageLinkElementList = document.querySelectorAll("[data-go-to-page]");
    for (const pageLinkElement of pageLinkElementList) {
      const pageLink = new PageLink(pageLinkElement as HTMLElement);
      pageLink.addClickListener((pL) => this.onPageLinkClicked(pL));
      this.pageLinks.push(pageLink);
    }

    // Show default page
    if (this.pages.has(defaultPageID)) {
      this.pages.get(defaultPageID)!.show();
    }
  }

  onPageLinkClicked(pageLink: PageLink) {
    this.goToPage(pageLink.targetPageID);
  }

  goToPage(pageID: string) {
    if (!this.pages.has(pageID)) return;
    this.hideAllPages();
    this.pages.get(pageID)!.show();
  }

  private hideAllPages() {
    for (const page of this.pages.values()) {
      page.hide();
    }
  }

}
