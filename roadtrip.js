function toggleMenu() {
    console.log("toggleMenu");
    document.querySelector("#menu1").classList.toggle("hidden");
    myFunctionBurger(this);
}

function myFunctionBurger(x) {
    console.log("myFunctionBurger");
    x.classList.toggle("change");
}

const url = "https://justjourney-1298.restdb.io/rest/destinationer";
const medieurl = "https://justjourney-1298.restdb.io/media/";
const options = {
    headers: {
        'x-apikey': "602f73905ad3610fb5bb639c"
    }
};
const main = document.querySelector("main");
const template = document.querySelector("template").content;
document.addEventListener("DOMContentLoaded", start);
document.querySelector("#menuknap").addEventListener("click", toggleMenu);
let lande;
let filter = "alle";


function start() {
    const filterKnapper = document.querySelectorAll("nav button");
    filterKnapper.forEach(knap => knap.addEventListener("click", filtrerLande));
    hentData();
    const menuKnapper = document.querySelectorAll("nav a");
    menuKnapper.forEach(knap => knap.addEventListener("click", valgtKnap));
}

//nav .menu vis hvor på sitet man er.
function valgtKnap() {
    document.querySelector(".valgtMenu").classList.remove("valgtMenu");
    this.classList.add("valgtMenu");
}

function filtrerLande() {
    filter = this.dataset.destination;
    document.querySelector(".valgt").classList.remove("valgt");
    this.classList.add("valgt");
    vis();
}

async function hentData() {
    const respons = await fetch(url, options);
    lande = await respons.json();
    console.log("Lande", lande);
    vis();
}

function vis(json) {
    console.log(json);
    main.textContent = "";
    lande.forEach(land => {
        if (filter == land.destination || filter == "alle") {
            const klon = template.cloneNode(true);
            klon.querySelector("img").src = medieurl + land.billede;
            klon.querySelector("h3").textContent = land.City;
            klon.querySelector("article").addEventListener("click", () => visDetaljer(land));
            main.appendChild(klon);
        }
    })
}

function visDetaljer(hvad) {
    location.href = `lande_singleview.html?id=${hvad._id}`;
}
