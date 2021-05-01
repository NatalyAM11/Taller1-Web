//varaibles modal
const modal=document.querySelector ('.modal');
const modalContent=document.querySelector ('.modal__content');
const modalBtn=document.querySelector ('.modal__btn');


// const navOptions=document.querySelector('.nav__options');
// const navD=document.querySelector('.nav__desaparecer');

//variables interaction
const imgEye=document.querySelector ('.interaction__eye');
const nameOption=document.querySelector('.interaction__name');
const interactionLi=document.querySelectorAll ('.interaction__li');
const cperfectStorm=document.querySelector('.perfectStorm');
const cbutterflyBae=document.querySelector ('.butterflyBae');
const cstormiWeather=document.querySelector ('.stormiWeather');
const cstormiWorld=document.querySelector ('.stormiWorld');


////////////modal effect
//Effects when the modal appears for the first time
function effect(){
    modalContent.style.transform = 'translate (0px, 0px)';
    modal.style.opacity=1;
}

setTimeout(effect,80);

/*///////interaction nav responsive
//transition when the options of the hamburguer menu appears
function handleNavEffect(){
    navOptions.style.opacity=1;
}

/////options of the nav appears when click the hamburguer menu
function handleNavAppear(){
    
    //Add the class "nav__disappear" to make the nav's options appear
    navOptions.classList.toggle('nav__disappear');
  
    //transition
    navOptions.style.opacity=0.6;
    setTimeout(handleNavEffect,50);
}

hamburgerBtn.addEventListener('click', handleNavAppear);*/




/////////////interaction section

//transition when the image changes
function handleInteractionEffect(){
    imgEye.style.opacity=1; 
}

//ForEach
function handleForEach (element, i){

    function handleInteractionClick (){
        //console.log(element,i); 

        //transition when the image changes
        imgEye.style.opacity=0.5;
        setTimeout(handleInteractionEffect,150);
        

        //options interaction
        switch(i){
            //option 1
            case 0:
                imgEye.src='./img/interaction1.png';
    
                cperfectStorm.src='./img/option1Selected.png';
            
                cbutterflyBae.src='./img/option2.png';
                cstormiWeather.src='./img/option3.png';
                cstormiWorld.src='./img/option4.png';
            
                //Change the product's name
                nameOption.innerHTML='PERFECT STORM';

                break;
            
            //option 2
            case 1:
                //change the image sample
                imgEye.src='./img/interaction2.png';

                cbutterflyBae.src='./img/option2Selected.png';
            
                cperfectStorm.src='./img/option1.png';
                cstormiWeather.src='./img/option3.png';
                cstormiWorld.src='./img/option4.png';
            
                //Change the product's name
                nameOption.innerHTML='BUTTERFLY BAE';                
                
                break;

            //option 3
            case 2:
                //change the image sample
                imgEye.src='./img/interaction3.png';

                cstormiWeather.src='./img/option3Selected.png';
            
                cperfectStorm.src='./img/option1.png';
                cbutterflyBae.src='./img/option2.png';
                cstormiWorld.src='./img/option4.png';
            
                //Change the product's name
                nameOption.innerHTML='STORMI WEATHER';  

                
                break;

            //option 4
            case 3:
                //change the image sample
                imgEye.src='./img/interaction4.png';

                cstormiWorld.src='./img/option4Selected.png';
            
                cperfectStorm.src='./img/option1.png';
                cbutterflyBae.src='./img/option2.png';
                cstormiWeather.src='./img/option3.png';
            
                //Change the product's name
                nameOption.innerHTML='STORMI WORLD';                

                break;
        }
    }

    element.addEventListener('click', handleInteractionClick);
}


interactionLi.forEach(handleForEach);




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
