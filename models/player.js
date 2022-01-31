const { v4: uuidv4 } = require("uuid");

class Player {
    constructor(name) {
        this.id = uuidv4();
        this.name = name;
        this.gameWin = 0;
        this.gameLost = 0;
        this.createdAt = Date.now();
    }
}

module.exports = Player;