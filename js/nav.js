const nav= document.querySelector('.nav');

nav.innerHTML=
    `      
    <div class="nav__responsive">
        <div class="nav__hamburger"></div>
        <a href= "./index.html" class="logo--responsiveCont"><img class="logo--responsive" src="./img/logo.png"></a>
        <div class="nav__divIconsResponsive">
            <img class="nav__icon userIcon" src="./img/userIcon.png">
            <a class="nav__icon cartIcon"><img src="./img/cartIcon.png"><span></span></a>
        </div>
        <section class="authButtons hidden"></section>
        </div>

        <div class="nav__options nav__disappear">
            <a class="nav__option">COLLECTION</a>
            <a href= "./store.html" class="nav__option">SHOP</a>
            <a class="nav__option">NEW</a>
            <a href= "./index.html"><img class="logo" src="./img/logo.png"></a>
            <a class="nav__option">ABOUT</a>
            <a class="nav__option">KYLIE SKIN</a>
            <a class="nav__option showLoggedAdmin">ORDERS</a>
            <div class="nav__divIcons">
                <img class="nav__icon userIcon" src="./img/userIcon.png">
                <a class="nav__icon cartIcon"><img src="./img/cartIcon.png"><span></span></a>
            </div>
            <section class="authButtons hidden"></section>
    </div>
`;