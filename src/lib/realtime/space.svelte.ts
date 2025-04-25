import { Realtime, } from "ably"
import Spaces, { type CursorUpdate } from "@ably/spaces";
import { PUBLIC_ABLYAPI } from "$env/static/public";
import type { SerializedLineType } from "$lib/components/canvas/canvas_controller.svelte";




interface UserType {
    id: string, // uuid
    username?: string,
    color: string;
    state: string
}

export interface CursorInfo {
    position: {
        x: number, y: number
    },
    data: {
        user: UserType,
        currentLine?: SerializedLineType | undefined
    }
}

export async function joinSpace(username: string | undefined, channelId: string, onCursorUpdate: (cursorEvent: CursorUpdate) => void, deleteEvent: (idsToDelete: string[]) => void, lineFinishEvent: (userId: string, line: SerializedLineType) => void, userLeaveEvent: (userId: string) => void) {

    const clientId = crypto.randomUUID();
    const realtimeClient = new Realtime({
        key: PUBLIC_ABLYAPI,
        clientId,

    });
    const spaces = new Spaces(realtimeClient,);

    const canvasSpace = await spaces.get(`canvas-space-${channelId}`, { cursors: { paginationLimit: 0, outboundBatchInterval: 0 }, offlineTimeout: 10, },);

    const user: UserType = {
        id: clientId,
        color: "",
        username: username ?? "",
        state: "pen"
    }
    await canvasSpace.enter({ ...user },);

    // live cursor update
    canvasSpace.cursors.subscribe("update", (e) => {
        if (e.clientId !== clientId) {
            onCursorUpdate(e);
        }
    });

    canvasSpace.members.subscribe("leave", (e) => {
        userLeaveEvent(e.clientId);
    })

    // delete
    const canvasChannel = realtimeClient.channels.get(`canvas-${channelId}`);

    // delete event
    canvasChannel.subscribe("deleteLines", (e) => {
        deleteEvent((e.data as string[]) ?? []);
    });

    canvasChannel.subscribe("newLine", (e) => {
        lineFinishEvent(e.clientId ?? "", e.data as SerializedLineType);
    })

    document.addEventListener("visibilitychange", async () => {
        // reconnect in case browser to sleep, on mobile especially.
        if (document.visibilityState === "visible") {

            if (realtimeClient.connection.state !== "connected") {
                realtimeClient.connection.connect();
                await canvasSpace.enter({ ...user });
            }

        }
    })


    return {
        canvasSpace,
        user,
        unsubscribe: () => {
            canvasSpace.leave();
            realtimeClient.close();
        },
        updateProfile: (name: string) => {
            canvasSpace.updateProfileData({
                ...user,
                username: name
            })
        },
        updateCursor: (x: number, y: number, user: UserType, currentLine?: SerializedLineType,) => {
            if (!user || !user.username || user.username.length === 0) {
                return;
            }

            canvasSpace.cursors.set({
                position: {
                    x, y
                }, data: {
                    user,
                    currentLine
                }
            })
        },
        async deleteLines(toDelete: string[]) {
            await canvasChannel.publish("deleteLines", toDelete);
        },
        async newLine(newLine: SerializedLineType) {
            await canvasChannel.publish("newLine", newLine);
        },
        async leave() {
            await canvasSpace.leave();
            setTimeout(() => {
                realtimeClient.close();
            }, 1000)
        }

    }
}