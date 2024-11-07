import { isBrowser } from "@builder.io/qwik/build";
import { getFirebase } from "./use-firebase";


export const getAbout = async () => {
    console.log("in getAbout");
    if (isBrowser) {

        console.log("isBrowser");
        const { auth } = await getFirebase();
        console.log("Auth: ", auth);

        if (!auth?.currentUser) {
            throw 'Not Logged in!';
        }

        const token = await auth.currentUser.getIdToken();
        console.log("idtoken: ", token);

        console.log("calling fetch /about");
        const result = await fetch('/about/', {
            method: 'POST',
            body: '',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        console.log("fetch about result: ", result );

        if (!result.ok) {
            const e = await result.json();
            console.error(e);
            return null;
        }

        const about = await result.json();
        console.log("about from json; ", about);
        
        return about.data as AboutDoc;
    }

    return null;
};
