const router = require("express").Router();
const ApiError = require("../models/error.js");
const path = require("path");
const Game = require("../models/game.js");
const GamePlayer = require("../models/gamePlayer.js");
const res = require("express/lib/response");
const { json } = require("express/lib/response");

router.get("/", (req, res) => {
    // res.json(new ApiError("406 NOT_ACCEPTABLE").json());
    res.json(global.games);
});

router.get("/:id", (req, res) => {
    var currentGame = global.games.find((e) => e.id == req.params.id);
    res.json(currentGame);
});

router.post("/", (req, res) => {
    var newGame = new Game(req.body.mode, req.body.name);

    global.games.push(newGame);

    res.json(JSON.stringify(newGame));
});

router.get("/new", (req, res) => {
    res.sendFile(path.join(__dirname, "../static/forms/newGame.html"));
});

router.delete("/:id", (req, res) => {
    var currentGame = global.games.find((e) => e.id == req.params.id);
    if (currentGame) {
        global.games.filter((e) => {
            e != currentGame;
        });
        res.redirect("/games");
    } else {
        res.json(
            new ApiError(
                "404 NOT_FOUND",
                `Cannot find Game at id ${req.params.id}`
            ).json()
        );
    }
});

router.get("/:id/players", (req, res) => {
    var allPlayersGames = global.gamesPlayers.filter(
        (e) => e.gameId == req.params.id
    );
    players = [];
    for (var i in allPlayersGames) {
        console.log(allPlayersGames[i].playerId);
        console.log(global.players);
        console.log(
            global.players.find((e) => e.id == allPlayersGames[i].playerId)
        );
        players.push(
            JSON.stringify(
                global.players.find((e) => e.id == allPlayersGames[i].playerId)
            )
        );
    }
    console.log(allPlayersGames, players);
    res.json(players);
});

router.post("/:id/players", (req, res) => {
    var ids = req.body;
    var currentGame = global.games.find((e) => e.id == req.params.id);
    if (currentGame) {
        if (currentGame.status == "draft") {
            for (i in ids) {
                var newConnexion = new GamePlayer(ids[i], currentGame.id);
                global.gamesPlayers.push(newConnexion);
            }
            res.json(req.body);
        } else {
            res.json(
                new ApiError(
                    "422 PLAYERS_NOT_ADDABLE_GAME_STARTED",
                    `Game ${req.params.id} has already started !`
                ).json()
            );
        }
    } else {
        res.json(
            new ApiError(
                "404 NOT_FOUND",
                `Cannot find Game at id ${req.params.id}`
            ).json()
        );
    }
});

module.exports = router;