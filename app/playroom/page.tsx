import { auth } from "@/auth";
import PlayroomClient from "@/app/playroom/PlayroomClient";

export default async function Playroom() {
    const session = await auth();

    if (!session) {
        return <div>No autorizado</div>;
    }

    return <PlayroomClient user={session.user ?? {}} />;
}