"use client";

import { Container, Title, Stack, Avatar, Text, Card, Group, SimpleGrid, Button, Loader } from "@mantine/core";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const userStats = useQuery(api.users.getUserStats, session?.user?.email ? { tokenIdentifier: session.user.email } : "skip");

    if (status === "loading" || (session && userStats === undefined)) {
        return (
            <Container mt={100} align="center">
                <Loader size="xl" />
            </Container>
        );
    }

    if (!session) {
        return (
            <Container mt={100} align="center">
                <Title>No has iniciado sesión</Title>
                <Button mt="md" component={Link} href="/playroom">Volver</Button>
            </Container>
        );
    }

    const stats = userStats || { wins: 0, losses: 0, draws: 0, totalGames: 0 };

    return (
        <Container size="sm" mt="xl">
            <Stack align="center" gap="xl">
                <Avatar src={session.user?.image} size={120} radius={100} />
                <Title>{session.user?.name}</Title>
                <Text c="dimmed">{session.user?.email}</Text>

                <SimpleGrid cols={2} w="100%">
                    <Card withBorder radius="md" padding="md">
                        <Stack align="center" gap={0}>
                            <Text size="xs" tt="uppercase" fw={700} c="dimmed">Victorias</Text>
                            <Text size="xl" fw={700} c="green">{stats.wins}</Text>
                        </Stack>
                    </Card>
                    <Card withBorder radius="md" padding="md">
                        <Stack align="center" gap={0}>
                            <Text size="xs" tt="uppercase" fw={700} c="dimmed">Derrotas</Text>
                            <Text size="xl" fw={700} c="red">{stats.losses}</Text>
                        </Stack>
                    </Card>
                    <Card withBorder radius="md" padding="md">
                        <Stack align="center" gap={0}>
                            <Text size="xs" tt="uppercase" fw={700} c="dimmed">Empates</Text>
                            <Text size="xl" fw={700} c="gray">{stats.draws}</Text>
                        </Stack>
                    </Card>
                    <Card withBorder radius="md" padding="md">
                        <Stack align="center" gap={0}>
                            <Text size="xs" tt="uppercase" fw={700} c="dimmed">Total Jugadas</Text>
                            <Text size="xl" fw={700} c="blue">{stats.totalGames}</Text>
                        </Stack>
                    </Card>
                </SimpleGrid>

                <Button fullWidth size="lg" component={Link} href="/playroom">
                    Ir a jugar 🎮
                </Button>
            </Stack>
        </Container>
    );
}
