"use client";

import { Container, Title, Stack, Avatar, Text, Card, SimpleGrid, Button, Loader, ActionIcon } from "@mantine/core";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconChevronLeft } from "@tabler/icons-react";
import CardNumber from "@/components/CardNumber";
import { SiteSection } from "@/components/SIteSection";

export default function ProfilePage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const userStats = useQuery(api.users.getUserStats, session?.user?.email ? { tokenIdentifier: session.user.email } : "skip");

    if (status === "loading" || (session && userStats === undefined)) {
        return (
            <Container>
                <Loader size="xl" />
            </Container>
        );
    }

    if (!session) {
        return (
            <Container size="xs" w="100%" my="xl">
                <Card withBorder p="xl" radius="md" shadow="sm" mb="md">
                    <Stack gap="xl" align="center">
                        <Title order={1} ta="center">No has iniciado sesión</Title>
                        <Stack gap="sm">
                            <Link href="/playroom">
                                <Button mt="md">Volver</Button>
                            </Link>
                        </Stack>
                    </Stack>
                </Card>
            </Container>
        );
    }

    const stats = userStats || { wins: 0, losses: 0, draws: 0, totalGames: 0 };

    return (
        <SiteSection size="sm">
            <Card
                radius="md"
                p="lg"
                withBorder
                ta="center"
                mb="md"
            >
                <ActionIcon
                    variant="default"
                    size="lg"
                    radius="xl"
                    aria-label="Back"
                    onClick={() => router.back()}
                >
                    <IconChevronLeft style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
                <Avatar src={session.user?.image} size={120} radius={100} mx="auto" mb="md" />
                <Title>{session.user?.name}</Title>
                <Text c="dimmed">{session.user?.email}</Text>
            </Card>

            <SimpleGrid cols={{ base: 2, lg: 4 }} w="100%" mb="md">
                <CardNumber number={stats.wins} title="Victorias" />
                <CardNumber number={stats.losses} title="Derrotas" />
                <CardNumber number={stats.draws} title="Empates" />
                <CardNumber number={stats.totalGames} title="Total Jugadas" />
            </SimpleGrid>
        </SiteSection>
    );
}
