const router = require("express").Router();
const ApiError = require("../models/error.js");
const path = require("path");
const Player = require("../models/player.js");

router.get("/", (req, res) => {
    res.json(global.players);
});
router.get("/:id", (req, res) => {
    var currentPlayer = global.players.find((e) => e.id == req.params.id);
    res.json(currentPlayer);
});

router.post("/", (req, res) => {
    var newPlayer = new Player(req.body.name);
    global.players.push(newPlayer);
    res.json(JSON.stringify(newPlayer));
});

router.delete("/:id", (req, res) => {
    var currentPlayer = global.players.find((e) => e.id == req.params.id);
    if (currentPlayer) {
        console.log(global.players);
        global.players.filter((e) => e.id != currentPlayer.id);
        console.log(global.players);
        res.redirect("/players");
    } else {
        res.json(
            new ApiError(
                "404 NOT_FOUND",
                `Cannot find Player at id ${req.params.id}`
            ).json()
        );
    }
});

module.exports = router;