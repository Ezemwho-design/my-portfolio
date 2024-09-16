let bugger = document.querySelector(".bugger");
bugger.onclick = () =>{
    document.querySelector(".bugger").classList.toggle("buggerActive");
    document.querySelector("ul").classList.toggle("ulActive");
}

const subscribeBtn = document.getElementById('btn');
const emailInput = document.getElementById('email');
const submitInput = document.getElementById('submit');
subscribeBtn.addEventListener('click', () =>{
    if (emailInput.style.display === 'none'){
        //console.log("subscribe form is running");
        emailInput.style.display = 'flex';
        submitInput.style.display = 'flex';
    }
    else{
        //console.log("subscribe form has stopped running");
        emailInput.style.display = 'none';
        submitInput.style.display = 'none';
    }
})

const form = document.getElementById('subscribeForm');
const thankYouMasage = document.getElementById('form');
form.onsubmit = function(event) {
    console.log("form has been submited");
    event.preventDefault();
    emailInput.value = '';
    form.style.display = 'none';
    thankYouMasage.style.display = 'flex';
}

const cancel = document.getElementById('cancel');
cancel.onclick = () =>{
    //console.log("cancel is running");
    thankYouMasage.style.display = 'none';
    form.style.display = 'flex';
    emailInput.style.display = 'none';
    submitInput.style.display = 'none';
}

const add = document.getElementById('add');
add.onclick = () =>{
    console.log("add button is running");
    thankYouMasage.style.display = 'none';
    form.style.display = 'flex';
    emailInput.style.display = 'none';
    submitInput.style.display = 'none';
}

let open = document.querySelectorAll(".submit");
open.forEach (function(each){
    each.onclick = (list) =>{
        change = list.currentTarget.classList;
        if (change.contains("forNav")){
            signUp = document.querySelector(".sign-up");
            submit = document.querySelector(".submit");
            
            if (signUp.classList.contains("sign-up") || submit.classList.contains("submit")){
                signUp.classList.toggle("show");
                submit.classList.toggle("submitActive");
                }
            }
            if (change.contains("forAbout")){
                signUp = document.querySelector(".sign-up");
                submit = document.querySelector(".submit");
                if (signUp.classList.contains("sign-up") || submit.classList.contains("submit")){
                    signUp.classList.toggle("show");
                    submit.classList.toggle("submitActive");
                    }
            }
            if(change.contains("forHire")){
                signUp = document.querySelector(".sign-up");
                submit = document.querySelector(".submit");
                if (signUp.classList.contains("sign-up") || submit.classList.contains("submit")){
                    signUp.classList.toggle("show");
                    submit.classList.toggle("submitActive");
                    }
            }
    }
})

let signUpCancel = document.querySelector(".cancel");
signUpCancel.onclick = () =>{
    signUp.classList.remove("show");
    submit.classList.remove("submitActive");
    }


    

