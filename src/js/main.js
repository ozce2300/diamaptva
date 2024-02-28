"use strict"


// Hämta in meny-knapparna
let openBtn = document.getElementById("open-menu");
let closeBtn = document.getElementById("close-menu");

//eventlyssnare
openBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);

//Toggla fram navigeringsmenyn
function toggleMenu() {
    let navMenuEl = document.getElementById("nav-menu");

    //hämtar in css för menyn
    let style = window.getComputedStyle(navMenuEl);

    //koll om navigering är synlig eller ej, ändrar display block/none
    if(style.display === "none") {
        navMenuEl.style.display = "block";
    } else {
        navMenuEl.style.display = "none";
    }
}

setInterval(tiden, 100);

function tiden() {
  let date = new Date();
document.getElementById("klockan").innerHTML = date.toLocaleTimeString();
}

let btnEL = document.getElementById("btn")
let bollEL = document.getElementById("boll")
btn.addEventListener('click', function() {
    // Lägg till CSS-klassen för att starta animationen
    boll.classList.add('hoppa');
});


