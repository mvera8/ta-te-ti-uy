"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Table, Avatar, Group, Text, Card, Title, Loader, Stack } from "@mantine/core";

export function Ranking() {
    const ranking = useQuery(api.users.getRanking);

    if (ranking === undefined) return <Loader />;

    return (
        <Card withBorder p="xl" radius="md" shadow="sm" mb="md">
            <Table highlightOnHover verticalSpacing="sm">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th w={40}>#</Table.Th>
                        <Table.Th>Usuario</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Victorias</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Partidas</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {ranking.map((user, index) => (
                        <Table.Tr key={user._id}>
                            <Table.Td>
                                <Text fw={700} c={index === 0 ? "yellow" : index === 1 ? "gray" : index === 2 ? "brown" : undefined}>
                                    {index + 1}
                                </Text>
                            </Table.Td>
                            <Table.Td>
                                <Group gap="sm">
                                    <Avatar src={user.image} radius="xl" size="sm" />
                                    <Text size="sm" fw={500}>
                                        {user.name || "Jugador"}
                                    </Text>
                                </Group>
                            </Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>{user.wins}</Table.Td>
                            <Table.Td style={{ textAlign: "center" }}>{user.totalGames}</Table.Td>
                        </Table.Tr>
                    ))}
                    {ranking.length === 0 && (
                        <Table.Tr>
                            <Table.Td colSpan={4} align="center">No hay datos aún 😅</Table.Td>
                        </Table.Tr>
                    )}
                </Table.Tbody>
            </Table>
        </Card>
    );
}
