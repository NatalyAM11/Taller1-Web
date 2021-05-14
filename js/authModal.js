const authModal= document.createElement('article');
authModal.classList.add('modal');
authModal.classList.add('authModal');

//modal
authModal.innerHTML=`
<section class="modal__content">
<img class="modal__btn" src="./img/btnClose.png">

    <div class="authForm__img"></div>

    <form class="authForm">
        <label class="authForm__regField productForm__label" for="name">Name</label>
        <input class="authForm__regField productForm__input" type="text" id="nameUser" placeholder="Your name" name="nameUser">

        <label class="authForm__regField productForm__label for="LastName">Last name</label>
        <input class="authForm__regField productForm__input" type="text" id="LastNameUser" placeholder="Your last name" name="lastNameUser">

        <label class="productForm__label" for="email">Email</label>
        <input class="productForm__input" type="text" id="email" placeholder="youremail@gmail.com" name="email">

        <label class="productForm__label" for="product">Password</label>
        <input class="productForm__input" type="password" id="password" placeholder="Your password" name="password">

        <div class="authForm__buttons">
        <a class="authForm__a authForm__registerBtn">Don't have an account yet? <b class="authForm__b">Register</b></a>
        <a class="authForm__a authForm__loginBtn">I already have an account <b class="authForm__b">Login</b></a>

        <p class="authForm__error"></p>

        <button class="authForm__sendBtn" type="submit">SIGN IN</button>
        </div>
    </form>
</a>
</section>`;

/////////////////Modal
//turn the display of the modal in none
function handleModalDisappear(){
    authModal.style.opacity='0';    
    authModal.style.display='none';
}

function handleModalAppear(){
    authModal.style.display='block';
    authModal.style.opacity='1';    
}

document.body.appendChild(authModal);

handleModalDisappear();

//variables modal
const modal=document.querySelector ('.modal');
const modalContent=document.querySelector ('.modal__content');
const modalBtn=document.querySelector ('.modal__btn');

////////////modal effect
//Effects when the modal appears for the first time
function effect(){
    modalContent.style.transform = 'translate (0px, 0px)';
    modal.style.opacity=1;
}

setTimeout(effect,80);


function handleCloseModal(){
    //transition
    modal.style.opacity=0;

    //make the body visible then the modal disappear
    document.body.style.overflow= 'visible';

    //wait a while for the transition to be seen and then return to the modal none
    setTimeout(handleModalDisappear,300);
}

modalBtn.addEventListener('click', handleCloseModal);


const authForm= authModal.querySelector('.authForm');
const regFields= authForm.querySelectorAll('.authForm__regField');
const registerBtn= authForm.querySelector('.authForm__registerBtn');
const loginBtn= authForm.querySelector('.authForm__loginBtn');
const submitBtn= authForm.querySelector('.authForm__sendBtn');
const modalError= authForm.querySelector('.authForm__error');
let isLogin= true;


function handleGoToLogin(){
    //hidde the fields of register and the boton of login
    regFields.forEach(function(elem){
        elem.classList.add('hidden');
    });
    submitBtn.innerHTML="SIGN IN";
    loginBtn.classList.add('hidden');
    registerBtn.classList.remove('hidden');
    isLogin=true;
}


//login
handleGoToLogin();

//login button
loginBtn.addEventListener('click', handleGoToLogin);

//register
registerBtn.addEventListener('click', function(){
    regFields.forEach(function(elem){
        elem.classList.remove('hidden');
    });
    submitBtn.innerHTML="CREATE ACCOUNT";
    loginBtn.classList.remove('hidden');
    registerBtn.classList.add('hidden');  
    isLogin=false;  
});


authForm.addEventListener('submit', function(event){
    event.preventDefault();

    console.log('submit');

    //get the info of the inputs
    const firstName=authForm.nameUser.value;
    const lastName=authForm.lastNameUser.value;
    const email=authForm.email.value;
    const password=authForm.password.value;

///register or login
    if(isLogin==true){
        //login
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(()=>{
                handleCloseModal();
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                modalError.innerText=error.message;
        });

    }else{
        //register
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;

                db.collection('users').doc(user.uid).set({
                    firstName: firstName,
                    lastName: lastName,
                    email:email
                });

                handleCloseModal();
    
         })
        .catch((error) => {
            modalError.innerText=error.message;
        });
    }
});



//auth buttons
const authBtns=document.querySelectorAll('.authButtons');
const userIcon=document.querySelectorAll('.userIcon');

userIcon.forEach(icon =>{

    authBtns.forEach(element => {
        element.innerHTML=`
        <a class="nav__option hideLoggedIn authButton__LogIn">Login/Register</a>
        <a class="nav__option showLoggedIn authButton__LogOut">Log Out</a>
        `;
        
        icon.addEventListener('click', ()=>{
            element.classList.toggle('hidden');

            element.style.opacity=0.5;
            setTimeout(element.style.opacity=1,100);
        });
    });
});



//////Login y Logout
const authLogin=document.querySelectorAll('.authButton__LogIn');
const authLogOut=document.querySelectorAll('.authButton__LogOut');

//Log Out
authLogOut.forEach(item => {
    item.addEventListener('click', ()=>{
        firebase.auth().signOut();
    });
});

//Login
authLogin.forEach(item => {
    item.addEventListener('click', ()=>{
        document.body.appendChild(authModal);
        handleModalAppear();
    });    
});


