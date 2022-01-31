var assert = require("assert");
const { expect } = require("chai");
const { cloneDeep } = require("lodash");

var { initGame, nextRound, endGame } = require("../engine/engine");

describe("Engine", function() {
    describe("Around The World", () => {
        it("initGame", () => {
            var gameState = initGame("AtW", ["Astruum", "Paulex"]);
            assert.deepEqual(
                gameState, {
                    gameMode: "AtW",
                    nbrPlayers: 2,
                    players: [
                        { name: "Astruum", score: 0 },
                        { name: "Paulex", score: 0 },
                    ],
                    currentTries: 3,
                    currentPlayerTurn: 0,
                },
                ""
            );

            var gameState = initGame("AtW", ["Astruum", "Paulex", "o4", "150k"]);
            assert.deepEqual(
                gameState, {
                    gameMode: "AtW",
                    nbrPlayers: 4,
                    players: [
                        { name: "Astruum", score: 0 },
                        { name: "Paulex", score: 0 },
                        { name: "o4", score: 0 },
                        { name: "150k", score: 0 },
                    ],
                    currentTries: 3,
                    currentPlayerTurn: 0,
                },
                ""
            );
        });

        it("NextRound", () => {
            var currentState = {
                gameMode: "AtW",
                nbrPlayers: 2,
                players: [
                    { name: "Astruum", score: 5 },
                    { name: "Paulex", score: 3 },
                ],
                currentTries: 1,
                currentPlayerTurn: 1,
            };
            var nextState = cloneDeep(currentState);
            nextState.currentTries = 3;
            nextState.currentPlayerTurn = 0;
            nextState.players[1].score = 4;
            assert.deepEqual(
                nextRound(currentState, [4, 1]),
                nextState,
                "Score must increase"
            );
            currentState.currentPlayerTurn = 0;
            currentState.currentTries = 3;
            nextState.currentTries = 2;
            currentState.players[1].score = 3;
            nextState.players[1].score = 3;

            assert.deepEqual(
                nextRound(currentState, [5, 1]),
                nextState,
                "score must remain the same 1"
            );
            currentState.currentTries = 3;
            assert.deepEqual(
                nextRound(currentState, [7, 1]),
                nextState,
                "score must remain the same 2"
            );
        });

        it("EndGame", () => {
            var currentState = {
                gameMode: "AtW",
                nbrPlayers: 2,
                players: [
                    { name: "Astruum", score: 5 },
                    { name: "Paulex", score: 3 },
                ],
                currentTries: 1,
                currentPlayerTurn: 1,
            };
            assert.equal(endGame(currentState), -1);
            currentState.players[0].score = 20;
            assert.equal(endGame(currentState), 0);
            currentState.players[0].score = 19;
            currentState.players[1].score = 20;
            assert.equal(endGame(currentState), 1);
        });
    });

    // describe("301", () => {
    //     it("initGame", () => {
    //         var gameState = initGame("301", ["Astruum", "Paulex"]);
    //         assert.deepEqual(
    //             gameState, {
    //                 gameMode: "301",
    //                 nbrPlayers: 2,
    //                 players: [
    //                     { name: "Astruum", score: 301, lastTurnScore: 301 },
    //                     { name: "Paulex", score: 301, lastTurnScore: 301 },
    //                 ],
    //                 currentTries: 3,
    //                 currentPlayerTurn: 0,
    //             },
    //             ""
    //         );

    //         var gameState = initGame("301", ["Astruum", "Paulex", "o4", "150k"]);
    //         assert.deepEqual(
    //             gameState, {
    //                 gameMode: "301",
    //                 nbrPlayers: 4,
    //                 players: [
    //                     { name: "Astruum", score: 301, lastTurnScore: 301 },
    //                     { name: "Paulex", score: 301, lastTurnScore: 301 },
    //                     { name: "o4", score: 301, lastTurnScore: 301 },
    //                     { name: "150k", score: 301, lastTurnScore: 301 },
    //                 ],
    //                 currentTries: 3,
    //                 currentPlayerTurn: 0,
    //             },
    //             ""
    //         );
    //     });

    //     it("nextRound", () => {
    //         const currentStates = [{
    //                 gameMode: "301",
    //                 nbrPlayers: 2,
    //                 players: [
    //                     { name: "Astruum", score: 301, lastTurnScore: 301 },
    //                     { name: "Paulex", score: 301, lastTurnScore: 301 },
    //                 ],
    //                 currentTries: 3,
    //                 currentPlayerTurn: 0,
    //             },
    //             {
    //                 gameMode: "301",
    //                 nbrPlayers: 2,
    //                 players: [
    //                     { name: "Astruum", score: 240, lastTurnScore: 240 },
    //                     { name: "Paulex", score: 130, lastTurnScore: 170 },
    //                 ],
    //                 currentTries: 1,
    //                 currentPlayerTurn: 1,
    //             },
    //             {
    //                 gameMode: "301",
    //                 nbrPlayers: 2,
    //                 players: [
    //                     { name: "Astruum", score: 10, lastTurnScore: 60 },
    //                     { name: "Paulex", score: 130, lastTurnScore: 170 },
    //                 ],
    //                 currentTries: 1,
    //                 currentPlayerTurn: 0,
    //             },
    //         ];
    //         const nextStates = [{
    //                 gameMode: "301",
    //                 nbrPlayers: 2,
    //                 players: [
    //                     { name: "Astruum", score: 271, lastTurnScore: 301 },
    //                     { name: "Paulex", score: 301, lastTurnScore: 301 },
    //                 ],
    //                 currentTries: 2,
    //                 currentPlayerTurn: 0,
    //             },
    //             {
    //                 gameMode: "301",
    //                 nbrPlayers: 2,
    //                 players: [
    //                     { name: "Astruum", score: 240, lastTurnScore: 240 },
    //                     { name: "Paulex", score: 120, lastTurnScore: 120 },
    //                 ],
    //                 currentTries: 3,
    //                 currentPlayerTurn: 0,
    //             },
    //             {
    //                 gameMode: "301",
    //                 nbrPlayers: 2,
    //                 players: [
    //                     { name: "Astruum", score: 60, lastTurnScore: 60 },
    //                     { name: "Paulex", score: 130, lastTurnScore: 170 },
    //                 ],
    //                 currentTries: 3,
    //                 currentPlayerTurn: 1,
    //             },
    //         ];
    //         assert.deepEqual(nextRound(currentStates[0], [10, 3]), nextStates[0]);
    //         assert.deepEqual(nextRound(currentStates[1], [5, 2]), nextStates[1]);
    //         assert.deepEqual(
    //             nextRound(cloneDeep(currentStates[2]), [15, 2]),
    //             nextRound[2]
    //         );
    //         assert.deepEqual(
    //             nextRound(cloneDeep(currentStates[2]), [3, 3]),
    //             nextRound[2]
    //         );
    //     });

    //     it("endGame", () => {
    //         var gameStates = [{
    //                 gameMode: "301",
    //                 nbrPlayers: 2,
    //                 players: [
    //                     { name: "Astruum", score: 20, lastTurnScore: 60 },
    //                     { name: "Paulex", score: 301, lastTurnScore: 301 },
    //                 ],
    //                 currentTries: 3,
    //                 currentPlayerTurn: 0,
    //             },
    //             {
    //                 gameMode: "301",
    //                 nbrPlayers: 2,
    //                 players: [
    //                     { name: "Astruum", score: 0, lastTurnScore: 60 },
    //                     { name: "Paulex", score: 301, lastTurnScore: 301 },
    //                 ],
    //                 currentTries: 3,
    //                 currentPlayerTurn: 0,
    //             },
    //             {
    //                 gameMode: "301",
    //                 nbrPlayers: 2,
    //                 players: [
    //                     { name: "Astruum", score: 20, lastTurnScore: 60 },
    //                     { name: "Paulex", score: 0, lastTurnScore: 30 },
    //                 ],
    //                 currentTries: 3,
    //                 currentPlayerTurn: 0,
    //             },
    //         ];

    //         assert.equal(endGame(gameStates[0]), -1);
    //         assert.equal(endGame(gameStates[1]), 0);
    //         assert.equal(endGame(gameStates[2]), 1);
    //     });
    // });
});