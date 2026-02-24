import { Ranking } from "@/components/Ranking";
import { Container, Stack, Text, Title } from "@mantine/core";

export default function RankingPage() {
    return (
        <section>
            <Container size="xs" py="xl">
                <Stack gap="xs" mb="xl">
                    <Title order={1} ta="center">🏆 Ranking</Title>
                </Stack>
                <Ranking />
            </Container>
        </section>
    )
}