//variables
const cperfectStorm=document.getElementById ('perfectStorm');
const cbutterflyBae=document.getElementById ('butterflyBae');
const cstormiWeather=document.getElementById ('stormiWeather');
const cstormiWorld=document.getElementById ('stormiWorld');

const hamburgerBtn=document.getElementById ('hamburgerBtn');


//option selected
let choice=0;


switch(choice){

    
    case 0:
        
        break;
    
    case 1:
        break;

    case 2:
        break;
    
    case 3:
        break;

}

hamburgerBtn.addEventListener('click', ()=>{
    let navOptions=document.getElementsByClassName ('nav__option');

    for(var i=0; i<navOptions.length; i++){
        navOptions[i].classList.toggle('nav__desaparecer');
        console.log(i);
    }
});