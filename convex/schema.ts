// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        tokenIdentifier: v.string(), // ID del proveedor de auth (GitHub/Facebook)
        name: v.optional(v.string()),
        email: v.optional(v.string()),
        image: v.optional(v.string()),
        wins: v.number(),
        losses: v.number(),
        draws: v.number(),
        totalGames: v.number(),
    })
        .index("by_token", ["tokenIdentifier"])
        .index("by_wins", ["wins"]),

    games: defineTable({
        // Código para compartir la partida (ej: "A7K9Q")
        roomCode: v.string(),

        // Jugadores
        playerX: v.string(),            // creador (tokenIdentifier)
        playerXName: v.optional(v.string()),
        playerXImage: v.optional(v.string()),
        playerO: v.optional(v.string()),    // (tokenIdentifier)
        playerOName: v.optional(v.string()),
        playerOImage: v.optional(v.string()),

        // Tablero (9 posiciones)
        board: v.array(
            v.union(
                v.literal("X"),
                v.literal("O"),
                v.null()
            )
        ),

        // Turno actual
        currentTurn: v.union(
            v.literal("X"),
            v.literal("O")
        ),

        // Estado del juego
        status: v.union(
            v.literal("waiting"),   // esperando segundo jugador
            v.literal("playing"),   // en curso
            v.literal("finished")   // terminado
        ),

        // Resultado
        winner: v.optional(
            v.union(
                v.literal("X"),
                v.literal("O"),
                v.literal("draw")
            )
        ),

        finishedAt: v.optional(v.number()),
        playerXFirstMove: v.optional(v.number()),
        playerOFirstMove: v.optional(v.number()),
    })
        .index("by_room", ["roomCode"])
        .index("by_status", ["status"])
        .index("by_playerX", ["playerX"])
        .index("by_playerO", ["playerO"]),
});