"use client";

import Game from "@/components/Game";
import React from "react";

export default function GamePage({
    params,
}: {
    params: Promise<{ roomCode: string }>;
}) {
    const { roomCode } = React.use(params);
    return <Game roomCode={roomCode} />;
}