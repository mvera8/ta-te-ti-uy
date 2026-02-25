import { Ranking } from "@/components/Ranking";
import { Container, Stack, Text, Title } from "@mantine/core";

export default function RankingPage() {
    return (
        <section>
            <Container size="sm" py="xl">
                <Stack gap="xs" mb="xl">
                    <Title order={1} ta="center">🏆 Ranking</Title>
                    <Text ta="center">Los mejores jugadores de Ta Te Ti Uy</Text>
                </Stack>
                <Ranking />
            </Container>
        </section>
    )
}