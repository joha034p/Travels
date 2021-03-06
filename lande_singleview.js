const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const header = document.querySelector("header");
const medieurl = "https://justjourney-1298.restdb.io/media/";
const myHeaders = {
    "x-apikey": "602f73905ad3610fb5bb639c"
}
let lande;


console.log("ID", id);
document.addEventListener("DOMContentLoaded", start);

function start() {
    const menuKnapper = document.querySelectorAll("nav a");
    menuKnapper.forEach(knap => knap.addEventListener("click", valgtKnap));
    loadJSON();
}

//nav .menu vis hvor på sitet man er.
function valgtKnap() {
    document.querySelector(".valgtMenu").classList.remove("valgtMenu");
    this.classList.add("valgtMenu");
}

async function loadJSON() {
    console.log("loadJSON");
    const JSONData = await fetch(`https://justjourney-1298.restdb.io/rest/destinationer/${id}`, {
        headers: myHeaders
    });
    lande = await JSONData.json();

    console.log("lande", lande);
    visLande(lande);
}

function visLande(land) {
    console.log("visLande");
    document.querySelector(".billede").src = medieurl + land.billede;
    document.querySelector(".stort_billede").src = medieurl + land.billede;
    document.querySelector(".longdescription").textContent = land.longdescription + " ";
    document.querySelector("h1").textContent = land.destination + " ";
    document.querySelector("p").textContent = land.shortdescription + " ";
    document.querySelector("h3").textContent = land.City + " ";
    document.querySelector(".quote").src = medieurl + land.quote;
    document.querySelector(".quotebillede").src = medieurl + land.quotebillede;
    document.querySelector("button").addEventListener("click", tilbageTilMenu);

}

function tilbageTilMenu() {
    console.log("tilbageTilMenu");
    history.back();
}

//burger

window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("sidenVises");
    document.querySelector("#menuknap").addEventListener("click", toggleMenu);

}

function toggleMenu() {
    console.log("toggleMenu");
    document.querySelector("#menu1").classList.toggle("hidden");
    myFunctionBurger(this);

}

function myFunctionBurger(x) {
    console.log("myFunctionBurger");
    x.classList.toggle("change");
}
