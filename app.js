const app = require("./routes.js");

PORT = 3000;

global.games = [];
global.players = [];
global.gamesPlayers = [];

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});