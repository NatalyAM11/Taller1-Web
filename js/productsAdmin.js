const productAdminCont=document.querySelector('.productsAdminCont');
const addProductBtn=document.querySelector('.orders__addProductBtn')

const handleCollectionResult = (querySnapshot)=>{

    querySnapshot.forEach((doc=>{
        const data = doc.data();

        
        const productAdmin= document.createElement('div');

        let stars;

         //change the images of the stars
        const giveStars=(n)=>{
            stars=`./img/${n}stars.png`;
        }

        giveStars(data.popularity);


        productAdmin.innerHTML=`
        <img class="productAdmin__deleteBtn showLoggedAdmin" src="./img/DeleteCartBtn.png">
        <a class="productAdmin__content" href="./productDetail.html?id=${doc.id}&name=${doc.name}"> 
        <h1 class="productAdmin__name">${data.name}</h1>
        <h4 class="productAdmin__type">${data.p}</h4>
        <img class="productAdmin__img" src="${data.mainImg[0].url}">
        <h4 class="productAdmin__price"> $ ${data.price}</h4>
        <img class="productAdmin__stars" src="${stars}">
        </a>
        <button class="productAdmin__editBtn showLoggedAdmin">EDIT</button>
        `
        productAdmin.classList.add('productAdmin');
        productAdminCont.appendChild(productAdmin);


        

        //edit
        const editBtn=productAdmin.querySelector('.productAdmin__editBtn');

        editBtn.addEventListener('click', ()=>{
            location.href=`./productEdit.html?id=${doc.id}&name=${data.name}`;
            console.log(doc.id);
        });

        
        const deleteBtn=productAdmin.querySelector('.productAdmin__deleteBtn');

        deleteBtn.addEventListener('click', ()=>{
            db.collection('products').doc(doc.id).delete().then( ()=>{
                console.log('Se borro')
            }).catch((error) =>{
                console.log('No se borro nada', error)
            });
            
            db.collection('products').get().then(handleCollectionResult);
        })
    }))
}

db.collection('products').get().then(handleCollectionResult);


addProductBtn.addEventListener('click', ()=>{
    location.href='./productForm.html';
    console.log('djsmdk')
})
