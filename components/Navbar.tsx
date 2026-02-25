import { ActionIcon, Avatar, Button, Container, Group, Text, Burger, Drawer, Stack, Divider } from "@mantine/core"
import { useSession, signOut } from "next-auth/react"
import { useDisclosure, useMediaQuery } from "@mantine/hooks"
import Demo from "./Demo"
import Link from "next/link"
import { IconLogout } from "@tabler/icons-react"
import { Logo } from "./Logo"

const links = [
    { label: "Playroom", href: "/playroom" },
    { label: "Ranking", href: "/ranking" },
    { label: "Como jugar", href: "/como-jugar" },
]

export function Navbar() {
    const isDesktop = useMediaQuery('(min-width: 64em)');
    const { data: session } = useSession();
    const [opened, { toggle, close }] = useDisclosure(false);

    const items = links.map((link) => (
        <Link
            key={link.href}
            href={link.href}
            onClick={close}
            style={{ textDecoration: 'none' }}
        >
            <Button
                variant="subtle"
                color="gray"
                px="xs"
                fullWidth={opened}
                justify={opened ? "flex-start" : "center"}
            >
                {link.label}
            </Button>
        </Link>
    ));

    return (
        <header>
            <Container size="lg">
                <Group justify="space-between" py="md" gap={0}>
                    <Group gap="xs">
                        <Logo />
                        {session && (
                            <Group gap={5} visibleFrom="sm">
                                {items}
                            </Group>
                        )}
                    </Group>

                    <Group gap={1}>
                        {!session ? (
                            <>
                                <Demo />
                                <Link
                                    href="/login"
                                >
                                    <Button
                                        radius="xl"
                                        variant="filled"
                                        color="grape"
                                    >
                                        Ingresar
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/profile"
                                >
                                    <Button
                                        variant="default"
                                        size="sm"
                                        px="xs"
                                    >
                                        {isDesktop && <Text size="xs">{session.user?.name}</Text>}
                                        <Avatar src={session.user?.image} radius="xl" size="sm" ms={isDesktop ? "xs" : 0} />
                                    </Button>
                                </Link>

                                <Demo />
                                <ActionIcon
                                    onClick={() => signOut()}
                                    variant="transparent"
                                    color="gray"
                                    size="lg"
                                    aria-label="Logout"
                                >
                                    <IconLogout stroke={1.5} size={24} />
                                </ActionIcon>
                                <Burger
                                    opened={opened}
                                    onClick={toggle}
                                    hiddenFrom="sm"
                                    size="sm"
                                />
                            </>
                        )}
                    </Group>
                </Group>
            </Container>

            {session && (
                <Drawer
                    opened={opened}
                    onClose={close}
                    size="md"
                    padding="md"
                    title={<Logo />}
                    hiddenFrom="sm"
                    zIndex={1000}
                >
                    <Stack gap="xs">
                        <Divider />
                        {items}
                    </Stack>
                </Drawer>
            )}
        </header>
    )
}
