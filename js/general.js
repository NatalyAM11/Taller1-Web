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


const hamburgerBtn=document.querySelector ('.nav__hamburger');
const navOptions=document.querySelector('.nav__options');
const navD=document.querySelector('.nav__desaparecer');

///////interaction nav responsive
//transition when the options of the hamburguer menu appears
function handleNavEffect(){
  navOptions.style.opacity=1;
}

/////options of the nav appears when click the hamburguer menu
function handleNavAppear(){
  
  //Add the class "nav__disappear" to make the nav's options appear
  navOptions.classList.toggle('nav__disappear');

  //transition
  navOptions.style.opacity=0.6;
  setTimeout(handleNavEffect,50);
}

hamburgerBtn.addEventListener('click', handleNavAppear);