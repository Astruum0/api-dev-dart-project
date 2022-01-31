const { v4: uuidv4 } = require("uuid");

class Game {
    constructor(mode, name) {
        this.id = uuidv4();
        this.mode = mode;
        this.name = name ? name : `Game ${this.id}`;
        this.currentPlayerId = null;
        this.status = "draft";
        this.createdAt = Date.now();
    }
}

module.exports = Game;