

import { Line } from "$lib/components/canvas/canvas_controller.svelte";


import { deleteField, doc, getDoc, setDoc, Timestamp, updateDoc, increment, getDocs, Query, query, collection, arrayUnion, deleteDoc, arrayRemove } from "@firebase/firestore/lite";
import { db } from "./client";

import { getSixDigitId, rngParams } from "$lib/firebase/rng.ts";


export interface FirebaseLine {
    id: string;
    color: string;
    createdOn: Timestamp;
    thickness: number;
    layer: number,
    points: { x: number, y: number }[]
}

export async function fetchLines(lobbyId: string) {
    const lineDocRef = doc(db, `lobby/${lobbyId}`);
    const lineDoc = await getDoc(lineDocRef);

    if (lineDoc.exists()) {
        return lineDoc.data()["lines"] as { [id: string]: FirebaseLine };
    }
    console.error('attempted to fetch lobby that doesnt exists');
    return {} as { [id: string]: FirebaseLine };

}

export async function uploadLines(lobbyId: string, lines: FirebaseLine[]) {
    const lineDocRef = doc(db, `lobby/${lobbyId}`);
    const lineDoc = await getDoc(lineDocRef);

    if (!lineDoc.exists()) {
        return;
    }

    const update: { [fieldName: string]: any } = { lines: {} };

    for (const line of lines) {
        update[`lines`][line.id] = line;
    }

    setDoc(lineDocRef, update, { merge: true })
}


export async function deleteLines(lobbyId: string, lineIds: string[]) {
    const lineDocRef = doc(db, `lobby/${lobbyId}`);
    const lineDoc = await getDoc(lineDocRef);

    if (!lineDoc.exists()) {
        return;
    }
    const update: { [fieldName: string]: any } = { lines: {} };

    for (const id of lineIds) {
        update[`lines`][id] = deleteField();
    }

    setDoc(lineDocRef, update, { merge: true })
}


export async function createLobby() {
    const docRef = doc(db, 'globals/lobbyIndex');

    await updateDoc(docRef, {
        index: increment(1)
    });

    const result = await getDoc(docRef);

    if (result) {
        const id = getSixDigitId(result.data()!['index'], rngParams);

        await setDoc(
            doc(db, `lobby/${id}`),
            {
                lines: {}
            }
        )

        await updateDoc(doc(db, `globals/lobbyIds`), {
            lobbyIds: arrayUnion(id)
        })

        return id;
    }
    return '000000'
}

export async function checkLobbyExist(lobbyId: string) {
    const docRef = doc(db, `lobby/${lobbyId}`);
    return (await getDoc(docRef)).exists();
}

export async function getLobbyList() {
    const lobbyIdsDoc = (await getDoc(doc(db, 'globals/lobbyIds'))).data()
    if (lobbyIdsDoc) {
        const lobbyIds: string[] = lobbyIdsDoc['lobbyIds'];
        console.log('lobbyids', lobbyIds);
        
        return lobbyIds;
    }

    return [];
}

export async function deleteLobby(lobbyId: string) {
    deleteDoc(doc(db, `lobby/${lobbyId}`));
    updateDoc(doc(db, `globals/lobbyIds`), {
        lobbyIds: arrayRemove(lobbyId)
    })
}


export class CanvasFirebaseController {

    additionQueue: Line[] = [];
    deletionQueue: string[] = [];

    lastUpdateTime: number = 0;
    updateThreshold: number = 2000;

    lobbyId: string | undefined = undefined;

    constructor(lobbyId: string | undefined) {
        this.lobbyId = lobbyId;
    }

    updateLobbyId(newId: string) {
        this.lobbyId = newId;
        this.additionQueue.length = 0;
        this.deletionQueue.length = 0;
    }


    async fullFetch() {
        if (!this.lobbyId) {
            return [];
        }

        const lines: { [id: string]: FirebaseLine } = await fetchLines(this.lobbyId);

        const out: Line[] = [];

        // convert Firebase line to line
        for (const line of Object.values(lines)) {
            out.push(
                Line.deserialize({
                    id: line.id,
                    color: line.color,
                    thickness: line.thickness,
                    points: line.points.map(item => [item.x, item.y]),
                    layer: line.layer
                }, true)
            )
        }

        return out;
    }


    update(t: number) {
        if (!this.lobbyId) {
            return;
        }

        const delta = t - this.lastUpdateTime;
        if (delta < this.updateThreshold) {
            return;
        }

        this.lastUpdateTime = t;

        if (this.additionQueue.length > 0) {
            // upload
            uploadLines(this.lobbyId, this.additionQueue.map(item => {
                return {
                    id: item.id,
                    color: item.color,
                    createdOn: Timestamp.now(),
                    thickness: item.thickness,
                    points: item.points.map(p => p.toObj()),
                    layer: item.layer
                }
            }))
            this.additionQueue.length = 0;
        }


        if (this.deletionQueue.length > 0) {
            deleteLines(this.lobbyId ?? '000000', this.deletionQueue);
            this.deletionQueue.length = 0;
        }
    }



}