class Ship {
  constructor(length) {
    this.length = length;
    this.timesHit = 0;
  }

  tookHit = () => (this.timesHit += 1);
  isSunk = () => this.timesHit == this.length;
}

module.exports = {
  Ship,
};
