const { v4: uuidv4 } = require("uuid");

class GameShot {
    constructor(gameId, playerId, multiplicator, sector) {
        this.gameId = gameId;
        this.playerId = playerId;
        this.multiplicator = multiplicator;
        this.sector = sector;
        this.createdAt = Date.now();
    }
}