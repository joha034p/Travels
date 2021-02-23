//en function der slår classen "hidden" til, på id'et "menu1".
function toggleMenu() {
    //information som vises i inspector.
    console.log("toggleMenu");
    document.querySelector("#menu1").classList.toggle("hidden");
    //der henvises her til en anden function.
    myFunctionBurger(this);
}

//function der slår classen "change" til.
function myFunctionBurger(x) {
    console.log("myFunctionBurger");
    x.classList.toggle("change");
}

//forskellige variabler der defineres. "const" = variabler der ikke kan ændres på.
//url til restdb.
const url = "https://justjourney-1298.restdb.io/rest/destinationer";
//medieurl til restdb. samme url men erstat alt efter ".io/" til "/media/".
const medieurl = "https://justjourney-1298.restdb.io/media/";
//variabel der henter API nøglen som er forbundet til restdb.
const options = {
    headers: {
        'x-apikey': "602f73905ad3610fb5bb639c"
    }
};
//variabel der tager fat i "main" tagget.
const main = document.querySelector("main");
//variabel der tager fat i "template" taggets indhold.
const template = document.querySelector("template").content;
//eventlistener der sætter funktionen "start" igang når siden er loaded.
document.addEventListener("DOMContentLoaded", start);
//eventlistener der lytter til når der trykkes på "#menuknap" skal den gå i gang med funktionen "toggleMenu".
document.querySelector("#menuknap").addEventListener("click", toggleMenu);
let lande;
//variabel der definerer indhold med teksten "alle".
let filter = "alle";


function start() {
    //variabel der tager fat i ALLE knapperne i nav.
    const filterKnapper = document.querySelectorAll("nav button");
    //en "forEach" der lytter til når der bliver klikket på hvilken som helst knap i nav. Når der klikkes på en knap i nav skal funktionen "filtrerLande" træde i kraft.
    filterKnapper.forEach(knap => knap.addEventListener("click", filtrerLande));
    //når denne function er i gang, skal den også kalde "hentData" funktionen.
    hentData();
}

function filtrerLande() {
    //her tages der fat i netop det element der er trykket på, ved brug af "this".
    filter = this.dataset.destination;
    //fjerner klassen "valgt", som er defineret i css, fra det element som tidligere havde class="valgt" på sig.
    document.querySelector(".valgt").classList.remove("valgt");
    //tilføjer klassen valgt til det element som er trykket på.
    this.classList.add("valgt");
    //når denne function kaldes, skal function "vis" også kaldes.
    vis();
}

//en ikke-blokerende function der henter data fra restdb.
async function hentData() {
    //her hentes der data ud fra de forrignævnte variabler "url", "options".
    const respons = await fetch(url, options);
    lande = await respons.json();
    console.log("Lande", lande);
    vis();
}

function vis(json) {
    //i konsollen vises der informationer hentet fra json.
    console.log(json);
    main.textContent = "";
    //en forEach der lytter til en if statement.
    lande.forEach(land => {
        //hvis variablen "filter" er det samme som land.destination OG hvis variablen "filter" er det samme som teksten "alle", skal der lyttes til den følgende kodning.
        if (filter == land.destination || filter == "alle") {
            //her klones template-tagget fra html'en.
            const klon = template.cloneNode(true);
            //herunder sættes der indhold fra restdb, på de elementer som er valgt fra html'en.
            klon.querySelector("img").src = medieurl + land.billede;
            klon.querySelector("h3").textContent = land.City;
            //function visDetaljer skal gå i gang hvis der klikkes på "article"-tags.
            klon.querySelector("article").addEventListener("click", () => visDetaljer(land));
            main.appendChild(klon);
        }
    })
}

//function som henviser til en anden html, som her er et single-view.
function visDetaljer(hvad) {
    location.href = `lande_singleview.html?id=${hvad._id}`;
}
