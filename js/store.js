const productList= document.querySelector ('.productList');

const filters= document.querySelector('.filters');
const bannerStoreTitle=document.querySelector('.bannerStore__title');
const bannerStore=document.querySelector('.bannerStore');

const handleCollectionResult= (querySnapshot)=>{
    productList.innerHTML= " ";
    querySnapshot.forEach((doc=>{
        const data= doc.data();

        const product= document.createElement('a');

        product.innerHTML= ` 
        <h1 class="productStore__name">${data.name}</h1>
        <h4 class="productStore__type">${data.p}</h4>
        <img class="productStore__img" src="${data.images[0]?.url}">
        <h4 class="productStore__price"> $ ${data.price}</h4>
        <img class="productStore__stars" src="./img/stars.png">
        <button>ADD TO CART</button>
        `;
    
        product.classList.add('productStore');
        product.setAttribute('href', `./productDetail.html?id=${doc.id}`);
    
        productList.appendChild(product);
    }));
}




filters.addEventListener('change', function(){
console.log(filters.type.value);

let productsCollection=db.collection('products');

if(filters.type.value){
    productsCollection= productsCollection.where("type", "==", filters.type.value);

    //change the image and the text of the banner
    if(filters.type.value=="lips"){
        bannerStoreTitle.innerHTML="LIPS";
        bannerStore.style.backgroundImage = "url('../img/bannerLips.png')";
    }

    if(filters.type.value=="eyes"){
        bannerStoreTitle.innerHTML="EYES";
        bannerStore.style.backgroundImage = "url('../img/bannerEyes.png')";
    }

    if(filters.type.value=="face"){
        bannerStoreTitle.innerHTML="FACE";
        bannerStore.style.backgroundImage = "url('../img/bannerSkin.png')";
    }
}

if(filters.tone.value){
    productsCollection= productsCollection.where("tone", "==", filters.tone.value);
}

if(filters.collection.value){
    productsCollection= productsCollection.where("collection", "==", filters.collection.value);
}


//order
if(filters.order.value){
    switch(filters.order.value){
        case 'new':
            productsCollection= productsCollection.orderBy('creationDate','desc');
            break;
        case 'topRated':
            productsCollection= productsCollection.orderBy('popularity','desc');
            break; 
        case 'priceDesc':
            productsCollection= productsCollection.orderBy('price','desc');
            break; 
        case 'priceAsc':
            productsCollection= productsCollection.orderBy('price','asc');
            break;                 
    }
}

productsCollection.get().then(handleCollectionResult);

});





db.collection('products').get().then(handleCollectionResult);





//forEach product
//products.forEach(handleProductItem);