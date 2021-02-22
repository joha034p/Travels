const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const header = document.querySelector("header");
const medieurl = "https://justjourney-1298.restdb.io/media/";
const myHeaders = {
    "x-apikey": "602f73905ad3610fb5bb639c"
}
let lande;


console.log("ID", id);
document.addEventListener("DOMContentLoaded", loadJSON);

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
    console.log(medieurl + land.billede);
    document.querySelector(".billede").src = medieurl + land.billede;
    document.querySelector(".stort_billede").src = medieurl + land.billede;
    document.querySelector(".longdescription").textContent = land.longdescription + " ";
    document.querySelector("h1").textContent = land.destination + " ";
    document.querySelector("h4").textContent = land.shortdescription + " ";
    document.querySelector("h3").textContent = land.City + " ";


}
