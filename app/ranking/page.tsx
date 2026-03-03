import Ads from "@/components/Ads";
import { Ranking } from "@/components/Ranking";
import { SiteSection } from "@/components/SiteSection";
import { Text } from "@mantine/core";

export default function RankingPage() {
    return (
        <SiteSection
            size="sm"
            title="🏆 Ranking"
            description="Los mejores jugadores de Ta Te Ti Uy"
        >
            <Ads />
            <Ranking />
            <Text c="dimmed" size="xs" ta="center">Los empates no suman puntos.</Text>
        </SiteSection>
    )
}