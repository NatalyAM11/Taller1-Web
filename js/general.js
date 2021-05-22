
//////firebase
const firebaseConfig = {
  apiKey: "AIzaSyCorqNP_uv4krxv33LMwAWAraEaEtyl4Mw",
  authDomain: "kylie-cosmetics-208ac.firebaseapp.com",
  projectId: "kylie-cosmetics-208ac",
  storageBucket: "kylie-cosmetics-208ac.appspot.com",
  messagingSenderId: "629586722107",
  appId: "1:629586722107:web:88f285dce23d3777f18b1e"
};

//nav 
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


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//database
const db = firebase.firestore();
const storage= firebase.storage();

let loggedUser= null;

const setLoggedUser= (info, id)=>{
  loggedUser=info;
  loggedUser.uid=id;

  //user is logged
  userAuthChanged(true);

  handleModalDisappear();

  //make sure the variable exists
  if(typeof checkProductFormAdmin!== 'undefined') checkProductFormAdmin();
}

 
firebase.auth().onAuthStateChanged((user) => {

  if (user) {
    console.log(user);

    db.collection('users').doc(user.uid).get().then(function(doc){
      if(!doc.data()) return;
      setLoggedUser(doc.data(), user.uid);
    });

    getMyCart(user.uid);
    
  } else {
    // User is signed out
    userAuthChanged(false);
    loggedUser=null;

    cart=[];

    cartIconNumber.forEach(icon =>{
      icon.innerText=" ";
    });

  }
});


//////cart

let cart= [];

const cartIconNumber= document.querySelectorAll('.cartIcon span');

const cartFromLS= localStorage.getItem('store__cart');


const cartCollection=db.collection('cart');
const ordersCollection=db.collection('orders');

const addToMyCart= (product)=>{

  const sameId=cart.find(item=>{
    return item.id===product.id
  });

  if(sameId!=null){
    
    console.log(sameId.amount);
 

    cart[cart.findIndex(item=>item.id===sameId.id)]={
      ...sameId,
      amount:sameId.amount+=product.amount
    }

    cartCollection.doc(loggedUser.uid).set(
      {
        cart   
      }
    )
    //console.log(newAmount);
 

  }else{
    cart.push(product);
  }
  
    //Update all the cart in firebase
    cartCollection.doc(loggedUser.uid).set({    
      cart
    });
  
    //add the number to the spam of the cart icon
    cartIconNumber.forEach(icon =>{
        icon.innerText=cart.length;
    });
}



let renderCart= null;

const getMyCart=(uid)=>{
      cartCollection.doc(uid).get().then(snapShot=>{
        const data=snapShot.data();
        console.log(data);
        if(!data)return;

        cartIconNumber.forEach(icon =>{
          icon.innerText=data.cart.length;
        });

        cart=data.cart;

        if(renderCart){
          renderCart();
        }
        
  });
}


const sameProduct=(idProduct)=>{
    
    cartCollection.doc(loggedUser.uid).get().then(snapShot=>{
      const data=snapShot.data();
      console.log(data);
      if(!data)return;

  });
}



/*//////firebase
const firebaseConfig = {
  apiKey: "AIzaSyCorqNP_uv4krxv33LMwAWAraEaEtyl4Mw",
  authDomain: "kylie-cosmetics-208ac.firebaseapp.com",
  projectId: "kylie-cosmetics-208ac",
  storageBucket: "kylie-cosmetics-208ac.appspot.com",
  messagingSenderId: "629586722107",
  appId: "1:629586722107:web:88f285dce23d3777f18b1e"
};

//nav 
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


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//database
const db = firebase.firestore();
const storage= firebase.storage();

let loggedUser= null;

const setLoggedUser= (info, id)=>{
  loggedUser=info;
  loggedUser.uid=id;

  //user is logged
  userAuthChanged(true);

  handleModalDisappear();

  //make sure the variable exists
  if(typeof checkProductFormAdmin!== 'undefined') checkProductFormAdmin();
}

 
firebase.auth().onAuthStateChanged((user) => {

  if (user) {
    console.log(user);

    db.collection('users').doc(user.uid).get().then(function(doc){
      if(!doc.data()) return;
      setLoggedUser(doc.data(), user.uid);
    });

    getMyCart(user.uid);
    
  } else {
    // User is signed out
    userAuthChanged(false);
    loggedUser=null;

    cart=[];

    cartIconNumber.forEach(icon =>{
      icon.innerText=" ";
    });

  }
});


//////cart

let cart= [];

const cartIconNumber= document.querySelectorAll('.cartIcon span');

const cartFromLS= localStorage.getItem('store__cart');


const cartCollection=db.collection('cart');
const ordersCollection=db.collection('orders');

const addToMyCart= (product)=>{
    
  const item = cart.findIndex((item)=>{
    return item.id==product.id
  });

  if(item !== -1) {
    console.log('se actualizó')
    cart[item] = {...product, amount: product.amount + 1 };
  } else {
    console.log('se agrego')
    cart.push(product);
  }

  //Update all the cart in firebase
  cartCollection.doc(loggedUser.uid).set({    
    ...cart
  });

    //console.log(product.id);
    // sameProduct(product.id);
  
    let cartSize = cart.reduce((acc, cur) => acc + parseInt(cur.amount), 0);
    //add the number to the spam of the cart icon
    cartIconNumber.forEach(icon =>{
        icon.innerText=cartSize;
    });

}



let renderCart= null;

const getMyCart=(uid)=>{
      cartCollection.doc(uid).get().then(snapShot=>{
        const data=snapShot.data();
        console.log(data);
        if(!data)return;

        cartIconNumber.forEach(icon =>{
          icon.innerText= !!data ? data.cart.length : 0;
        });

        cart=data.cart;

        if(renderCart){
          renderCart();
        }
        
  });
}


const sameProduct=(idProduct)=>{
    
    cartCollection.doc(loggedUser.uid).get().then(snapShot=>{
      const data=snapShot.data().cart;

      console.log(data, typeof data);
      if(!data)return;
      


      const item= data.find((item)=>{
        return item.id==idProduct
      });

      if(Object.keys(item).length > 0) {
        cartCollection.doc(idProduct).set({
          amount: item.amount + 1
        }, { merge: true })
      } else {
        cartCollection.add({

        })
      }
   
  });
}*/
