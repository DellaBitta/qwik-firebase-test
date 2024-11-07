// import your .env variable
// PUBLIC_FIREBASE_CONFIG={YOUR FIREBASE CONFIG}
// make sure the Firebase keys are in Quotes ""
const firebase_config = JSON.parse(
    import.meta.env.PUBLIC_FIREBASE_CONFIG
);

//const importFirestoreLite = async () => await import('firebase/firestore/lite');
//const importFirebaseApp = async () => await import('firebase/app');
//const importFirebaseAuth = async () => await import('firebase/auth');
import { initializeServerApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';



export const firebaseServer = async (request: Request) => {

    const authIdToken = request.headers.get('Authorization')?.split('Bearer ')[1];

    
    console.log("AuthIdToken in request ", authIdToken);
    //const firebaseApp = await importFirebaseApp();
    //const firebaseAuth = await importFirebaseAuth();


    //const serverApp = firebaseApp.initializeServerApp(firebase_config, {
    const serverApp = initializeServerApp(firebase_config, {
        authIdToken
    });
    console.log("serverApp: ", serverApp);


    //const serverAuth = firebaseAuth.getAuth(serverApp);
    const serverAuth = getAuth(serverApp);
    console.log("serverAuth: ", serverAuth);
    await serverAuth.authStateReady();

    //const firestoreLite = await importFirestoreLite();
    //const serverDB = firestoreLite.getFirestore(serverApp);
    const serverDB = getFirestore(serverApp);

    return {
        serverAuth,
        serverDB
    };
};