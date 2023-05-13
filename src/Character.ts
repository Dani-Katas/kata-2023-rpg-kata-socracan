export class Character {
  private static readonly MAXIMUM_HEALTH = 1000
  private health = Character.MAXIMUM_HEALTH

  static spawn() {
    return new Character()
  }

  private minimumHealth = 1

  isAlive() {
    return this.health >= this.minimumHealth
  }

  hasHealth(health: number) {
    return this.health == health
  }

  isLevel(initialLevel: number) {
    return true
  }

  dealDamage(character: Character, damageAmount: number) {
    character.health = Math.max(character.health - damageAmount, 0)
  }

  isDead() {
    return !this.isAlive()
  }

  heal(character: Character, healingAmount: number) {
    character.health = Math.min(character.health + healingAmount, Character.MAXIMUM_HEALTH)
  }
}
