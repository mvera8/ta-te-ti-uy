"use client";

import { useSession } from "next-auth/react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";

export function ConvexUserSynchronizer() {
    const { data: session } = useSession();
    const storeUser = useMutation(api.users.storeUser);

    useEffect(() => {
        const user = session?.user;
        if (user?.email) {
            const syncUser = async () => {
                try {
                    await storeUser({
                        tokenIdentifier: user.email!,
                        name: user.name ?? undefined,
                        email: user.email ?? undefined,
                        image: user.image ?? undefined,
                    });
                } catch (error) {
                    console.error("Error syncing user to Convex:", error);
                }
            };
            syncUser();
        }
    }, [session, storeUser]);

    return null;
}

