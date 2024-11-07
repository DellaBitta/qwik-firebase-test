// import your .env variable
// PUBLIC_FIREBASE_CONFIG={YOUR FIREBASE CONFIG}
// make sure the Firebase keys are in Quotes ""
const firebase_config = JSON.parse(
    import.meta.env.PUBLIC_FIREBASE_CONFIG
);

//const importFirestoreLite = async () => await import('firebase/firestore/lite');
//const importFirebaseApp = async () => await import('firebase/app');
//const importFirebaseAuth = async () => await import('firebase/auth');
import { initializeServerApp, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';


const logAuthStuff = async (authIdToken: string) => {
    console.log("logAuthStuff");
    setTimeout(async () => {
        console.log("setTimeout");
        const serverApp = initializeServerApp(firebase_config, {
            authIdToken
        });
        console.log("serverApp: ", serverApp);

        const app = initializeApp(firebase_config);
        console.log("attempting to create regular auth");
        const auth = getAuth(app);
        console.log("regular auth: ", auth);

        console.log("attempting to create server auth");
        //const serverAuth = firebaseAuth.getAuth(serverApp);
        const serverAuth = getAuth(serverApp);
        console.log("serverAuth: ", serverAuth);
        await serverAuth.authStateReady();

        //const firestoreLite = await importFirestoreLite();
        //const serverDB = firestoreLite.getFirestore(serverApp);
        const serverDB = getFirestore(serverApp);
        console.log("ServerDB: ", serverDB);
        return;
    }, 10);
}
export const firebaseServer = async (request: Request): Promise<void> => {

    const authIdToken = request.headers.get('Authorization')?.split('Bearer ')[1];
    /*
    
        console.log("AuthIdToken in request ", authIdToken);
        //const firebaseApp = await importFirebaseApp();
        //const firebaseAuth = await importFirebaseAuth();
    
    
        //const serverApp = firebaseApp.initializeServerApp(firebase_config, {
    
        console.log("Config: ", firebase_config);
        await logAuthStuff(authIdToken? authIdToken : "");
        console.log("logAuthStuff returned");
    
        const serverApp = initializeServerApp(firebase_config, {
            authIdToken
        });
        console.log("serverApp: ", serverApp);
    
        const app = initializeApp(firebase_config);
        console.log("app: ", app);
        console.log("attempting to create regular auth");
        const auth = getAuth(app);
        console.log("regular auth: ", auth);
    
        console.log("attempting to create server auth");
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
        };*/

    const resultPromise = new Promise<void>(function (resolve) {
        setTimeout(async () => {
            console.log("setTimeout");
            const serverApp = initializeServerApp(firebase_config, {
                authIdToken
            });
            console.log("serverApp: ", serverApp);

            const app = initializeApp(firebase_config);
            console.log("attempting to create regular auth");
            const auth = getAuth(app);
            console.log("regular auth: ", auth);

            console.log("attempting to create server auth");
            //const serverAuth = firebaseAuth.getAuth(serverApp);
            const serverAuth = getAuth(serverApp);
            console.log("serverAuth: ", serverAuth);
            await serverAuth.authStateReady();

            //const firestoreLite = await importFirestoreLite();
            //const serverDB = firestoreLite.getFirestore(serverApp);
            const serverDB = getFirestore(serverApp);
            console.log("ServerDB: ", serverDB);
            resolve();
        }, 1);
    });

    return resultPromise;

};