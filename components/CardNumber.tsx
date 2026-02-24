import { Card, Title, Text } from "@mantine/core";

export default function CardNumber({ number, title, prefix }: { number: number | string, title: string, prefix?: string }) {
    return (
        <Card withBorder p="lg" radius="md" shadow="sm">
            <Title order={3} size="h2" tt="uppercase" mb="md">
                {prefix}{number}
            </Title>
            <Text c="dimmed" size="sm">
                {title}
            </Text>
        </Card>
    )
}