"use client";

import { signIn } from "next-auth/react";
import { Card, Button, Text, Stack, Anchor } from "@mantine/core";
import { IconBrandGithub, IconBrandFacebook } from "@tabler/icons-react";
import Link from "next/link";
import { SiteSection } from "@/components/SIteSection";

export default function LoginPage() {
    return (
        <SiteSection
            size="xs"
            title="Bienvenido"
            description="Inicia sesión para empezar a jugar y guardar tus estadísticas."
        >
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
        </SiteSection>
    );
}