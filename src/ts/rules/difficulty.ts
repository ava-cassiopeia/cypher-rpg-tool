/**
 * Class which contains helper methods that can help deal with difficulty.
 */
export class DifficultyLevel {
  readonly targetNumber: number;

  constructor(
      readonly difficulty: number,
      readonly description: string,
      readonly guidance: string) {
    this.targetNumber = difficulty * 3;
  }

  static get(difficulty: number): DifficultyLevel|null {
    if (difficulty >= DifficulyLevels.length) return null;
    return DifficulyLevels[difficulty]!;
  }

  static getByTargetNumber(
      targetNumber: number, difficultyMod = 0): DifficultyLevel|null {
    const difficulty = targetNumber !== 0 ? Math.floor(targetNumber / 3) : 0;
    return DifficultyLevel.get(difficulty + difficultyMod);
  }

  static getByRoll(roll: number, difficultyMod = 0): DifficultyLevel|null {
    const target = roll - (roll % 3);
    return DifficultyLevel.getByTargetNumber(target, difficultyMod);
  }

}

export const DifficulyLevels = [
  new DifficultyLevel(
    /* difficulty= */ 0,
    "Routine",
    "Anyone can do this basically every time",
  ),
  new DifficultyLevel(
    /* difficulty= */ 1,
    "Simple",
    "Most people can do this most of the time",
  ),
  new DifficultyLevel(
    /* difficulty= */ 2,
    "Standard",
    "Typical task requiring focus, but most people can usually do this",
  ),
  new DifficultyLevel(
    /* difficulty= */ 3,
    "Demanding",
    "Requires full attention; most people have a 50/50 chance to succeed",
  ),
  new DifficultyLevel(
    /* difficulty= */ 4,
    "Difficult",
    "Trained people have a 50/50 chance to succeed",
  ),
  new DifficultyLevel(
    /* difficulty= */ 5,
    "Challenging",
    "Even trained people often fail",
  ),
  new DifficultyLevel(
    /* difficulty= */ 6,
    "Intimidating",
    "Normal people almost never succeed",
  ),
  new DifficultyLevel(
    /* difficulty= */ 7,
    "Formidable",
    "Impossible without skills or great effort",
  ),
  new DifficultyLevel(
    /* difficulty= */ 8,
    "Heroic",
    "A task worthy of tales told for years afterwards",
  ),
  new DifficultyLevel(
    /* difficulty= */ 9,
    "Immortal",
    "A task worthy of legends that last for lifetimes",
  ),
  new DifficultyLevel(
    /* difficulty= */ 10,
    "Impossible",
    "A task that normal humans couldn't consider (but doesn't break the laws of physics)",
  ),
];

export const RollEffects: RollEffectsType = {
  1: [
    "suffer +2 damage or free GM intrusion",
  ],
  17: [
    "+1 damage",
  ],
  18: [
    "+2 damage",
  ],
  19: [
    "+3 damage",
  ],
  20: [
    "+4 damage or major effect + no pool cost",
  ],
};

type RollEffectsType = {
  [key: number]: string[];
}
