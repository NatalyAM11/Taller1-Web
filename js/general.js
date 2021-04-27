//firebase
const firebaseConfig = {
    apiKey: "AIzaSyCorqNP_uv4krxv33LMwAWAraEaEtyl4Mw",
    authDomain: "kylie-cosmetics-208ac.firebaseapp.com",
    projectId: "kylie-cosmetics-208ac",
    storageBucket: "kylie-cosmetics-208ac.appspot.com",
    messagingSenderId: "629586722107",
    appId: "1:629586722107:web:88f285dce23d3777f18b1e"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//database
const db = firebase.firestore();
const storage= firebase.storage();