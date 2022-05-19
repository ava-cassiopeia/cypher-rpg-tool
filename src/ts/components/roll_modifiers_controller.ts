import {ToggleBox} from "./toggle_box";

/**
 * Controller which manages all the toggle boxes and other modifier inputs
 * and their states.
 */
export class RollModifiersController {

  isTrained = false;
  isSpecialized = false;
  isInable = false;

  private readonly trainedToggle: ToggleBox;
  private readonly specializationToggle: ToggleBox;
  private readonly inabilityToggle: ToggleBox;

  constructor() {
    this.trainedToggle = new ToggleBox("trainedToggle", "t");
    this.specializationToggle = new ToggleBox("specializationToggle", "s");
    this.inabilityToggle = new ToggleBox("inabilityToggle", "i");

    this.trainedToggle.addListener(() => this.onToggleToggled());
    this.specializationToggle.addListener(() => this.onToggleToggled());
    this.inabilityToggle.addListener(() => this.onToggleToggled());
  }

  private onToggleToggled() {
    this.updateValues();
  }

  private updateValues() {
    this.isTrained = this.trainedToggle.checked;
    this.isSpecialized = this.specializationToggle.checked;
    this.isInable = this.inabilityToggle.checked;
  }

}
