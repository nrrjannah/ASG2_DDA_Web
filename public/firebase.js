
// features: log in/sign up, log out and sign in to diff acct, email verification, leaderboard (?), user profile, locations pinned

//we are running the code in module mode
//this taps on the CDN version of the firebase SDK
import {
    initializeApp
} from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js';

//for realtime database
import {
    //determine which services you want to use
    getDatabase, ref, set, get, onValue, push, child, update, remove
} from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js';

//for auth
import {
    //determine which services you want to use
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,
    signOut
} from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js';

//Your web app's Firebase configuration

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyCHyaw0q7s7KdLUn15__S0_1flWcs88q-M",
    authDomain: "dda-project-test-1-caa72.firebaseapp.com",
    databaseURL: "https://dda-project-test-1-caa72-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dda-project-test-1-caa72",
    storageBucket: "dda-project-test-1-caa72.appspot.com",
    messagingSenderId: "16449942444",
    appId: "1:16449942444:web:3b793e3ea0e05683780009"
};

// Initialize Firebase
const app = initializeApp(FIREBASE_CONFIG);

//get a reference to the database service 
const db = getDatabase();
const playerRef = ref(db, "players");

//Working with Auth 
const auth = getAuth();

getPlayerData();
function getPlayerData() {
    //const playerRef = ref(db, "players");
    //PlayerRef is declared at the top using a constant
    //get(child(db,`players/`))
    get(playerRef)
        .then((snapshot) => {//retrieve a snapshot of the data using a callback
            if (snapshot.exists()) {//if the data exist
                try {
                    //let's do something about it
                    var content = "";
                    snapshot.forEach((childSnapshot) => {//looping through each snapshot

                        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

                        console.log("GetPlayerData: childkey " + childSnapshot.key);
                    });
                } catch (error) {
                    console.log("Error getPlayerData" + error);
                }
            }
        });
}//end getPlayerData

//Working with Auth -> const auth = getAuth();

//retrieve element from form
var frmCreateUser = document.getElementById("frmCreateUser");

//we create a button listener to listen when someone clicks
frmCreateUser.addEventListener("submit", function (e) {
    e.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    createUser(email, password);
    console.log("email" + email + "password" + password);

    var table = document.getElementById("firebasetable");
    var rows = table.getElementsByTagName("tr");
});

//create a new user based on email n password into Auth service
//user will get signed in
//userCredential is an object that gets
function createUser(email, password) {
    console.log("creating the user");
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            //signedin
            const user = userCredential.user;
            console.log("created user ... " + JSON.stringify(userCredential));

            console.log("User is now signed in ");
        }).catch((error) => {

            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`ErrorCode: ${errorCode} -> Message: ${errorMessage}`);
        });
}

// week 7 CREATE

//[STEP 1] Get our database reference
//=================================================
//const db = getDatabase();

//[STEP 2] Setup our Create using "set"
//=================================================
var currentTimestamp = new Date().getTime();
var playerData = {
 active: true,
 createdOn: currentTimestamp,
 displayName: "testPlayer",
 email: "someemail@email.com",
 lastLoggedIn: currentTimestamp,
 updatedOn: currentTimestamp,
 userName: "some user name",
 };

set(ref(db, `players/${userId}`), playerData);

onValue(playerRef, (snapshot) => {
    //const data = snapshot.val();
    updatePlayerContent(snapshot);
    });
   