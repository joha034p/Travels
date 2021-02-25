window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("sidenVises");
    document.querySelector("#menuknap").addEventListener("click", toggleMenu);
    const menuKnapper = document.querySelectorAll("nav a");
    menuKnapper.forEach(knap => knap.addEventListener("click", valgtKnap));
}

//nav .menu vis hvor på sitet man er.
function valgtKnap() {
    document.querySelector(".valgtMenu").classList.remove("valgtMenu");
    this.classList.add("valgtMenu");
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

//respons på kontakt siden efter man har sendt en besked
function openThank() {
    console.log("open thank");
    document.getElementById("thank").classList.remove("remove");
}

function closeThank() {
    document.getElementById("thank").classList.add("remove");
}
