/**
 * Represents a 20-sided die.
 */
export class D20 {
  private constructor() {}

  static roll(): number {
    return Math.floor(Math.random() * 20) + 1;
  }
}
