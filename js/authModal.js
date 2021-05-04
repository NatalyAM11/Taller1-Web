//varaibles modal
const modal=document.querySelector ('.modal');
const modalContent=document.querySelector ('.modal__content');
const modalBtn=document.querySelector ('.modal__btn');



/////////////////Modal
//turn the display of the modal in none
function handleModalDisappear(){
    modal.style.display='none';
}

function handleCloseModal(){
    //transition
    modal.style.opacity=0;

    //make the body visible then the modal disappear
    document.body.style.overflow= 'visible';

    //wait a while for the transition to be seen and then return to the modal none
    setTimeout(handleModalDisappear,300);
}

modalBtn.addEventListener('click', handleCloseModal);
