import { getApp, getApps, initializeApp } from 'firebase/app'
import { doc, DocumentReference, getDoc, getFirestore, setDoc } from 'firebase/firestore'

const config = {
    apiKey: "AIzaSyAJmmfRZW5iwGpfj2GcNm-8QlNFQI7KWWk",
    authDomain: "personal-382ea.firebaseapp.com",
    projectId: "personal-382ea",
    storageBucket: "personal-382ea.firebasestorage.app",
    messagingSenderId: "102214532802",
    appId: "1:102214532802:web:063e04e739214612fdc55b"
}

const fbApp = initializeApp(config, 'suikaApp')
const db = getFirestore(fbApp)

export const docRef : DocumentReference[] = []

export const getFbDoc = (collectionId: string, documentId: string) => 
{
    docRef.push(doc(db, collectionId, documentId))
    return docRef.length - 1
}

export const retrieveFbDoc = async (docId: number) => 
{
    const dSnap = await getDoc(docRef[docId])
    
    return dSnap
}

export const setFbDoc = async (docId: number, data:any) => 
{
    try{
        await setDoc(docRef[docId], data)
    } catch (e) {
        console.error("leaderboard update error!");
    }
}