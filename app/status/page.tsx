"use client"

import { useEffect, useState } from "react";
import { Card, Title, SimpleGrid } from "@mantine/core";
import { useQuery, useConvexConnectionState } from "convex/react";
import { api } from "@/convex/_generated/api";
import StatusBadge from "@/components/StatusBadge";
import { useNetwork } from "@mantine/hooks";
import { SiteSection } from "@/components/SIteSection";

type Status = "loading" | "online" | "offline";

function useHttpPing(url: string): Status {
    const [status, setStatus] = useState<Status>("loading");

    useEffect(() => {
        fetch(url)
            .then((res) => setStatus(res.ok ? "online" : "offline"))
            .catch(() => setStatus("offline"));
    }, [url]);

    return status;
}

function ConvexStatus() {
    const result = useQuery(api.health.ping);

    if (result === undefined) return <StatusBadge status="loading" />;
    return <StatusBadge status={result?.ok ? "online" : "offline"} />;
}

function ConvexRealtimeStatus() {
    const { isWebSocketConnected } = useConvexConnectionState();

    if (isWebSocketConnected === undefined) return <StatusBadge status="loading" />;
    return <StatusBadge status={isWebSocketConnected ? "online" : "offline"} />;
}

export default function StatusPage() {
    const networkStatus = useNetwork();
    const serverStatus = useHttpPing("/api/health");
    const authStatus = useHttpPing("/api/auth/providers");

    return (
        <SiteSection title="Status">
            <SimpleGrid cols={{ base: 1, md: 2 }}>
                <Card withBorder>
                    <Title order={2} mb="xs">Tu Conexión</Title>
                    <StatusBadge status={networkStatus.online ? "online" : "offline"} />
                </Card>

                <Card withBorder>
                    <Title order={2} mb="xs">Servidor</Title>
                    <StatusBadge status={serverStatus} />
                </Card>

                <Card withBorder>
                    <Title order={2} mb="xs">Base de Datos</Title>
                    <ConvexStatus />
                </Card>

                <Card withBorder>
                    <Title order={2} mb="xs">Realtime (WebSocket)</Title>
                    <ConvexRealtimeStatus />
                </Card>

                <Card withBorder>
                    <Title order={2} mb="xs">Auth</Title>
                    <StatusBadge status={authStatus} />
                </Card>
            </SimpleGrid>
        </SiteSection>
    );
}