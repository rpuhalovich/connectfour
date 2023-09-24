import { Server } from "socket.io";
import { randomUUID } from "crypto";

import { Game, createGrid } from "./game";

const io = new Server(6464, {
    cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
});

const GAMES = new Map<string, Game>();

/**
 * in this architecture, the server is the source of truth. the
 * clients send updates, and the server sends back the updated
 * state of the game (game.ts:Game). therefore, there's only one place to see
 * the state of the game. it's not fragmeted
 *
 * also in this current architecture, it's important to note that any complex
 * logic should be extracted to it's own functions. generally in a real work
 * environment, the only thing that should be handled in the actual socket
 * callbacks are input validations
 */
io.on("connection", (socket) => {
    socket.on("create", () => {
        const gameId: string = randomUUID();

        const columns: number = 7;
        const rows: number = 6;

        const game: Game = {
            id: gameId,
            grid: createGrid(rows, columns),
            players: [socket.id],
            playerCurrentTurn: socket.id,
        };

        GAMES.set(gameId, game);

        io.to(socket.id).emit("created", gameId);
    });

    // gameId is a uuid for the current game
    socket.on("join", (gameId: string) => {
        const game: Game | undefined = GAMES.get(gameId);
        if (!game) {
            io.to(socket.id).emit("unavailable");
            return;
        }

        if (game.players.length >= 2) {
            io.to(socket.id).emit("full");
            return;
        }

        io.to(socket.id).emit("joined", game);
    });

    socket.on("hover", (gameId: string, column: number) => {
        const game: Game = GAMES.get(gameId);
        if (game.playerCurrentTurn !== socket.id) return;
        socket.to(gameId).volatile.emit("hover", column);
    });

    socket.on("drop", (gameId: string, column: number) => {
        const game: Game | undefined = GAMES.get(gameId);
        if (!game) {
            io.to(socket.id).emit("unavailable");
            return;
        }

        if (game.playerCurrentTurn !== socket.id) return;
        if (typeof column !== "number") return;

        socket.to(socket.it).emit("drop", column);

        game.drops.push(column);
        game.grid[column][lowestFreeSlot(game.grid[column])] = game.socketOneTurn ? 1 : 2;
        const win = winPositions(game, column, game.socketOneTurn ? 1 : 2);
        if (win.length > 0) {
            io.to(uuid).emit("win", [[column, highestOccupiedSlot(game.grid[column])], ...win.flat()]);
            game.drops = [];
            game.grid = createGrid(COLUMNS, ROWS);
        } else {
            const newTurn = !game.socketOneTurn;
            game.socketOneTurn = newTurn;
        }
    });
});
