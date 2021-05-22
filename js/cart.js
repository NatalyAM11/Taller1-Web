const cartList=document.querySelector('.cartList');
const checkoutTotal=document.querySelector('.checkoutTotal');
const checkoutForm=document.querySelector('.checkout__form');
const checkoutShipping=document.querySelector('.checkoutShipping');
const checkoutSubtotal=document.querySelector('.checkoutSubtotal');
const checkoutReminder= document.querySelector('.checkout__reminder');

let subProduct=0;
let shipping=25.00;

let subtotal=0;
let total=0;

renderCart= ()=>{

    cart.forEach((data=>{
  
        const product= document.createElement('div');
   
        subProduct=data.price*data.amount;

        //fill all the data
        product.innerHTML= ` 
            <div class="productCart">
            <div class="productCart__noButton">
                <div class="productCart__info">
                    <img class="productCart__img" src="${data.mainImg[0]?.url}">
                    <div class="productCart__text">
                        <h4 class="productCart__name">${data.name}</h4>
                        <h5 class="productCart__type">${data.p}</h5>
                    </div>
                </div>

                <div class="counter productCart__counter">
                  
                      <input type="number" class="counter__input"  placeholder="1"  min="1" max="10" value="${data.amount}"></input>

                </div>

                <h4 class="productCart__price">$ ${subProduct} </h4>
            </div>
            <img class="productCart__deleteBtn" src="./img/DeleteCartBtn.png">
        </div>
        `;
     
        cartList.appendChild(product);

         
        //keep the amount of products
        const counter= document.querySelector('.counter__input');  
        const price= document.querySelector('.productCart__price'); 
        
     
        checkoutShipping.innerHTML=`$ ${shipping}`;
    
        subtotal+=subProduct;
        checkoutSubtotal.innerHTML= "$"+ subtotal;

        subProduct=data.price*counter.value;
        price.innerHTML=subProduct;

        total=subtotal+shipping;
        checkoutTotal.innerHTML="$"+ total;


        const deleteBtn=product.querySelector(".productCart__deleteBtn");

        deleteBtn.addEventListener("click", (event)=>{
            console.log(data.id);
            let father=event.target.closest('productCart');
        });

    }));

    checkoutForm.addEventListener('submit', function(event){
        event.preventDefault();

        const productIds=[];
        cart.forEach(function (data){
            productIds.push(data.id);
        });

        const order={
            idNumber:checkoutForm.idNumber.value,
            ccNumber:checkoutForm.ccNumber.value,
            city:checkoutForm.city.value,
            address:checkoutForm.address.value,
            date: Date.now(),
            productIds,
            total,
            uid: loggedUser.uid,
        }


        let error= "";

        if (!order.idNumber ||!order.ccNumber || !order.city ||!order.address){
            error+= "Don't forget fill all the fields </br>";
        }

        if(error){
            checkoutReminder.innerHTML=error;
            checkoutReminder.classList.remove('hidden');
            return;
        }else{
            checkoutReminder.classList.add('hidden');
        }


        ordersCollection.add(order) 
            .then(function(docRef){

                cartCollection.doc(loggedUser.uid).set({
                    cart: []
                });
        });
        console.log(order);
    });

}



const checkUser= ()=>{
    if(!loggedUser){
        location.href='./store.html';
    }
}
console.log(loggedUser);






