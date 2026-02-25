"use client";

import { Button, Title, Text, Card, Group, Grid, Progress, Badge, Box } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import CardNumber from "@/components/CardNumber";
import { IconBolt } from "@tabler/icons-react";
import { Ranking } from "@/components/Ranking";
import { useMediaQuery } from "@mantine/hooks";
import { SiteSection } from "@/components/SiteSection";
import Ads from "@/components/Ads";

function generateRoomCode() {
    return Math.random().toString(36).substring(2, 7).toUpperCase();
}

export default function PlayroomClient({
    user,
}: {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
}) {
    const isDesktop = useMediaQuery('(min-width: 64em)');
    const router = useRouter();
    const unfinishedGames = useQuery(api.games.getUnfinishedGames, {
        userId: user.email ?? "",
    });

    const total = useQuery(api.users.getTotalMatches) ?? 0;

    const userRanking = useQuery(api.users.getUserRanking, {
        tokenIdentifier: user.email ?? "",
    });
    const lastGame = useQuery(api.games.getLastGame, {
        userId: user.email ?? "",
    });
    const dailyMatches = useQuery(api.games.getDailyMatchesCount, {
        userId: user.email ?? "",
    }) ?? 0;

    const createGame = useMutation(api.games.createGame);

    const handleCreateRoom = async () => {
        const roomCode = generateRoomCode();
        await createGame({
            roomCode,
            userId: user.email!,
            userName: user.name ?? undefined,
            userImage: user.image ?? undefined,
        });
        router.push(`/game/${roomCode}`);
    };

    return (
        <SiteSection size="md">
            <Ads />
            <Group justify="space-between" mb="md">
                <Text size="xl">
                    Bienvenido <b>{user.name ?? user.email}</b>
                </Text>

                <Button
                    onClick={handleCreateRoom}
                    rightSection={<IconBolt size={20} />}
                    radius="xl"
                    variant="filled"
                    color="grape"
                    size={isDesktop ? "md" : "lg"}
                    fullWidth={!isDesktop}
                >
                    Crear Nueva Partida
                </Button>
            </Group>

            <Grid
                align="flex-start"
                justify="center"
                gutter="xs"
                mb="md"
            >
                <Grid.Col span={{ base: 6, md: 4 }}>
                    <CardNumber prefix="#" number={userRanking ?? '--'} title="Ranking Global" />
                </Grid.Col>
                <Grid.Col span={{ base: 6, md: 4 }}>
                    <CardNumber number={total} title="Partidas Totales" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    {lastGame &&
                        <Card withBorder p="lg" radius="md" shadow="sm">
                            <Group justify="space-between" mb="md">
                                <Title order={3} size="h2" tt="uppercase">
                                    {lastGame.roomCode}
                                </Title>
                                <Badge color={lastGame.status === 'finished' ? 'gray' : 'green'}>
                                    {lastGame.status === 'finished' ? 'FINALIZADO' : 'EN CURSO'}
                                </Badge>
                            </Group>
                            <Text c="dimmed" size="sm">
                                Último Partido vs {lastGame.playerOName}
                            </Text>
                        </Card>
                    }
                </Grid.Col>
            </Grid>

            {unfinishedGames && unfinishedGames.length > 0 && (
                <Box mb="md">
                    <Title order={3} size="h4" mb="sm">Partidas sin terminar</Title>
                    {unfinishedGames.map((game) => (
                        <Button
                            key={game._id}
                            variant="outline"
                            onClick={() => router.push(`/game/${game.roomCode}`)}
                            fullWidth
                        >
                            Reanudar {game.roomCode} ({new Date(game._creationTime).toLocaleDateString()})
                        </Button>
                    ))}
                </Box>
            )}

            <Grid
                align="flex-start"
                justify="center"
                gutter="xs"
                mb="md"
            >
                <Grid.Col span={{ base: 12, md: 5 }}>
                    <Card
                        withBorder
                        p="lg"
                        radius="md"
                        shadow="sm"
                        mb="sm"
                        style={{
                            background: `
                                radial-gradient(ellipse 110% 70% at 25% 80%, rgba(255, 20, 147, 0.15), transparent 55%),
                                radial-gradient(ellipse 80% 90% at 20% 30%, rgba(138, 43, 226, 0.18), transparent 50%),
                                transparent
                            `,
                            borderColor: "rgba(255, 20, 147, 0.15)"
                        }}
                    >
                        <Title order={4} size="h5" tt="uppercase" mb="xs">Desafio del día</Title>
                        <Text c="dimmed" mb="xs">Juega 3 partidas hoy para completar tu objetivo diario</Text>
                        <Progress
                            mb="xs"
                            value={(dailyMatches / 3) * 100}
                            color={dailyMatches >= 3 ? "teal" : "grape"}
                            animated={dailyMatches > 0 && dailyMatches < 3}
                        />
                        <Group justify="space-between">
                            <Text fw={900} size="sm" c="gray" tt="uppercase">
                                {dailyMatches}/3 Completadas
                            </Text>
                            <Text fw={900} size="sm" c="grape">
                                {Math.min(100, Math.round((dailyMatches / 3) * 100))}%
                            </Text>
                        </Group>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 7 }}>
                    <Title order={3} size="h4" mb="sm">Ranking Global</Title>
                    <Ranking limit={3} />
                    <Group justify="flex-end">
                        <Button
                            radius="xl"
                            variant="light"
                            color="cyan"
                            onClick={() => router.push("/ranking")}
                            mb={{ base: "md", md: "xs" }}
                        >
                            Ver Ranking
                        </Button>
                    </Group>
                </Grid.Col>
            </Grid>
        </SiteSection>
    );
}