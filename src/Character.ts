export class Character {
  private health = 1000;

  static spawn() {
    return new Character()
  }

  isAlive() {
    return true;
  }

  hasHealth(health: number) {
    return this.health == health
  }

  isLevel(initialLevel: number) {
    return true
  }

  dealDamage(character: Character, damageDealt: number) {
    character.health = character.health - damageDealt
  }
}
