function userAuthChanged(loggedIn){

    const showLoogedIn=document.querySelectorAll('.showLoggedIn');
    const hideLoggedIn=document.querySelectorAll('.hideLoggedIn');

    //If someone is logged, the option of LogOut appear
    showLoogedIn.forEach((element)=>{

        if(loggedIn){
            element.classList.remove('hidden');
        }else{
            element.classList.add('hidden');
        }
       
    });

    //If someone is logged, the option of LogOut appear
    hideLoggedIn.forEach((element)=>{

        if(loggedIn){
            element.classList.add('hidden');
        }else{
            element.classList.remove('hidden');
        }
    });   
}
