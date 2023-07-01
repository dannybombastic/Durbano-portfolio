/*==== toogle icon navbar ====*/

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};




/*==== scroll sections active link ====*/

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*='+id+']').classList.add('active');
            });
        };
    });


    /*==== sticky navbar ====*/
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    /*==== remove toggle icon and navbar when click navbar link (scroll) ====*/

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');


};


/*==== scroll reveal ====*/

ScrollReveal({
    //reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, about-content', { origin: 'right' });

/*==== typed js ====*/

const typed = new Typed('.multiple-text', {
    strings: ['DevOps Developer', 'CI/CD Developer', 'Cloud Developer','ALM', 'DevSecOps Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});



/*==== Cookies ====*/

document.cookie = "nombre_cookie=valor_cookie; expires=Thu, 22 Jun 2023 12:00:00 UTC; path=/; domain=durbanod.com; secure; SameSite=Strict";



/*==== Popup 1====*/
const popupButton3 = document.getElementById("popup-button-3");
const popupOverlay3 = document.getElementById("popup-overlay-3");
const popupContent3= document.getElementById("popup-content-3");
const closeButton3 = document.getElementById("close-button-3");

popupButton3.addEventListener("click", function() {
  popupOverlay3.style.display = "block";
});

closeButton3.addEventListener("click", function() {
  popupOverlay3.style.display = "none";
});


/*==== Popup 2====*/
const popupButton1 = document.getElementById("popup-button-1");
const popupOverlay1 = document.getElementById("popup-overlay-1");
const popupContent1 = document.getElementById("popup-content-1");
const closeButton1 = document.getElementById("close-button-1");

popupButton1.addEventListener("click", function() {
  popupOverlay1.style.display = "block";
});

closeButton1.addEventListener("click", function() {
  popupOverlay1.style.display = "none";
});


/*==== Popup 3====*/

const popupButton2 = document.getElementById("popup-button-2");
const popupOverlay2 = document.getElementById("popup-overlay-2");
const popupContent2 = document.getElementById("popup-content-2");
const closeButton2 = document.getElementById("close-button-2");

popupButton2.addEventListener("click", function() {
  popupOverlay2.style.display = "block";
});

closeButton2.addEventListener("click", function() {
  popupOverlay2.style.display = "none";
});

