var Game = require("../models/game.js");

describe("Game Object", () => {
    it("init Game", () => {
        var game = new Game("Around the world");
        game = new Game("Around the world");
        game = new Game("Around the world");
        game = new Game("Around the world");
        game = new Game("Around the world");

        console.log(game);
    });
});