const ordersCont=document.querySelector('.orders');
const addProductBtn=document.querySelector('.orders__addProductBtn')

db.collection('orders').get().then((snapShot)=>{
    snapShot.forEach((item)=>{

        const data=item.data();

        const order= document.createElement('div');
        
        const product= document.createElement('div');

        order.innerHTML= `
            <div class="order">
                <div class="order__product">
  
                </div>
            <div class="order__text">
            <h4 class="order__price"> <span>${data.uName}</span></h4>
            <h4 class="order__price">Date: <span>${data.numberDate}</span></h4>
            </div>
        </div>`

        ordersCont.appendChild(order);


        const orderProducts=order.querySelector('.order__product');

        data.productIds.forEach((p)=>{
            console.log(p.name)

            product.innerHTML= `
            <img class="order__img" src="${p.mainImg[0].url}">
            <div class="order__text">
                <h4 class="order__name">${p.name}</h4>
                <h5 class="order__type">${p.p}</h5>
                <h4 class="order__price">Amount:<span>${p.amount}</span></h4>
            </div>
            `
        })

        orderProducts.appendChild(product);
    
    })
})

addProductBtn.addEventListener('click', ()=>{
    location.href='./productForm.html';
    console.log('djsmdk')
})


const checkProductFormAdmin= ()=>{
    if(!loggedUser || !loggedUser.admin){
        location.href='./store.html';
    }
}