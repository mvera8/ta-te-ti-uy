import { Button, Container, Group } from "@mantine/core"
import Link from "next/link"

const links = [
    { label: "Terminos", href: "/terms" },
    { label: "Privacidad", href: "/privacy" },
    { label: "Como jugar", href: "/como-jugar" },
    { label: "Status", href: "/status" },
];

export default function Footer() {
    return (
        <footer>
            <Container py="md">
                <Group justify="center" gap="xs">
                    {links.map((link) => (
                        <Link key={link.href} href={link.href}>
                            <Button
                                radius="xl"
                                variant="subtle"
                                color="gray"
                                size="xs"
                            >
                                {link.label}
                            </Button>
                        </Link>
                    ))}
                </Group>
            </Container>
        </footer>
    )
}