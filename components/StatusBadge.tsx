"use client";

import { Loader, Badge } from "@mantine/core";

type Status = "loading" | "online" | "offline";

export default function StatusBadge({ status }: { status: Status }) {
    if (status === "loading") return <Loader size="xs" />;
    return (
        <Badge color={status === "online" ? "green" : "red"}>
            {status === "online" ? "Online" : "Offline"}
        </Badge>
    );
}
