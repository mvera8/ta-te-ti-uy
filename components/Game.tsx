"use client";

import { useEffect, useState, useRef } from "react";
import {
    Loader,
    Text,
    Button,
    Avatar,
    Group,
    Card,
    Stack,
    Box,
    Grid,
    Modal,
    Center,
} from "@mantine/core";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSession } from "next-auth/react";
import Board from "./Board";
import Ads from "./Ads";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { sileo } from "sileo";
import { useDocumentTitle, useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import ConfettiExplosion from "react-confetti-explosion";
import Link from "next/link";
import { SiteSection } from "./SiteSection";

export default function Game({ roomCode }: { roomCode: string }) {
    const router = useRouter();
    const { data: session, status } = useSession();
    const userId = session?.user?.email;

    const [isExploding, setIsExploding] = useState(false);
    const [gameOverOpened, { open: openGameOver, close: closeGameOver }] = useDisclosure(false);

    // Refs to prevent duplicate notifications
    const hasJoinedNotified = useRef(false);
    const hasOpponentNotified = useRef(false);

    const game = useQuery(
        api.games.getGameByRoom,
        roomCode ? { roomCode } : "skip"
    );

    const joinGame = useMutation(api.games.joinGame);
    const makeMove = useMutation(api.games.makeMove);
    const incrementViews = useMutation(api.games.incrementViews);

    const xColor = "grape";
    const oColor = "cyan";

    /* =============================
       Redirección si no existe
    ============================== */
    useEffect(() => {
        if (status === "loading" || game === undefined) return;
        if (game === null) {
            router.push("/");
        }
    }, [game, status, router]);

    /* =============================
       Join automático
    ============================== */
    useEffect(() => {
        if (!userId || !game || hasJoinedNotified.current) return;

        if (
            game.status === "waiting" &&
            game.playerX !== userId &&
            !game.playerO
        ) {
            joinGame({
                roomCode,
                userId,
                userName: session?.user?.name || undefined,
                userImage: session?.user?.image || undefined,
            });

            hasJoinedNotified.current = true;
            sileo.success({
                title: "¡Te has unido!",
                description: (
                    <Text c="dimmed">
                        A jugar contra {game.playerXName || "tu oponente"} 🚀
                    </Text>
                ),
            });
        }
    }, [game, userId, session, joinGame, roomCode]);

    /* =============================
       Contador de Visitas
    ============================== */
    useEffect(() => {
        const hasVisited = sessionStorage.getItem(`visited_${roomCode}`);
        if (!hasVisited && roomCode) {
            incrementViews({ roomCode });
            sessionStorage.setItem(`visited_${roomCode}`, "true");
        }
    }, [roomCode, incrementViews]);

    /* =============================
       Notificación: Jugador Unido
    ============================== */
    useEffect(() => {
        if (game?.playerO && game.playerX === userId && game.status === "playing" && !hasOpponentNotified.current) {
            hasOpponentNotified.current = true;
            sileo.info({
                title: "¡Oponente unido!",
                description: (
                    <Text c="dimmed">
                        {game.playerOName || "Alguien"} se ha unido a la partida.
                    </Text>
                ),
            });
        }
    }, [game, userId]);

    /* =============================
       Confetti
    ============================== */
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (game?.status === "finished" && game.winner && game.winner !== "draw") {
            const isWinner =
                (game.winner === "X" && game.playerX === userId) ||
                (game.winner === "O" && game.playerO === userId);

            if (isWinner) {
                timer = setTimeout(() => setIsExploding(true), 0);
            }
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [game, userId]);

    useEffect(() => {
        if (game?.status === "finished") {
            openGameOver();
        }
    }, [game, openGameOver]);

    const mySymbol =
        game?.playerX === userId
            ? "X"
            : game?.playerO === userId
                ? "O"
                : null;

    const isMyTurn = game?.currentTurn === mySymbol;

    const turnText =
        !game || !userId || status === "loading"
            ? "Ta Te Ti Uy"
            : game.status === "waiting"
                ? "Esperando oponente..."
                : game.status === "finished"
                    ? game.winner === "draw"
                        ? "¡Empate!"
                        : `¡Ganó ${game.winner}!`
                    : isMyTurn
                        ? "¡Tu turno!"
                        : "Turno del oponente...";

    useDocumentTitle(turnText);

    if (status === "loading" || !userId || !game) return <Center py="xl"><Loader /></Center>;

    const xIsMe = game.playerX === userId;
    const oIsMe = game.playerO === userId;

    const handlePlay = async (position: number) => {
        if (!isMyTurn) return;

        await makeMove({
            roomCode,
            userId,
            position,
        });
    };

    const handleShareRoom = async () => {
        const roomUrl = `${window.location.origin}/game/${roomCode}`;
        const message = `🎮 Juguemos Ta Te Ti Uy!\n\n${game.playerXName} te retó acá:\n${roomUrl}`;

        const isMobile = /Android|iPhone|iPad|iPod/i.test(
            navigator.userAgent
        );

        if (isMobile) {
            window.location.href = `https://wa.me/?text=${encodeURIComponent(
                message
            )}`;
            return;
        }

        await navigator.clipboard.writeText(message);

        sileo.success({
            title: "Mensaje copiado",
            description: (
                <Text c="dimmed">Compartilo en WhatsApp y a jugar 😎</Text>
            ),
        });
    };

    /* =============================
       UI
    ============================== */

    return (
        <SiteSection size="md">
            {isExploding && (
                <Box
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 1000,
                    }}
                >
                    <ConfettiExplosion
                        force={0.8}
                        duration={3000}
                        particleCount={250}
                        width={1600}
                        onComplete={() => setIsExploding(false)}
                    />
                </Box>
            )}

            <Ads />

            <Group justify="space-between" mb="xs">
                <Stack gap={0}>
                    <Text size="xl">
                        Room: <b>{roomCode}</b>
                    </Text>
                    <Text size="xs" c="dimmed">
                        {game.views || 0} visitas
                    </Text>
                </Stack>

                <Button
                    onClick={handleShareRoom}
                    rightSection={<IconBrandWhatsapp size={20} />}
                    radius="xl"
                    color="teal"
                >
                    Compartir
                </Button>
            </Group>

            <Grid
                align="center"
                justify="center"
                gutter="xs"
            >
                {/* PLAYER X */}
                <Grid.Col
                    span={{ base: 6, md: 3 }}
                    order={{ base: 1, md: 1 }}
                >
                    <Card
                        withBorder
                        h="100%"
                        style={{
                            borderColor:
                                game.currentTurn === "X" ? "orange" : undefined,
                        }}
                    >
                        <Stack gap="xs" align="center" justify="center" h="100%">
                            <Avatar.Group>
                                <Avatar color={xColor} radius="xl" size="lg">
                                    X
                                </Avatar>
                                <Avatar
                                    color={xColor}
                                    radius="xl"
                                    size="lg"
                                    src={xIsMe ? session?.user?.image : game.playerXImage}
                                />
                            </Avatar.Group>

                            <Text fw={xIsMe ? 700 : 400}>
                                {xIsMe
                                    ? session?.user?.name
                                    : game.playerXName || game.playerX}
                            </Text>
                        </Stack>
                    </Card>
                </Grid.Col>

                {/* BOARD */}
                <Grid.Col
                    span={{ base: 12, md: 6 }}
                    order={{ base: 3, md: 2 }}
                >
                    {/* in game finished */}
                    {game.status === "finished" && (
                        <Center mb="md">
                            <Button
                                component="a"
                                href="/playroom"
                                size="md"
                                radius="xl"
                                variant="filled"
                                color="cyan"
                            >
                                Volver al Playroom
                            </Button>
                        </Center>
                    )}

                    <Board
                        board={game.board}
                        currentTurn={game.currentTurn}
                        status={game.status}
                        winner={game.winner}
                        onPlay={handlePlay}
                        isMyTurn={isMyTurn}
                    />
                </Grid.Col>

                {/* PLAYER O */}
                <Grid.Col
                    span={{ base: 6, md: 3 }}
                    order={{ base: 2, md: 3 }}
                >
                    <Card
                        withBorder
                        h="100%"
                        style={{
                            borderColor:
                                game.currentTurn === "O" ? "orange" : undefined,
                        }}
                    >
                        <Stack gap="xs" align="center" justify="center" h="100%">
                            {!game.playerO ? (
                                <Text>Waiting...</Text>
                            ) : (
                                <>
                                    <Avatar.Group>
                                        <Avatar color={oColor} radius="xl" size="lg">
                                            O
                                        </Avatar>
                                        <Avatar
                                            color={oColor}
                                            radius="xl"
                                            size="lg"
                                            src={
                                                oIsMe
                                                    ? session?.user?.image
                                                    : game.playerOImage
                                            }
                                        />
                                    </Avatar.Group>

                                    <Text fw={oIsMe ? 700 : 400}>
                                        {oIsMe
                                            ? session?.user?.name
                                            : game.playerOName || game.playerO}
                                    </Text>
                                </>
                            )}
                        </Stack>
                    </Card>
                </Grid.Col>
            </Grid>

            <Modal
                opened={gameOverOpened}
                onClose={closeGameOver}
                title="Partida Finalizada"
                centered
            >
                <Stack align="center" py="xl">
                    <Stack gap="sm">
                        <Text size="xl" fw={700}>
                            {game.winner === "draw"
                                ? "¡Es un empate! 🤝"
                                : game.winner === mySymbol
                                    ? "¡Felicitaciones! Ganaste 🎉"
                                    : "¡Mucha suerte la próxima! 🏁"}
                        </Text>
                        <Button
                            component="a"
                            href="/playroom"
                            fullWidth
                            size="md"
                            radius="xl"
                            variant="filled"
                            color="cyan"
                        >
                            Volver al Playroom
                        </Button>
                        <Button
                            fullWidth
                            size="md"
                            radius="xl"
                            color="grape"
                            onClick={closeGameOver}
                        >
                            Cerrar
                        </Button>
                    </Stack>
                </Stack>
            </Modal>
        </SiteSection>
    );
}