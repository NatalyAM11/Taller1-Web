const params=new URLSearchParams(location.search);
const id= params.get('id');

const productEdit= document.querySelector('.productEdit');
const sideImg=document.querySelector('.productEdit__sideImg');
const productBigImg=document.querySelector('.productEdit__bigImg');
const mainImg=document.querySelector('.productEdit__MImage');


const imgFiles= [];
let mainImgFile;

//step 3------main image
productEdit.mainImage.addEventListener('change', function (){
    
    const file= productForm.mainImage.files[0];

    if(!file){
        return;
    }

    MImage.classList.add('hidden');

    const reader= new FileReader();

    reader.onload= function(event){

        //side images
        const mainImg=document.createElement('img');
        mainImg.classList.add('productForm__mainPreview');
        mainImg.setAttribute('src', event.target.result);
        mainImageCont.appendChild(mainImg);
    }

    reader.readAsDataURL(file);
    mainImgFile = file;
    console.log(mainImgFile);
});


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

    productEdit.name.value=data.name;
    productEdit.product.value=data.p;
    productEdit.type.value=data.type;
    productEdit.price.value=data.price;
    productEdit.content.value=data.content;
    productEdit.tone.value=data.tone;
    productEdit.collection.value=data.collection;
    productEdit.description.value=data.description;

    const img= data.images.slice(0,3);

    img.forEach(element=>{
         const miniImg=document.createElement('img');
         miniImg.classList.add('productEdit__littleImg');
         miniImg.setAttribute('src', element.url);
         sideImg.appendChild(miniImg);
    });

    productBigImg.setAttribute('src', data.images[0].url);
    mainImg.setAttribute('src', data.mainImg[0].url);
    
});

const checkProductFormAdmin= ()=>{
    if(!loggedUser || !loggedUser.admin){
        location.href='./store.html';
    }
}

