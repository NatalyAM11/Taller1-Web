const productList= document.querySelector ('.productList');

const filters= document.querySelector('.filters');
const bannerStoreTitle=document.querySelector('.bannerStore__title');
const bannerStore=document.querySelector('.bannerStore');

const params=new URLSearchParams(location.search);

const handleCollectionResult = (querySnapshot)=>{

    //empty div so the products are not overwritten
    productList.innerHTML= " ";

    querySnapshot.forEach((doc=>{
        const data = doc.data();

        const product= document.createElement('div');

        let stars;

         //change the images of the stars
        const giveStars=(n)=>{
            stars=`./img/${n}stars.png`;
        }

        giveStars(data.popularity);


        //fill all the data
        product.innerHTML= `
        <img class="productStore__deleteBtn hidden" src="./img/DeleteCartBtn.png">
        <a class="productStore__content" href="./productDetail.html?id=${doc.id}&name=${data.name}"> 
        <h1 class="productStore__name">${data.name}</h1>
        <h4 class="productStore__type">${data.p}</h4>
        <img class="productStore__img" src="${data.mainImg[0].url}">
        <h4 class="productStore__price"> $ ${data.price}</h4>
        <img class="productStore__stars" src="${stars}">
        </a>
        <button class="productStore__cartBtn">ADD TO CART</button>
        <button class="productStore__editBtn hidden">EDIT</button>
          
        `;
    
        product.classList.add('productStore');
        /*product.setAttribute('href', ``);*/
    
        productList.appendChild(product);

        //add the product in the cart array
        const cartBtn= product.querySelector('.productStore__cartBtn');

        
        cartBtn.addEventListener('click', ()=>{

            addToMyCart({
                ...data,
                id: doc.id,
                amount: 1
            });
            //localStorage.setItem('store__cart', JSON.stringify(cart));
        });
    }));
}


const updateBannerStore = (txt, img) => {
    bannerStoreTitle.innerHTML = txt;
    bannerStore.style.backgroundImage = img;
}


//filters
filters.addEventListener('change', function(){
console.log(filters.type.value);

let productsCollection = db.collection('products');


//filter type
if(filters.type.value){
    if(filters.type.value === "shop") {
     productsCollection =  db.collection('products');
    } else {
        productsCollection= productsCollection.where("type", "==", filters.type.value);
    }


    

    //change the image and the text of the banner
    if(filters.type.value == "lips"){
        updateBannerStore("LIPS", "url('../img/bannerLips.png')");
    }

    if(filters.type.value == "eyes"){
        updateBannerStore("EYES", "url('../img/bannerEyes.png')");
    }

    if(filters.type.value == "face"){
        updateBannerStore("FACE", "url('../img/bannerSkin.png')");
    }

    if(filters.type.value == "shop"){
        updateBannerStore("SHOP", "url('../img/bannerSkin.png')");
    }

}

//filter tone
if(filters.tone.value){
    productsCollection= productsCollection.where("tone", "==", filters.tone.value);
}

//filter collection
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


let productCollection=db.collection('products');


if(params.get('type')){
    productCollection=productCollection.where('type', "==", params.get('type'));
}
