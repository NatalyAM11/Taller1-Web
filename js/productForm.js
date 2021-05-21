const productForm= document.querySelector('.productForm');
const productFormLoading= document.querySelector('.productForm__loader');
const productFormError= document.querySelector('.productForm__error');
const productFormReminder= document.querySelector('.productForm__reminder');
const reminderText= document.querySelector('.productForm__reminder--text');
const productFormImg= document.querySelector('.productForm__bigImg');
const sideImgCont= document.querySelector('.productForm__sideImg');
const littleImg= document.querySelectorAll('.productForm__i');
const MImage= document.querySelector('.productForm__MImage');
const mainImageCont= document.querySelector('.productForm__mainImg');

const imgFiles= [];
let mainImgFile;

let popularityProduct;


//step 2------images product
productForm.images.addEventListener('change', function (){
    
    const file= productForm.images.files[0];

    if(!file){
        return;
    }


    const reader= new FileReader();

    reader.onload= function(event){
        //big image
        productFormImg.setAttribute('src', event.target.result);

        //side images
        const miniImg=document.createElement('img');
        miniImg.classList.add('productForm__littleImg');
        miniImg.setAttribute('src', event.target.result);
        sideImgCont.appendChild(miniImg);

        littleImg.forEach(function(element){
            element.classList.add('hidden');
        });
    }

    reader.readAsDataURL(file);
    imgFiles.push(file);
});


//step 3------main image
productForm.mainImage.addEventListener('change', function (){
    
    const file= productForm.mainImage.files[0];

    if(!file){
        return;
    }

    MImage.classList.add('hidden');

    const reader= new FileReader();

    reader.onload= function(event){

        //side images
        const mainImg=document.createElement('img');
        mainImg.classList.add('productForm__mainPreview');
        mainImg.setAttribute('src', event.target.result);
        mainImageCont.appendChild(mainImg);
    }

    reader.readAsDataURL(file);
    mainImgFile = file;
    console.log(mainImgFile);
});



//send the information
productForm.addEventListener('submit', function(event){
    //delete the event by default
    event.preventDefault();

    popularityProduct= Math.floor(Math.random() * 5) + 1;   
 

    //product
    const product={
        name: productForm.name.value,
        p:productForm.productP.value,
        type:productForm.type.value,
        price:productForm.price.value,
        content: productForm.content.value,
        tone: productForm.tone.value,
        collection: productForm.collection.value,
        description:productForm.description.value,
        popularity: popularityProduct,
        creationDate: Date.now(),
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
        console.log(error);
    }



    //send the product to firebase
    db.collection('products').add(product).then(
        function(docRef){
             //aqui pongo el modal o lo que pase si se subio el producto correctamente

            //array promises upload
            const uploadPromises=[];
            //array with url promises
            const downloadUrlPromises=[];

            console.log(imgFiles);
            //////image reference
            imgFiles.forEach(function(file){
                //create the root reference
                var storageRef=firebase.storage().ref();

                //root
                var productImgRef= storageRef.child(`products/${docRef.id}/${file.name}`);

                //add the images in the array
                uploadPromises.push(productImgRef.put(file));
            });

            
                //create the root reference
                var storageRef = firebase.storage().ref();
                var mainImgRef = storageRef.child(`products/${docRef.id}/${mainImgFile}`);
                uploadPromises.push(mainImgRef.put(mainImgFile));
    


            //get the download URL of the image
            Promise.all(uploadPromises).then(function(snapshots){
                
                snapshots.forEach( (snapshot) => {

                    //add the ulr in the array
                    downloadUrlPromises.push(snapshot.ref.getDownloadURL());
                });

                //wait till all the promises are done
                Promise.all(downloadUrlPromises).then(function (downloadUrls){
                    console.log(downloadUrlPromises);
                    console.log(downloadUrls);

                    //create an array for the url of the img
                    const images = [];

                    const mainImg = [];

                    downloadUrls.forEach(function(url, index){
                        images.push(
                            {
                                url: url,
                                ref: snapshots[index].ref.fullPath
                            });
                    });

                    mainImg.push(
                        {
                            url: downloadUrls[downloadUrls.length - 1],
                            ref: snapshots[downloadUrlPromises.length - 1].ref.fullPath
                        }
                    );
                    
                    //add the new information of the images to the product
                    db.collection('products').doc(docRef.id).update({
                            images: images,
                            mainImg: mainImg
                    }).then(function(){
                        //all the product has been upload                      
                        console.log('document added', docRef.id);
                        productFormLoading.innerHTML="The product has been uploaded successfully";
                        location.href=`./productDetail.html?id=${docRef.id}&name=${docRef.name}`;
                    })
                    .catch(genericCatch);
                })
                
                .catch(genericCatch);
            })
            .catch(genericCatch);
        })
        .catch(genericCatch);
});


const checkProductFormAdmin= ()=>{
    if(!loggedUser || !loggedUser.admin){
        location.href='./store.html';
    }
  }

//checkProductFormAdmin();

