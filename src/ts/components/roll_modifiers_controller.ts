import {ToggleBox} from "./toggle_box";

/**
 * Controller which manages all the toggle boxes and other modifier inputs
 * and their states.
 */
export class RollModifiersController {

  isTrained = false;

  private readonly trainedToggle: ToggleBox;

  constructor() {
    this.trainedToggle = new ToggleBox("trainedToggle", "t");

    this.trainedToggle.addListener(() => this.onToggleToggled());
  }

  private onToggleToggled() {
    this.updateValues();
  }

  private updateValues() {
    this.isTrained = this.trainedToggle.checked;
  }

}
