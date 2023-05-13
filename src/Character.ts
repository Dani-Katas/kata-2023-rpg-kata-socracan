export class Character {

  static spawn() {
    return new Character()
  }

  isAlive() {
    return true;
  }

  hasHealth(initialHealth: number) {
    return true
  }

  isLevel(initialLevel: number) {
    return true
  }
}
