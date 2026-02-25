import { Card, Title, Text } from "@mantine/core";

export default function CardNumber({ number, title, prefix, style }: { number: number | string, title: string, prefix?: string, style?: React.CSSProperties }) {
    return (
        <Card
            p="lg"
            radius="md"
            shadow="sm"
            style={style}
            withBorder
        >
            <Title order={3} size="h2" tt="uppercase" mb="md">
                {prefix}{number}
            </Title>
            <Text c="dimmed" size="sm">
                {title}
            </Text>
        </Card>
    )
}