import {D20} from "../rules/d20";
import {DifficultyLevel, RollEffects} from "../rules/difficulty";

const SHOW_RESULTS_CSS_CLASS = "show";
const ROLLING_CSS_CLASS = "rolling";

// Amount of time, in milliseconds, that it takes to roll.
const ROLL_TIME = 1500;

export class RollController {

  private rolling = false;

  private readonly rollButton: HTMLButtonElement;
  private readonly resultsContainerEl: HTMLElement;
  private readonly resultEl: HTMLElement;
  private readonly difficultyEl: HTMLElement;
  private readonly descriptionEl: HTMLElement;
  private readonly rollEffectsList: HTMLElement;

  constructor() {
    this.rollButton = document.getElementById("rollButton") as HTMLButtonElement;
    this.resultsContainerEl = document.getElementById("rollResults");
    this.resultEl = document.getElementById("rollResult");
    this.difficultyEl = document.getElementById("rollDifficulty");
    this.descriptionEl = document.getElementById("rollDescription");
    this.rollEffectsList = document.getElementById("rollEffectsList");

    window.addEventListener("keypress", (e) => this.onKeypress(e));
    this.rollButton.addEventListener("click", () => this.onRollButtonClick());
  }

  onKeypress(event: KeyboardEvent) {
    if (event.key !== "r") return;
    this.roll();
  }

  private onRollButtonClick() {
    this.roll();
  }

  private async roll() {
    if (this.rolling) return;
    this.toggleRolling(true);
    await this.sleep(ROLL_TIME);

    // const dieResult = D20.roll();
    const dieResult = 20;
    const difficultyLevel = DifficultyLevel.getByRoll(dieResult);
    if (difficultyLevel === null) {
      console.warn(`No difficulty level found for die result ${dieResult}`);
      this.toggleRolling(false);
      return;
    }
    this.setResult(dieResult, difficultyLevel);

    this.toggleRolling(false);
  }

  private toggleRolling(isRolling: boolean) {
    this.rolling = isRolling;
    this.rollButton.disabled = isRolling;
    this.rollButton.classList.toggle(ROLLING_CSS_CLASS, isRolling);
    this.resultsContainerEl.classList.toggle(ROLLING_CSS_CLASS, isRolling);

    if (isRolling) {
      this.rollButton.textContent = "Rolling...";
    } else {
      this.rollButton.textContent = "Roll";
    }
  }

  private setResult(dieResult: number, difficultyLevel: DifficultyLevel) {
    const effects = this.getRollEffects(dieResult);

    this.resultEl.textContent = String(dieResult);
    this.difficultyEl.textContent = String(difficultyLevel.difficulty);
    this.descriptionEl.textContent = difficultyLevel.description;
    this.resultsContainerEl.classList.add(SHOW_RESULTS_CSS_CLASS);

    // set effects
    this.resetRollEffects();
    for (const effect of effects) {
      this.addRollEffect(effect);
    }
  }

  private addRollEffect(rollEffect: string) {
    const newEffect = document.createElement("li");
    newEffect.classList.add("roll-effect");
    newEffect.textContent = rollEffect;
    this.rollEffectsList.appendChild(newEffect);
  }

  private resetRollEffects() {
    this.rollEffectsList.innerHTML = "";
  }

  private getRollEffects(dieRoll: number): string[] {
    if (!RollEffects[dieRoll]) return [];
    return RollEffects[dieRoll];
  }

  private async sleep(amountMs: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, amountMs);
    });
  }

}
