import { Group, ThemeIcon, Title } from "@mantine/core";
import { IconTicTac } from "@tabler/icons-react";
import Link from "next/link";

const name = "TaTeTi.uy";

export function Logo() {
    return (
        <Link
            href="/"
            style={{ textDecoration: 'none' }}
        >
            <Group gap={5}>
                <ThemeIcon
                    variant="transparent"
                    size="lg"
                    aria-label={name}
                >
                    <IconTicTac color="var(--mantine-color-grape-5)" size={35} stroke={1.5} />
                </ThemeIcon>
                <Title order={2} c="gray">{name}</Title>
            </Group>
        </Link>
    )
}