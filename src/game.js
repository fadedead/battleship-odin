const { Player } = new Player();

class Game {
  createPlayers() {
    const player = new Player();
    const computer = new Player();

    player.setOpponent(computer);
    computer.setOpponent(player);
  }
}
