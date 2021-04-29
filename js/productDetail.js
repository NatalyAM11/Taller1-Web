const params=new URLSearchParams(location.search);
const id= params.get('id');


const productName= document.querySelector('.productDetail__title');
const productProduct= document.querySelector('.productDetail__product');
const productPopularity= document.querySelector('.productDetail__popularity');
const productDescription= document.querySelector('.productDetail__description');
const productContents= document.querySelector('.productDetail__contents');
const productPrice= document.querySelector('.productDetail__price');
const productImg1= document.querySelector('.optionImg_1');
const productImg2= document.querySelector('.optionImg_2');
const productImg3= document.querySelector('.optionImg_3');
const productBigImg= document.querySelector('.productDetail__bigImg');
const productLittleImg=document.querySelectorAll('.productDetail__littleImg');


//error
if(!id){
    location.href='./error.html';
}


db.collection('products').doc(id)
.get().then(function(doc){
    console.log(doc.id, doc.data());
    const data= doc.data();
    if(!data){
        location.href='./error.html';
    }

    productName.innerText=data.name;
    productProduct.innerText=data.p;
    productDescription.innerText=data.description;
    productContents.innerText=data.content;
    productPrice.innerText="$ "+data.price+"USD";
    productImg1.setAttribute('src',  data.images[0].url);
    productImg2.setAttribute('src',  data.images[1].url);
    productImg3.setAttribute('src',  data.images[2].url);
    productBigImg.setAttribute('src', data.images[0].url);

    //stars popularity
    if(data.popularity=="5"){productPopularity.setAttribute('src','./img/fiveStars.png');}
    if(data.popularity=="4"){productPopularity.setAttribute('src','./img/fourStars.png');}
    if(data.popularity=="3"){productPopularity.setAttribute('src','./img/threeStars.png');}
    if(data.popularity=="2"){productPopularity.setAttribute('src','./img/twoStars.png');}
});



//interaction photos
for(let i=0; i<productLittleImg.length; i++){
    const thumb=productLittleImg[i];

    function handleThumClick(){
        const thumbSrc= thumb.getAttribute('src');
        productBigImg.setAttribute('src', thumbSrc);
   }

   thumb.addEventListener('click', handleThumClick);
}








    /*        switch(data.popularity.value){
            case "1":

                break;
            case "2":
                stars='./img/twoStars.png';
                break;
            case "3":
                stars='./img/threeStars.png';
                break;
            case "4":
                stars='./img/fourStars.png';
                break; 
            case "5":
                stars='./img/fiveStars.png';
                break;                               
        }*/