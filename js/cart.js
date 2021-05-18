const cartList=document.querySelector('.cartList');

let total=0;

renderCart= ()=>{

    cart.forEach((data=>{
  
        const product= document.createElement('div');
    
        //fill all the data
        product.innerHTML= ` 
            <div class="productCart">
            <div class="productCart__noButton">
                <div class="productCart__info">
                    <img class="productCart__img" src="${data.mainImg[3]?.url}">
                    <div class="productCart__text">
                        <h4 class="productCart__name">${data.name}</h4>
                        <h5 class="productCart__type">${data.p}</h5>
                    </div>
                </div>

                <div class="counter productCart__counter">
                    <button class="counter__btn productCart__btn rest">
                        <span>−</span>
                    </button>
                    <input type="number" class="counter__input" placeholder="0"></input>
                    <button class="counter__btn  productCart__btn plus">
                        <span>+</span>
                    </button>
                </div>

                <h4 class="productCart__price">$12.00</h4>
            </div>
            <img class="productCart__deleteBtn" src="./img/DeleteCartBtn.png">
        </div>
        `;
     
        cartList.appendChild(product);
    
        total+=data.price;
    
    }));

}

console.log(loggedUser);





