class GamePlayer {
    constructor(playerId, gameId) {
        this.playerId = playerId;
        this.gameId = gameId;
        this.remainingShots = 3;
        this.score = 0;
        this.rank = null;
        this.order = null;
        this.createdAt = Date.now();
    }
}

module.exports = GamePlayer;