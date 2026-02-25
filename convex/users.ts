import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const storeUser = mutation({
    args: {
        tokenIdentifier: v.string(),
        name: v.optional(v.string()),
        email: v.optional(v.string()),
        image: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) => q.eq("tokenIdentifier", args.tokenIdentifier))
            .unique();

        if (user !== null) {
            // Update user if info changed
            if (user.name !== args.name || user.image !== args.image || user.email !== args.email) {
                await ctx.db.patch(user._id, {
                    name: args.name,
                    image: args.image,
                    email: args.email,
                });
            }
            return user._id;
        }

        return await ctx.db.insert("users", {
            tokenIdentifier: args.tokenIdentifier,
            name: args.name,
            email: args.email,
            image: args.image,
            wins: 0,
            losses: 0,
            draws: 0,
            totalGames: 0,
        });
    },
});

export const getRanking = query({
    args: { limit: v.optional(v.number()) },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("users")
            .withIndex("by_wins")
            .order("desc")
            .take(args.limit ?? 10);
    },
});

export const getUserStats = query({
    args: { tokenIdentifier: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("users")
            .withIndex("by_token", (q) => q.eq("tokenIdentifier", args.tokenIdentifier))
            .unique();
    },
});

export const getTotalMatches = query({
    args: {},
    handler: async (ctx) => {
        const finishedGames = await ctx.db
            .query("games")
            .withIndex("by_status", (q) => q.eq("status", "finished"))
            .collect();
        return finishedGames.length;
    },
});

export const getUserRanking = query({
    args: { tokenIdentifier: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) => q.eq("tokenIdentifier", args.tokenIdentifier))
            .unique();

        if (!user) return null;

        const betterPlayers = await ctx.db
            .query("users")
            .withIndex("by_wins", (q) => q.gt("wins", user.wins))
            .collect();

        return betterPlayers.length + 1;
    },
});
