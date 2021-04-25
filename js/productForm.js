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


const productForm= document.querySelector('.productForm');
const productFormLoading= document.querySelector('.productForm__loader');
const productFormError= document.querySelector('.productForm__error');
const productFormReminder= document.querySelector('.productForm__reminder');
const reminderText= document.querySelector('.productForm__reminder--text');
const productFormImg= document.querySelector('.productForm__bigImg');
const littleImg= document.querySelector('.productForm__sideImg');
const i= document.querySelector('.productForm__i');

const imgFiles= [];

let popularityProduct;

//image product
productForm.image.addEventListener('change', function (){
    
    const file= productForm.image.files[0];

    if(!file){
        return;
    }

    i.classList.add('hidden');

    const reader= new FileReader();

    reader.onload= function(event){
        //big image
        productFormImg.setAttribute('src', event.target.result);

        //side images
        const miniImg=document.createElement('img');
        miniImg.classList.add('productForm__littleImg');
        miniImg.setAttribute('src', event.target.result);
        littleImg.appendChild(miniImg);
    }

    reader.readAsDataURL(file);
    imgFiles.push(file);
});


//send the information
productForm.addEventListener('submit', function(event){
    //delete the event by default
    event.preventDefault();

    popularityProduct= Math.floor(Math.random() * 6);    

    //product
    const product={
        name: productForm.name.value,
        p:productForm.productP.value,
        type:productForm.type.value,
        price: parseFloat(productForm.price.value),
        content: productForm.content.value,
        tone: productForm.tone.value,
        collection: productForm.collection.value,
        description:productForm.description.value,
        popularity: popularityProduct
    }

    //Errors if the client doesn't fill all the fields

    let error= "";

    if (!product.name){
        error+= "Don't forget the name of the product </br>";
    }
    if (!product.p){
        error+= 'The product is required </br>';
    }
    if (!product.type){
        error+= 'You must select the type of the product </br>';
    }
    if (!product.price){
        error+= 'The price of the product is required </br>';
    }
    if (!product.content){
        error+= "Don't forget the content of the product </br>";
    }
    if (!product.description){
        error+= "Don't forget the description of the product </br>";
    }

    if(error){
        productFormReminder.innerHTML=error;
        productFormReminder.classList.remove('hidden');
        return;
    }else{
        productFormReminder.classList.add('hidden');
    }

    productFormLoading.classList.remove('hidden');
    productFormError.classList.add('hidden');

    const genericCatch= function (error){
        productFormError.innerHTML="Something went wrong, try again please";
        productFormLoading.classList.add('hidden');
        productFormError.classList.remove('hidden');
    }

    //send the product to firebase
    db.collection('products').add(product).then(
        function(docRef){
             //aqui pongo el modal o lo que pase si se subio el producto correctamente

            //array promises upload
            const uploadPromises=[];
            //array with url promises
            const downloadUrlPromises=[];

            //////image reference
            imgFiles.forEach(function(file){
                //create the root reference
                var storageRef=firebase.storage().ref();

                //root
                var productImgRef= storageRef.child(`products/${docRef.id}/${file.name}`);

                //add the images in the array
                uploadPromises.push(productImgRef.put(file));

            });

            //get the download URL of the image
            Promise.all(uploadPromises).then(function(snapshots){
                snapshots.forEach((snapshot)=>{

                    //add the ulr in the array
                    downloadUrlPromises.push(snapshot.ref.getDownloadURL());
                });

                //wait till all the promises are done
                Promise.all(downloadUrlPromises).then(function (downloadUrls){
                    console.log(downloadUrls);

                    //create an array for the url of the img
                    const images= [];
                    
                    downloadUrls.forEach(function(url, index){
                        images.push(
                            {
                                url: url,
                                ref: snapshots[index].ref.fullPath
                            });
                    });
                    
                    //add the new information of the images to the product
                    db.collection('products').doc(docRef.id).update({
                            images: images
                    }).then(function(){
                        //all the product has been upload                      
                        console.log('document added', docRef.id);
                        productFormLoading.classList.add('hidden');
                    })
                    .catch(genericCatch);
                })
                .catch(genericCatch);
            })
            .catch(genericCatch);
        })
        .catch(genericCatch);
});

/*.then((downloadURL)=>{

                        //loading
                        productFormLoading.classList.remove('hidden');

                        product.imageUrl= downloadURL;
                        product.imageRef= snapshot.ref.fullPath;

                    
                    });*/




/*.then((snapshot)=>{

                    //wait to get the download URL of the image
                    snapshot.ref.getDownloadURL();
                });*/
