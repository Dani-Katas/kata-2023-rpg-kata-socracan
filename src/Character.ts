export class Character {
  private static readonly MAXIMUM_HEALTH = 1000
  private health = Character.MAXIMUM_HEALTH
  private level: number

  private constructor(level: number = 1) {
    this.level = level
  }

  static spawn() {
    return new Character()
  }

  static with({ level }: { level: number }) {
    return new Character(level)
  }

  private minimumHealth = 1

  isAlive() {
    return this.health >= this.minimumHealth
  }

  hasHealth(health: number) {
    return this.health == health
  }

  isLevel(initialLevel: number) {
    return this.level == initialLevel
  }

  setLevel(level: number) {
    this.level = level
  }

  dealDamage(character: Character, damageAmount: number) {
    if (character === this) {
      return
    }
    if (character.level - this.level >= 5) {
      damageAmount = damageAmount / 2
    }

    character.health = Math.max(character.health - damageAmount, 0)
  }

  isDead() {
    return !this.isAlive()
  }

  healSelf(healingAmount: number) {
    if (this.isDead()) {
      return
    }

    this.health = Math.min(this.health + healingAmount, Character.MAXIMUM_HEALTH)
  }
}
