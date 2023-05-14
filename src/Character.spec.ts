import { describe, expect, it } from "vitest"
import { fc, test } from "@fast-check/vitest"
import { Character } from "./Character.js"

/**
 * 1. OK A Character cannot Deal Damage to itself.
 *
 * 2. OK A Character can only Heal itself.
 *
 * 3. ❌ When dealing damage:
 *     - If the target is 5 or more Levels above the attacker, Damage is reduced by 50%
 *     - If the target is 5 or more Levels below the attacker, Damage is increased by 50%
 */

class FixedLevelCharacter extends Character {
  private level: number
  constructor(level: number) {
    super()
    this.level = level
  }

  isLevel(initialLevel: number): boolean {
    return initialLevel === this.level
  }
}

describe("Character", () => {
  describe("spawning", () => {
    it("starts with full hp", () => {
      const character = Character.spawn()

      const initialHealth = 1000
      expect(character.hasHealth(initialHealth)).toBe(true)
    })

    it("is alive when created", () => {
      const character = Character.spawn()

      expect(character.isAlive()).toBe(true)
    })

    it("starts at level one", () => {
      const character = Character.spawn()

      const initialLevel = 1
      expect(character.isLevel(initialLevel)).toBe(true)
    })
  })

  describe("deals damage", () => {
    it("to other character", () => {
      const character = Character.spawn()
      const attacker = Character.spawn()

      const damageDealt = 200
      attacker.dealDamage(character, damageDealt)

      expect(character.hasHealth(800)).toBe(true)
    })

    it("can not deal damage to self", () => {
      const attacker = Character.spawn()

      attacker.dealDamage(attacker, 200)

      expect(attacker.hasHealth(1000)).toBe(true)
    })

    it("deals 50% of the damage if the target is 5 or more levels above the attacker", () => {
      const target = Character.spawn()
      const attacker = Character.spawn()
      target.setLevel(6)

      attacker.dealDamage(target, 200)

      expect(target.hasHealth(900)).toBe(true)
    })

    test.prop([fc.integer({ min: 1, max: 1000 })])("damage never goes below zero", (damageDealt) => {
      const character = Character.spawn()
      const attacker = Character.spawn()

      attacker.dealDamage(character, damageDealt)

      expect(character.hasHealth(1000 - damageDealt)).toBe(true)
    })
  })

  describe("receives damage", () => {
    it("enough to be dead", () => {
      const character = Character.spawn()
      const attacker = Character.spawn()

      attacker.dealDamage(character, 1000)

      expect(character.isDead()).toBe(true)
    })

    it("but never having health below zero", () => {
      const character = Character.spawn()
      const attacker = Character.spawn()

      attacker.dealDamage(character, 1001)

      expect(character.hasHealth(0)).toBe(true)
    })
  })

  describe("heals", () => {
    it("can heal itself", () => {
      const healer = Character.spawn()
      const attacker = Character.spawn()
      attacker.dealDamage(healer, 300)

      healer.healSelf(100)

      expect(healer.hasHealth(800)).toBe(true)
    })

    test.prop([fc.integer({ min: 1 })])("heal does not exceed maximum health", (healAmount) => {
      const healer = Character.spawn()

      healer.healSelf(healAmount)

      expect(healer.hasHealth(1000)).toBe(true)
    })

    test.prop([fc.integer({ min: 1 })])("cannot be healed if is dead", (healAmount) => {
      const healer = Character.spawn()
      const attacker = Character.spawn()
      attacker.dealDamage(healer, 1000)

      healer.healSelf(healAmount)

      expect(healer.hasHealth(0)).toBe(true)
      expect(healer.isDead()).toBe(true)
    })
  })
})
