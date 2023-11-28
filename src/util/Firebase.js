import * as  initializeApp  from "firebase/app"
import * as getAnalytics  from "firebase/analytics"


export class Firebase {

    constructor(){

        this.init();

    }



init(){
    
    if (!window._initializedFirebase) {

        const firebaseConfig = {
            apiKey: "AIzaSyC9015w86T8GTs5UzeeqwDAv5dTCQZfRfc",
            authDomain: "whatsapp-clone-b01fd.firebaseapp.com",
            projectId: "whatsapp-clone-b01fd",
            storageBucket: "whatsapp-clone-b01fd.appspot.com",
            messagingSenderId: "111217002329",
            appId: "1:111217002329:web:fa73760e06781bab036e48",
            measurementId: "G-9N378TQG71"
          };

        firebaseConfig.firestore().settings({
            timestampsInSnapshots: true
        });

        window._initializedFirebase = true;
       
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app); 

        firebaseConfig.firestore().settings({
            timestampsInSnapshots: true
        });

        this._initialized = true;

    }
    
}

static db(){

    return firebaseConfig.firestore();

}

static hd(){

    return firebaseConfig.storage();

}

initAuth(){

    return new Promise((s, f)=>{

        let provider = new firebaseConfig.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
        .then(result => {

            let token = result.credential.acessToken;
            let user = result.user;

            s({
                user, 
                token
            });

        })
        .catch(err=>{
            f(err);
        }) //signInWithPopup = qual o provedor que vai funcionar o firebase

    });

}

}

