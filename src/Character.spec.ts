import { describe, expect, it } from "vitest";
import { Character } from "./Character.js";

describe("Character", () => {
  it("is alive when created", () => {
    const character = new Character();

    expect(character.isAlive()).toBe(true)
  });
});
