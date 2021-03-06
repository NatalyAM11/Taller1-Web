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
const sideImg=document.querySelector('.productDetail__sideImg');

const bannerTitle=document.querySelector('.bannerProduct__title');
const bannerProduct=document.querySelector('.bannerProduct');
const item1=document.querySelector('.item1');
const item2=document.querySelector('.item2');

const cartBtn= document.querySelector('.productDetail__addCartBtn');

const counterStore= document.querySelector('.counter__input');


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

    const img= data.images.slice(0,3);

    img.forEach(element=>{
        //side images
         const miniImg=document.createElement('img');
         miniImg.classList.add('productDetail__littleImg');
         miniImg.setAttribute('src', element.url);
         sideImg.appendChild(miniImg);
    });
    
    productBigImg.setAttribute('src', data.images[0].url);

    //interaction galley images
    const productLittleImg=document.querySelectorAll('.productDetail__littleImg');
        productLittleImg.forEach((imgItem)=>{
                
            function handleThumClick(){
                const thumbSrc= imgItem.getAttribute('src');
                productBigImg.setAttribute('src', thumbSrc);
            }
            
            imgItem.addEventListener('click', handleThumClick);
     });


    //stars popularity
    const starsProduct = (n) => {
        productPopularity.setAttribute('src',`./img/${n}stars.png`);
        stars=`./img/${n}stars.png`;
    }

   starsProduct(data.popularity);


    cartBtn.addEventListener('click', ()=>{
        if(loggedUser){
            addToMyCart({
                ...data,
                id: doc.id,
                amount: parseInt(counterStore.value) 
            });
        }else{
            handleModalAppear();
        }
    });


    const updateBanner= (txt, img) => {
        bannerTitle.innerHTML = txt;
        bannerProduct.style.backgroundImage = img;
    }

    const updateBanners= (txt, img, txt2, img2) =>{
        item1.innerText= txt;
        item1.style.backgroundImage = img;

        item2.innerText= txt2;
        item2.style.backgroundImage = img2;
    }

    const recommendationRoot=(root, root2) =>{
        item1.setAttribute('href', `store.html?type=${root}`);
        item2.setAttribute('href', `store.html?type=${root2}`);
    }

 
    if(data.type=="lips"){
        updateBanner("LIPS", "url('./img/bannerLips.png')");
        updateBanners("FACE", "url('./img/recommendationFace.png')", "EYES", "url('./img/recommendationEyes.png')" );

        recommendationRoot ("face", "eyes");

    };

    if(data.type=="face"){
        updateBanner("FACE", "url('./img/bannerSkin.png')");
        updateBanners("EYES", "url('./img/recommendationEyes.png')", "LIPS", "url('./img/recommendationLips.png')");

        recommendationRoot ("eyes", "lips");
    };

    if(data.type=="eyes"){
        updateBanner("EYES", "url('./img/bannerEyes.png')");
        updateBanners("FACE", "url('./img/recommendationFace.png')", "LIPS", "url('./img/recommendationLips.png')");

        recommendationRoot ("face", "lips");
 
    };
});











