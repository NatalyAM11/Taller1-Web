const cartList=document.querySelector('.cartList');

let total=0;

renderCart= ()=>{

    cart.forEach((data=>{
  
        const product= document.createElement('div');
    
        //fill all the data
        product.innerHTML= ` 
        <h1 class="productStore__name">${data.name}</h1>
        <h4 class="productStore__type">${data.p}</h4>
        <img class="productStore__img" src="${data.mainImg[3]?.url}">
        <h4 class="productStore__price"> $ ${data.price}</h4>
        </a>
      
        `;
    
        product.classList.add('productStore');
    
    
        cartList.appendChild(product);
    
        total+=data.price;
    
    }));

}

console.log(loggedUser)





