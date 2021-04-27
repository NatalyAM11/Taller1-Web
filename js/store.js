const productList= document.querySelector ('.productList');

const filters= document.querySelector('.filters');

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
        product.setAttribute('href', 'a');
    
        productList.appendChild(product);
    }));
}




filters.addEventListener('change', function(){
console.log(filters.type.value);

let productsCollection=db.collection('products');

if(filters.type.value){
    productsCollection= productsCollection.where("type", "==", filters.type.value);
}

if(filters.tone.value){
    productsCollection= productsCollection.where("tone", "==", filters.tone.value);
}

if(filters.collection.value){
    productsCollection= productsCollection.where("collection", "==", filters.collection.value);
}

productsCollection.get().then(handleCollectionResult);

});





db.collection('products').get().then(handleCollectionResult);





//forEach product
//products.forEach(handleProductItem);