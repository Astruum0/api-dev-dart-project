const initGame = (mode, allPlayers) => {
    return {
        gameMode: mode,
        nbrPlayers: allPlayers.length,
        players: allPlayers.map((e) => {
            var p = {
                name: e,
                score: mode == "301" ? 301 : 0,
            };
            if (mode == "301") {
                p.lastTurnScore = 301;
            }
            return p;
        }),
        currentTries: 3,
        currentPlayerTurn: 0,
    };
};

const nextRound = (gameSate, dartLocation) => {
    if (gameSate.gameMode == "AtW") {
        if (
            dartLocation[0] ==
            gameSate.players[gameSate.currentPlayerTurn].score + 1
        ) {
            gameSate.players[gameSate.currentPlayerTurn].score += 1;
        }

        gameSate.currentTries -= 1;
        if (gameSate.currentTries == 0) {
            gameSate.currentTries = 3;
            gameSate.currentPlayerTurn += 1;
            if (gameSate.currentPlayerTurn == gameSate.nbrPlayers) {
                gameSate.currentPlayerTurn = 0;
            }
        }
    }

    if (gameSate.gameMode == "301") {
        const points = dartLocation[0] * dartLocation[1];
        gameSate.players[gameSate.currentPlayerTurn].score -= points;

        gameSate.currentTries -= 1;
        if (gameSate.currentTries == 0) {
            gameSate.players[gameSate.currentPlayerTurn].lastTurnScore =
                gameSate.players[gameSate.currentPlayerTurn].score;
            gameSate.currentTries = 3;
            gameSate.currentPlayerTurn += 1;
            if (gameSate.currentPlayerTurn == gameSate.nbrPlayers) {
                gameSate.currentPlayerTurn = 0;
            }
        }
    }

    return gameSate;
};

const endGame = (gameSate) => {
    if (gameSate.gameMode == "AtW") {
        for (var i = 0; i < gameSate.nbrPlayers; i++) {
            if (gameSate.players[i].score == 20) {
                return i;
            }
        }
        return -1;
    }
};

module.exports = {
    initGame,
    nextRound,
    endGame,
};