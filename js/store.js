//product
const products=[
     {
        name: 'BUTTERMILK SKIN',
        type: 'CONCEALEOUR',
        img: './img/buttermilk.png',
        price: '20.00',
        stars: './img/stars.png',
    },
    {
        name: 'TOFFEE',
        type: 'CONCEALEOUR',
        img: './img/toffee.png',
        price: '20.00',
        stars: './img/stars.png',
    },
    {
        name: 'TOFFEE',
        type: 'CONCEALEOUR',
        img: './img/toffee.png',
        price: '20.00',
        stars: './img/stars.png',
    },
    {
        name: 'TOFFEE',
        type: 'CONCEALEOUR',
        img: './img/toffee.png',
        price: '20.00',
        stars: './img/stars.png',
    },
    
];


const productList= document.querySelector ('.productList');

//function product
function handleProductItem(item){
    const product= document.createElement('a');

    product.innerHTML= ` 
    <h1 class="productStore__name">${item.name}</h1>
    <h4 class="productStore__type">${item.type}</h4>
    <img class="productStore__img" src="${item.img}">
    <h4 class="productStore__price"> $ ${item.price}</h4>
    <img class="productStore__stars" src="./img/stars.png">
    <button>ADD TO CART</button>
    `;

    product.classList.add('productStore');
    product.setAttribute('href', 'a');
    console.log(product);

    productList.appendChild(product);
}


//forEach product
products.forEach(handleProductItem);