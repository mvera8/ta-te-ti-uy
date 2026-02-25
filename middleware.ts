// middleware.ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
    const { nextUrl } = req;

    const isLoggedIn = !!req.auth;
    const isProtectedRoute =
        nextUrl.pathname.startsWith("/playroom") ||
        nextUrl.pathname.startsWith("/game") ||
        nextUrl.pathname.startsWith("/ranking") ||
        nextUrl.pathname.startsWith("/profile");

    if (isProtectedRoute && !isLoggedIn) {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("callbackUrl", nextUrl.href);

        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/playroom/:path*", "/game/:path*", "/ranking", "/profile"],
};