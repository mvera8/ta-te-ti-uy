"use client";

import { signIn } from "next-auth/react";
import { Container, Card, Title, Button, Text, Stack, Anchor, Center } from "@mantine/core";
import { IconBrandGithub, IconBrandFacebook } from "@tabler/icons-react";
import Link from "next/link";

export default function LoginPage() {
    return (
        <section>
            <Container size="xs" w="100%" my="xl">
                <Stack gap="xs" mb="xl">
                    <Title order={1} ta="center">Bienvenido</Title>
                    <Text c="dimmed" size="sm" ta="center">
                        Inicia sesión para empezar a jugar y guardar tus estadísticas.
                    </Text>
                </Stack>
                <Card withBorder p="xl" radius="md" shadow="sm" mb="md">
                    <Stack gap="xl" align="center">


                        <Stack gap="sm">
                            <Button
                                fullWidth
                                size="md"
                                radius="xl"
                                leftSection={<IconBrandGithub size={20} />}
                                variant="filled"
                                color="black"
                                onClick={() => signIn("github", { callbackUrl: "/playroom" })}
                            >
                                Continuar con GitHub
                            </Button>

                            <Button
                                fullWidth
                                size="md"
                                radius="xl"
                                leftSection={<IconBrandFacebook size={20} />}
                                color="#1877F2"
                                onClick={() => signIn("facebook", { callbackUrl: "/playroom" })}
                            >
                                Continuar con Facebook
                            </Button>
                        </Stack>

                        <Text size="xs" c="dimmed" ta="center" px="xl">
                            Al continuar, aceptas nuestros{" "}
                            <Anchor component={Link} href="/terms" size="xs">
                                Términos y Condiciones
                            </Anchor>{" "}
                            y nuestra{" "}
                            <Anchor component={Link} href="/privacy" size="xs">
                                Política de Privacidad
                            </Anchor>.
                        </Text>
                    </Stack>
                </Card>
            </Container>
        </section>
    );
}