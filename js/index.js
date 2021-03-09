//variables
const cperfectStorm=document.getElementById ('perfectStorm');
const cbutterflyBae=document.getElementById ('butterflyBae');
const cstormiWeather=document.getElementById ('stormiWeather');
const cstormiWorld=document.getElementById ('stormiWorld');

const hamburgerBtn=document.getElementById ('hamburgerBtn');


//Variables interaction
const imgEye=document.getElementById ('imgEye');
const nameOption=document.getElementById ('nameOption');



///////interaction nav responsive
hamburgerBtn.addEventListener('click', ()=>{
    let navOptions=document.querySelector('.nav__options');

    console.log(navOptions);
    navOptions.classList.toggle('nav__desaparecer');
  
});



//////interaction section

//first option
cperfectStorm.addEventListener('click', ()=>{
    //change the image sample
    imgEye.src='./img/interaction1.png'; 
    
    cperfectStorm.src='./img/option1Selected.png';

    cbutterflyBae.src='./img/option2.png';
    cstormiWeather.src='./img/option3.png';
    cstormiWorld.src='./img/option4.png';
   

});

//second option
cbutterflyBae.addEventListener('click', ()=>{
     //change the image sample
    imgEye.src='./img/interaction2.png';

    cbutterflyBae.src='./img/option2Selected.png';

    cperfectStorm.src='./img/option1.png';
    cstormiWeather.src='./img/option3.png';
    cstormiWorld.src='./img/option4.png';

   /* nameOption.('BUTTERFLY BAE');
    console.log(nameOption.innerHTML('BUTTERFLY BAE'));*/
   
});


//third option
cstormiWeather.addEventListener('click', ()=>{
    //change the image sample
   imgEye.src='./img/interaction3.png';

   cstormiWeather.src='./img/option3Selected.png';

   cperfectStorm.src='./img/option1.png';
   cbutterflyBae.src='./img/option2.png';
   cstormiWorld.src='./img/option4.png';
  
});

//fourth option
cstormiWorld.addEventListener('click', ()=>{
    //change the image sample
   imgEye.src='./img/interaction4.png';

   cstormiWorld.src='./img/option4Selected.png';

   cperfectStorm.src='./img/option1.png';
   cbutterflyBae.src='./img/option2.png';
   cstormiWeather.src='./img/option3.png';
  
});



