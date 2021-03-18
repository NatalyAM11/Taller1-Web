//variables
const cperfectStorm=document.querySelector('.perfectStorm');
const cbutterflyBae=document.querySelector ('.butterflyBae');
const cstormiWeather=document.querySelector ('.stormiWeather');
const cstormiWorld=document.querySelector ('.stormiWorld');
const hamburgerBtn=document.querySelector ('.nav__hamburger');
const interactionLi=document.querySelectorAll ('.interaction__li');

//variables interaction

const imgEye=document.querySelector ('.interaction__eye');
const nameOption=document.getElementById ('nameOption');



///////interaction nav responsive

hamburgerBtn.addEventListener('click', ()=>{
    let navOptions=document.querySelector('.nav__options');

    navOptions.classList.toggle('nav__desaparecer');
  
});



//////interaction section

/*function handleInteractionClick(){
    imgEye.src='./img/interaction1.png'; 
    
    cperfectStorm.src='./img/option1Selected.png';

    cbutterflyBae.src='./img/option2.png';
    cstormiWeather.src='./img/option3.png';
    cstormiWorld.src='./img/option4.png';

    //Change the product's name
    nameOption.innerHTML='PERFECT STORM';
}


cperfectStorm.addEventListener('click', handleInteractionClick);







//second option
cbutterflyBae.addEventListener('click', ()=>{
     //change the image sample
    imgEye.src='./img/interaction2.png';

    cbutterflyBae.src='./img/option2Selected.png';

    cperfectStorm.src='./img/option1.png';
    cstormiWeather.src='./img/option3.png';
    cstormiWorld.src='./img/option4.png';

    //Change the product's name
    nameOption.innerHTML='BUTTERFLY BAE';
  
});


//third option
cstormiWeather.addEventListener('click', ()=>{
    //change the image sample
   imgEye.src='./img/interaction3.png';

   cstormiWeather.src='./img/option3Selected.png';

   cperfectStorm.src='./img/option1.png';
   cbutterflyBae.src='./img/option2.png';
   cstormiWorld.src='./img/option4.png';

    //Change the product's name
    nameOption.innerHTML='STORMI WEATHER'; 
});

//fourth option
cstormiWorld.addEventListener('click', ()=>{
    //change the image sample
   imgEye.src='./img/interaction4.png';

   cstormiWorld.src='./img/option4Selected.png';

   cperfectStorm.src='./img/option1.png';
   cbutterflyBae.src='./img/option2.png';
   cstormiWeather.src='./img/option3.png';

    //Change the product's name
    nameOption.innerHTML='STORMI WORLD';    
  
})*/


//interaction section
function handleForEach (element, i){

    function handleInteractionClick (){
        console.log(element,i); 

        //options interaction
        switch(i){
            case 0:
                imgEye.src='./img/interaction1.png'; 
    
                cperfectStorm.src='./img/option1Selected.png';
            
                cbutterflyBae.src='./img/option2.png';
                cstormiWeather.src='./img/option3.png';
                cstormiWorld.src='./img/option4.png';
            
                //Change the product's name
                nameOption.innerHTML='PERFECT STORM';

                break;
            

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
