export class Character {
  private health = 1000

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

  dealDamage(character: Character, damageDealt: number) {
    character.health = Math.max(character.health - damageDealt, 0)
  }

  isDead() {
    return !this.isAlive()
  }
}
