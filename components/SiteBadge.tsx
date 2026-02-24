import { Badge } from "@mantine/core";

export default function SiteBadge({ text }: { text: string }) {
    return (
        <Badge
            variant="light"
            color="grape"
            size="lg"
            radius="xl"
            mb="xs"
        >
            {text}
        </Badge>
    )
}