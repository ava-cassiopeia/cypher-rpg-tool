import {DifficulyLevels, DifficultyLevel} from "../../rules/difficulty";

/**
 * Quick-reference difficulty table automatically populated from fixed rules
 * data.
 */
export class DifficultyTable {

  readonly element: HTMLElement;
  readonly tbody: HTMLElement;

  constructor() {
    this.element = document.getElementById("quickReferenceDifficultyTable");
    this.tbody = this.element.querySelector("tbody");

    DifficultyTable.init(this.tbody);
  }

  private static init(element: HTMLElement) {
    for (const level of DifficulyLevels) {
      const newRow = DifficultyTable.createRow(level);
      element.appendChild(newRow);
    }
  }

  private static createRow(difficultyLevel: DifficultyLevel): HTMLElement {
    const rowEl = document.createElement("tr");

    const difficultyEl = document.createElement("td");
    difficultyEl.classList.add("difficulty");
    difficultyEl.textContent = String(difficultyLevel.difficulty);
    rowEl.appendChild(difficultyEl);

    const targetNumberEl = document.createElement("td");
    targetNumberEl.classList.add("target-number");
    targetNumberEl.textContent = String(difficultyLevel.targetNumber);
    rowEl.appendChild(targetNumberEl);

    const descriptionEl = document.createElement("td");
    descriptionEl.classList.add("description");
    descriptionEl.textContent = difficultyLevel.description;
    rowEl.appendChild(descriptionEl);

    const guidanceEl = document.createElement("td");
    guidanceEl.classList.add("guidance");
    guidanceEl.textContent = difficultyLevel.guidance;
    rowEl.appendChild(guidanceEl);

    return rowEl;
  }

}
