const indexModal= document.createElement('article');
indexModal.classList.add('indexModal');

indexModal.innerHTML=`
<section class="indexModal__content">
<img class="indexModal__btn" src="./img/btnClose.png">

<a class="indexModal__a" href="https://www.kyliecosmetics.com/collections/sale-1" target="_blank">
    <div class="modal__img"></div>

    <div class="indexModal__text">
        <h1 class="title--modal">IT’S ALMOST</h1>
        <h1 class="indexModal__bigTitle">KYLIE’S BIRTHDAY</h1>
        <h4 class="indexModal__h4">get ready for kylie's 22nd birthday collection.</h4>
        <p class="indexModal__p">During the week of August 10 there will be discounts throughout the KYLIE
            COSMETICS store.</p>
    </div>
</a>
</section>
`

document.body.appendChild(indexModal);

//effect
const indexModalContent=indexModal.querySelector('.indexModal__content');

function effect(){
    indexModalContent.style.transform = 'translate (0px, 0px)';
    indexModal.style.opacity=1;
}

setTimeout(effect,80);



//turn the display of the modal in none
function handleModalDisappear(){
    indexModal.style.display='none';
}
  
  function handleCloseModal(){
    //transition
    indexModal.style.opacity=0;
  
    //make the body visible then the modal disappear
    document.body.style.overflow= 'visible';
  
    //wait a while for the transition to be seen and then return to the modal none
    setTimeout(handleModalDisappear,300);
}

const closeBtn=indexModal.querySelector('.indexModal__btn');

closeBtn.addEventListener('click', handleCloseModal);