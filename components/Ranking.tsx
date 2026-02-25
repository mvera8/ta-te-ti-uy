"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Table, Avatar, Group, Text, Card, Loader, Stack, ThemeIcon } from "@mantine/core";
import { IconRosetteFilled } from "@tabler/icons-react";

interface RankingProps {
    limit?: number;
}

export function Ranking({ limit = 1000 }: RankingProps) {
    const ranking = useQuery(api.users.getRanking, { limit });

    if (ranking === undefined) return <Card withBorder p="xl" radius="md" shadow="sm" mb="md">
        <Stack gap="xl" align="center">
            <Loader />
        </Stack>
    </Card>;

    return (
        <Card withBorder p="xl" radius="md" shadow="sm" mb="md">
            <Table highlightOnHover verticalSpacing="sm">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th w={40}></Table.Th>
                        <Table.Th w={40}>#</Table.Th>
                        <Table.Th>Usuario</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Victorias</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Derrotas</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Puntos</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {ranking.map((user, index) => (
                        <Table.Tr key={user._id}>
                            <Table.Td>
                                <ThemeIcon
                                    radius="xl"
                                    variant="light"
                                    color={index === 0 ? "yellow" : index === 1 ? "gray" : index === 2 ? "brown" : "blue"}
                                >
                                    <IconRosetteFilled style={{ width: '70%', height: '70%' }} />
                                </ThemeIcon>
                            </Table.Td>
                            <Table.Td>
                                <Text fw={700}>
                                    {index + 1}
                                </Text>
                            </Table.Td>
                            <Table.Td>
                                <Group gap="sm">
                                    <Avatar
                                        src={user.image}
                                        radius="xl"
                                        size="sm"
                                        imageProps={{ loading: "lazy" }}
                                    />
                                    <Text size="sm" fw={500}>
                                        {user.name || "Jugador"}
                                    </Text>
                                </Group>
                            </Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>{user.wins}</Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>{user.losses}</Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>
                                <Text fw={700} c="blue">
                                    {user.wins * 3}
                                </Text>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                    {ranking.length === 0 && (
                        <Table.Tr>
                            <Table.Td colSpan={5} align="center">No hay datos aún 😅</Table.Td>
                        </Table.Tr>
                    )}

                </Table.Tbody>
            </Table>
        </Card>
    );
}
