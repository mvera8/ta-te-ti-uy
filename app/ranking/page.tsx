import { Ranking } from "@/components/Ranking";
import { SiteSection } from "@/components/SIteSection";

export default function RankingPage() {
    return (
        <SiteSection
            size="sm"
            title="🏆 Ranking"
            description="Los mejores jugadores de Ta Te Ti Uy"
        >
            <Ranking />
        </SiteSection>
    )
}