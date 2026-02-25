"use client";

import { signIn } from "next-auth/react";
import { Card, Button, Text, Stack, Anchor } from "@mantine/core";
import { IconBrandGithub, IconBrandFacebook, IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";
import { SiteSection } from "@/components/SiteSection";
import { useMediaQuery } from "@mantine/hooks";

export default function LoginPage() {
    const isDesktop = useMediaQuery('(min-width: 64em)');

    const handleFacebookSignIn = () => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile) {
            // Intenta abrir la app nativa
            // Facebook usa su propio deep link para OAuth
            const callbackUrl = encodeURIComponent(`${window.location.origin}/playroom`);

            // Construye la URL del deep link de Facebook para login
            // Esto abre la app de Facebook para autenticación
            window.location.href = `fb://authorize`;

            // Fallback: si no abre la app en 2s, usa el flujo normal
            setTimeout(() => {
                signIn("facebook", { callbackUrl: "/playroom" });
            }, 2000);
        } else {
            signIn("facebook", { callbackUrl: "/playroom" });
        }
    };

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
                            size={isDesktop ? "md" : "lg"}
                            radius="xl"
                            leftSection={<IconBrandFacebook size={20} />}
                            onClick={handleFacebookSignIn}
                        >
                            Continuar con Facebook
                        </Button>

                        <Button
                            fullWidth
                            size="md"
                            radius="xl"
                            leftSection={<IconBrandGoogle size={20} />}
                            variant="filled"
                            color="red"
                            onClick={() => signIn("google", { callbackUrl: "/playroom" })}
                        >
                            Continuar con Google
                        </Button>

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