import { calculateWinner } from "@/lib/calculateWinner";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/* =========================
   QUERY: getGameByRoom
========================= */

export const getGameByRoom = query({
    args: { roomCode: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("games")
            .withIndex("by_room", (q) => q.eq("roomCode", args.roomCode))
            .first();
    },
});

/* =========================
   MUTATION: createGame
========================= */

export const createGame = mutation({
    args: {
        roomCode: v.string(),
        userId: v.string(),
        userName: v.optional(v.string()),
        userImage: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("games", {
            roomCode: args.roomCode,
            playerX: args.userId,
            playerXName: args.userName,
            playerXImage: args.userImage,
            playerO: undefined,
            board: Array(9).fill(null),
            currentTurn: "X",
            status: "waiting",
            winner: undefined,
            finishedAt: undefined,
        });
    },
});

/* =========================
   MUTATION: joinGame
========================= */

export const joinGame = mutation({
    args: {
        roomCode: v.string(),
        userId: v.string(),
        userName: v.optional(v.string()),
        userImage: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const game = await ctx.db
            .query("games")
            .withIndex("by_room", (q) => q.eq("roomCode", args.roomCode))
            .first();

        if (!game) {
            throw new Error("Game not found");
        }

        if (game.playerO) {
            throw new Error("Game already has two players");
        }

        await ctx.db.patch(game._id, {
            playerO: args.userId,
            playerOName: args.userName,
            playerOImage: args.userImage,
            status: "playing",
        });

        return game._id;
    },
});

/* =========================
   MUTATION: makeMove
========================= */

export const makeMove = mutation({
    args: {
        roomCode: v.string(),
        userId: v.string(),
        position: v.number(), // 0 - 8
    },
    handler: async (ctx, args) => {
        const game = await ctx.db
            .query("games")
            .withIndex("by_room", (q) => q.eq("roomCode", args.roomCode))
            .first();

        if (!game) {
            throw new Error("Game not found");
        }

        if (game.status !== "playing") {
            throw new Error("Game is not active");
        }

        if (args.position < 0 || args.position > 8) {
            throw new Error("Invalid position");
        }

        if (game.board[args.position] !== null) {
            throw new Error("Cell already taken");
        }

        const playerSymbol =
            game.playerX === args.userId
                ? "X"
                : game.playerO === args.userId
                    ? "O"
                    : null;

        if (!playerSymbol) {
            throw new Error("You are not part of this game");
        }

        if (game.currentTurn !== playerSymbol) {
            throw new Error("Not your turn");
        }

        const newBoard = [...game.board];
        newBoard[args.position] = playerSymbol;

        // Record first move if not already recorded
        const patchData: {
            board: ("X" | "O" | null)[];
            playerXFirstMove?: number;
            playerOFirstMove?: number;
            status?: "waiting" | "playing" | "finished";
            winner?: "X" | "O" | "draw";
            finishedAt?: number;
            currentTurn?: "X" | "O";
        } = {
            board: newBoard,
        };

        if (playerSymbol === "X" && game.playerXFirstMove === undefined) {
            patchData.playerXFirstMove = args.position;
        } else if (playerSymbol === "O" && game.playerOFirstMove === undefined) {
            patchData.playerOFirstMove = args.position;
        }

        const result = calculateWinner(newBoard);

        if (result) {
            patchData.status = "finished";
            patchData.winner = result === "draw" ? "draw" : result;
            patchData.finishedAt = Date.now();

            await ctx.db.patch(game._id, patchData);

            // Update stats for playerX
            const userX = await ctx.db
                .query("users")
                .withIndex("by_token", (q) => q.eq("tokenIdentifier", game.playerX))
                .unique();
            if (userX) {
                await ctx.db.patch(userX._id, {
                    totalGames: userX.totalGames + 1,
                    wins: userX.wins + (result === "X" ? 1 : 0),
                    losses: userX.losses + (result === "O" ? 1 : 0),
                    draws: userX.draws + (result === "draw" ? 1 : 0),
                });
            }

            // Update stats for playerO
            if (game.playerO) {
                const userO = await ctx.db
                    .query("users")
                    .withIndex("by_token", (q) => q.eq("tokenIdentifier", game.playerO!))
                    .unique();

                if (userO) {
                    await ctx.db.patch(userO._id, {
                        totalGames: userO.totalGames + 1,
                        wins: userO.wins + (result === "O" ? 1 : 0),
                        losses: userO.losses + (result === "X" ? 1 : 0),
                        draws: userO.draws + (result === "draw" ? 1 : 0),
                    });
                }
            }
        } else {
            patchData.currentTurn = playerSymbol === "X" ? "O" : "X";
            await ctx.db.patch(game._id, patchData);
        }


        return true;
    },
});

/* =========================
   QUERY: getUnfinishedGames
   ========================= */

export const getUnfinishedGames = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const gamesX = await ctx.db
            .query("games")
            .withIndex("by_playerX", (q) => q.eq("playerX", args.userId))
            .filter((q) => q.neq(q.field("status"), "finished"))
            .collect();

        const gamesO = await ctx.db
            .query("games")
            .withIndex("by_playerO", (q) => q.eq("playerO", args.userId))
            .filter((q) => q.neq(q.field("status"), "finished"))
            .collect();


        return [...gamesX, ...gamesO].sort((a, b) => b._creationTime - a._creationTime);
    },
});

export const getLastGame = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const gamesX = await ctx.db
            .query("games")
            .withIndex("by_playerX", (q) => q.eq("playerX", args.userId))
            .order("desc")
            .take(5);

        const gamesO = await ctx.db
            .query("games")
            .withIndex("by_playerO", (q) => q.eq("playerO", args.userId))
            .order("desc")
            .take(5);

        const allGames = [...gamesX, ...gamesO].sort((a, b) => b._creationTime - a._creationTime);
        return allGames[0] || null;
    },
});

export const getDailyMatchesCount = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

        const gamesX = await ctx.db
            .query("games")
            .withIndex("by_playerX", (q) => q.eq("playerX", args.userId))
            .filter((q) => q.gt(q.field("finishedAt"), startOfDay))
            .collect();

        const gamesO = await ctx.db
            .query("games")
            .withIndex("by_playerO", (q) => q.eq("playerO", args.userId))
            .filter((q) => q.gt(q.field("finishedAt"), startOfDay))
            .collect();

        return gamesX.length + gamesO.length;
    },
});