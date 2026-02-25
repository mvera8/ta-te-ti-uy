import { Container, Stack, Text, Title } from "@mantine/core"

export const SiteSection = ({ children, title, description, size = "lg" }: { title?: string, description?: string, children: React.ReactNode, size?: "xs" | "sm" | "md" | "lg" }) => {
    return (
        <section>
            <Container
                size={size}
                pb="xl"
                py={{
                    base: 0,
                    md: "xl"
                }}
                style={{ position: "relative" }}
            >
                {title && <Stack gap="xs" mb="xl">
                    <Title order={1} ta="center">{title}</Title>
                    {description && <Text c="dimmed" size="sm" ta="center">{description}</Text>}
                </Stack>}
                {children}
            </Container>
        </section>
    )
}