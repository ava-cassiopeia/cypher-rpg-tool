import {DifficultyLevel, DifficulyLevels} from "../../src/ts/rules/difficulty";

const assert = require("assert");

describe("DifficultyLevels", () => {
  it("Has 11 difficulty levels (matching the source book)", () => {
    assert.equal(DifficulyLevels.length, 11);
  });
});

describe("DifficultyLevel", () => {
  describe(".get()", () => {
    it('returns a DifficultyLevel for a valid input', () => {
      const difficultyLevel = DifficultyLevel.get(3);

      assert.notEqual(difficultyLevel, null);
      assert.equal(difficultyLevel.difficulty, 3);
      assert.equal(difficultyLevel.targetNumber, 9);
    });
    it('returns null for an invalid input', () => {
      const difficultyLevel = DifficultyLevel.get(20);

      assert.equal(difficultyLevel, null);
    });
  });
  describe(".getByTargetNumber()", () => {
    it('returns a DifficultyLevel for a valid target number', () => {
      const difficultyLevel = DifficultyLevel.getByTargetNumber(9);

      assert.notEqual(difficultyLevel, null);
      assert.equal(difficultyLevel.difficulty, 3);
      assert.equal(difficultyLevel.targetNumber, 9);
    });
    it('returns null for an invalid target number', () => {
      const difficultyLevel = DifficultyLevel.getByTargetNumber(-2);

      assert.equal(difficultyLevel, null);
    });
    it('correctly uses the difficultyMod', () => {
      const difficultyLevel =
          DifficultyLevel.getByTargetNumber(9, /** difficultyMod= */ 2);

      assert.notEqual(difficultyLevel, null);
      assert.equal(difficultyLevel.difficulty, 5);
      assert.equal(difficultyLevel.targetNumber, 15);
    });
  });
  describe(".getByRoll()", () => {
    it('returns a DifficultyLevel for a valid roll', () => {
      const difficultyLevel = DifficultyLevel.getByRoll(11);

      assert.notEqual(difficultyLevel, null);
      assert.equal(difficultyLevel.difficulty, 3);
      assert.equal(difficultyLevel.targetNumber, 9);
    });
    it('returns null for an invalid roll', () => {
      const difficultyLevel = DifficultyLevel.getByRoll(50);

      assert.equal(difficultyLevel, null);
    });
    it('correctly uses the difficultyMod', () => {
      const difficultyLevel =
          DifficultyLevel.getByRoll(11, /** difficultyMod= */ 1);

      assert.notEqual(difficultyLevel, null);
      assert.equal(difficultyLevel.difficulty, 4);
      assert.equal(difficultyLevel.targetNumber, 12);
    });
    it('correctly handles difficulty mods that cause the total diff to be negative', () => {
      const difficultyLevel =
          DifficultyLevel.getByRoll(11, /** difficultyMod= */ -10);

      assert.equal(difficultyLevel, null);
    });
    it('correctly handles difficulty mods that cause the total diff to be super high', () => {
      const difficultyLevel =
          DifficultyLevel.getByRoll(11, /** difficultyMod= */ 100);

      assert.equal(difficultyLevel, null);
    });
  });
});
