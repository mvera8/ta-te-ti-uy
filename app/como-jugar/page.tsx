import { Container, Text, Title } from "@mantine/core";

export default function HowToPlayPage() {
    return (
        <section>
            <Container py="xl">
                <Title order={1}>
                    Cómo jugar
                </Title>

                <Text>Elige si quieres jugar con un amigo o con un oponente aleatorio.</Text>
                <Text>Si eliges jugar con un amigo, comparte el código de la sala con él.</Text>
                <Text>Si eliges jugar con un oponente aleatorio, espera a que se conecte.</Text>
                <Text>Elige si quieres ser X o O.</Text>
                <Text>Elige si quieres ser el primero o el segundo.</Text>
                <Text>Elige si quieres jugar con un oponente aleatorio.</Text>
            </Container>
        </section>
    )
}