import { describe, expect, it } from "vitest";
import { Character } from "./Character.js";

/**
 * 1. All Characters, when created, have:
 *     - Health, starting at 1000
 *     - Level, starting at 1
 *     - May be Alive or Dead, starting Alive (Alive may be a true/false)
 *
 * 1. Characters can Deal Damage to Characters.
 *     - Damage is subtracted from Health
 *     - When damage received exceeds current Health, Health becomes 0 and the character dies
 *
 * 1. A Character can Heal a Character.
 *     - Dead characters cannot be healed
 *     - Healing cannot raise health above 1000
 */

describe("Character", () => {
  it("starts with full hp", () => {
    const character = Character.spawn();

    const initialHealth = 1000;
    expect(character.hasHealth(initialHealth)).toBe(true)
  });

  it("is alive when created", () => {
    const character = Character.spawn();

    expect(character.isAlive()).toBe(true)
  });

  it("starts at level one", () => {
    const character = Character.spawn();

    const initialLevel = 1;
    expect(character.isLevel(initialLevel)).toBe(true)
  });

  it("deals damage to other character", () => {
    const character = Character.spawn();
    const attacker = Character.spawn();

    const damageDealt = 200;
    attacker.dealDamage(character, damageDealt)

    expect(character.hasHealth(800)).toBe(true)
  });

  it("is dead when receiving enough damage", () => {
    const character = Character.spawn();
    const attacker = Character.spawn();

    attacker.dealDamage(character, 1000)

    expect(character.isDead()).toBe(true)
  });

  it("never has health below zero", () => {
    const character = Character.spawn();
    const attacker = Character.spawn();

    attacker.dealDamage(character, 1001)

    expect(character.hasHealth(0)).toBe(true)
  });
});
