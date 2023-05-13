import { describe, expect, it } from "vitest";
import { Character } from "./Character.js";

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
});
