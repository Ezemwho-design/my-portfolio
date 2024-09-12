let bugger = document.querySelector(".bugger");
bugger.onclick = () =>{
    document.querySelector(".bugger").classList.toggle("buggerActive");
    document.querySelector("ul").classList.toggle("ulActive");
}