const productList= document.querySelector ('.productList');

const filters= document.querySelector('.filters');
const bannerStoreTitle=document.querySelector('.bannerStore__title');
const bannerStore=document.querySelector('.bannerStore');


const handleCollectionResult= (querySnapshot)=>{

    //empty div so the products are not overwritten
    productList.innerHTML= " ";

    querySnapshot.forEach((doc=>{
        const data= doc.data();

        const product= document.createElement('div');

        let stars;

        if(data.popularity=="5"){
            stars='./img/fiveStars.png';
        }
        if(data.popularity=="4"){
            stars='./img/fourStars.png';
        }
        if(data.popularity=="3"){
            stars='./img/threeStars.png';
        }
        if(data.popularity=="2"){
            stars='./img/twoStars.png';
        }
        if(data.popularity=="1"){
            stars='./img/twoStars.png';
        }

        //fill all the data
        product.innerHTML= `
        <a class="productStore__content" href="./productDetail.html?id=${doc.id}&name=${data.name}"> 
        <h1 class="productStore__name">${data.name}</h1>
        <h4 class="productStore__type">${data.p}</h4>
        <img class="productStore__img" src="${data.mainImg[3]?.url}">
        <h4 class="productStore__price"> $ ${data.price}</h4>
        <img class="productStore__stars" src="${stars}">
        </a>
        <button class="productStore__cartBtn">ADD TO CART</button>
        `;
    
        product.classList.add('productStore');
        /*product.setAttribute('href', ``);*/
    
        productList.appendChild(product);

        //add the product in the cart array
        const cartBtn= product.querySelector('.productStore__cartBtn');
        cartBtn.addEventListener('click', ()=>{
            cart.push(data);
            localStorage.setItem('store__cart', JSON.stringify(cart));

            //add the number to the spam of the cart icon
            cartIconNumber.forEach(icon =>{
                icon.innerText=cart.length;
            });
        })
    }));
}



//filters
filters.addEventListener('change', function(){
console.log(filters.type.value);

let productsCollection=db.collection('products');


//filter type
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

    
    if(filters.type.value==" "){
        bannerStoreTitle.innerHTML="SHOP";
        bannerStore.style.backgroundImage = "url('../img/bannerShop.png')";
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


