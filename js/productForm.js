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



const productForm= document.querySelector('.productForm');

//send the information
productForm.addEventListener('submit', function(event){
    //delete the event by default
    event.preventDefault();

    //product
    const product={
        name: productForm.name.value,
        p:productForm.productP.value,
        type:productForm.type.value,
        price: parseFloat(productForm.price.value),
        content: productForm.content.value,
        tone: productForm.tone.value,
        collection: productForm.collection.value,
        description:productForm.description.value
    }

    if (!product.type){

    }

    console.log(product);

    //send the product in firebase
    db.collection('products').add(product).then(
        function(docRef){
            //aqui pongo el modal o lo que pase si se subio el producto correctamente
            
            console.log('document added', docRef.id);
        }
    );
});