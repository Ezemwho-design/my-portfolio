/*for nav menu bar at max-width of 600px*/
let bugger = document.querySelector(".bugger");
bugger.onclick = () =>{
    //console.log("bugger is active");
    document.querySelector(".bugger").classList.toggle("buggerActive");
    document.querySelector(".buger-controled").classList.toggle("bgControlActive");
}

const SignUpForm = document.getElementById('signUpForm');
const signInForm = document.getElementById('signInForm');
const submit = document.querySelector(".submit");
const sendMsgForm = document.getElementById('send-massage');
const signIn = document.querySelector(".sign-in");
const signUp = document.querySelector(".sign-up");
const submitSub = document.querySelector(".submitSub");
const subEmail = document.querySelector(".subEmail");
const Start = document.querySelector(".forNav");
const cancel = document.querySelectorAll(".cancel");
const nav = document.getElementById('nav-bar');
const welcomeMassage = document.getElementById('welcomeMassage');
const sendMessage = document.querySelector(".send-massage");
const userName = document.getElementById('userName');

//form display onclick of subscribe button in nav
document.addEventListener('DOMContentLoaded', function() {
    const subscribeButton = document.getElementById('subscribe');
    subscribeButton.onclick = function(event) {
        event.preventDefault();
        //console.log("button is clickable");
        if (subEmail.style.display === 'none') {
        //console.log("display is equal to none");
        subEmail.style.display = 'flex';
        submitSub.style.display = 'flex';
    }
    else{
       // console.log("display is equal to flex");
        subEmail.style.display = 'none';
        submitSub.style.display = 'none';
    }
    };
});

//subscribe submision button onsubmit
const subscribeForm = document.getElementById('subscribeForm');
subscribeForm.onsubmit = (event) =>{
    //console.log("submit is  running");
     // To prevent the default form submission behavior
    event.preventDefault();
     // Get the email input value
     emailInput = subEmail.value ;
     subEmail.value = "";
     let userEmail = {
        email: emailInput
     }
    // Regular expression for basic email validation
    emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Check if the email matches the pattern
    if (emailPattern.test(emailInput)) {

         //service and template id from emailjs.com
        const serviceID = "service_xzejxmu";
        const templateID = "template_yt7365s";
        //send massage to my email through emailjs.com
        emailjs.send(serviceID, templateID, userEmail)
        .then(
        (res) => {
            subEmail.value = "";
            console.log(res);
            alert("your message sent succesfully");
            }
        ) .catch((err) => console.log(err));

               showAlert ();
    } else {
        // If invalid, alert the user and prevent form submission
        alert('Please enter a valid email address.');
    }
}
//thank you masage alert
function showAlert (){
    subEmail.style.display = 'none';
    submitSub.style.display = 'none';
    alertMassage = `
      <div class="thankYouMessage hidden" id="thankYouMessage" >
                <p>Thank you for subscribing! Please also subscribe to our YouTube channel</p>
                <div class="subLink">
                    <a href="" class="subYoutube">
                        <button class="button">Subscribe</button>
                    </a>
                    <h2 id="button" class="subCancel">+</h2>
                </div>
    `
    alertBox = document.createElement('div');
    alertBox.innerHTML = alertMassage;
    document.body.appendChild(alertBox); //displays what is in the alertBox

    document.querySelector(".subYoutube").onclick = (event) =>{
        event.preventDefault();
        window.open('https://www.youtube.com/@ezemuonyechinedu8046?sub_confirmation=1', '_blank');
        document.body.removeChild(document.body.lastChild);
        //console.log("subscribe is running");
    }
    document.querySelector(".subCancel").onclick = () =>{
        //console.log("cancel is runing");
        //alert('Subscription cancelled.');
        document.body.removeChild(document.body.lastChild);
    }
}

//for the 'let's get started', let's talk, and 'hire me' buttons in HTML for sign up form
let open = document.querySelectorAll(".submit");
open.forEach (function(each){
    each.onclick = (list) =>{
        change = list.currentTarget.classList;
        if (change.contains("forNav") || change.contains("forAbout") || change.contains("forHire")){
            if (signUp.classList.contains("sign-up") || submit.classList.contains("submit")){
                signUp.classList.toggle("show");
                submit.classList.toggle("submitActive");
                nav.style.filter = 'blur(1.5px)';
                
                }
            }
    }
})

cancel.forEach (function(each){
    each.onclick = (list) =>{
        change = list.currentTarget.classList;
        nav.style.filter = 'none';
        if(change.contains("sign-up-cancel")){
            Start.style.display = 'flex';
            signUp.classList.toggle("show");
        }
        if( change.contains("sign-in-cancel")){
            Start.style.display = 'flex';
            signIn.style.display = 'none';
        }
        if( change.contains("send-msg-btn")){
            Start.style.display = 'flex';
            sendMessage.style.display = 'none';
        }
    }
})

// Retrieve existing users from localStorage
let basket = JSON.parse(localStorage.getItem("user" || "allSendMsg")) || [];

// Function to generate a unique ID
async function generateUniqueId(signUpEmail, newPassword) {
    const data = signUpEmail+ newPassword;
    const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(data));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return 'user-' + hashHex;
}

// Signup submission form onsubmit
SignUpForm.addEventListener('submit', async function(event) {
    //console.log("signup form submitted");
    event.preventDefault();

    // Reset error messages
    let errorForName = document.getElementById('errorForName');
    let errorForEmail = document.getElementById('errorForEmail');
    let errorForPswd = document.getElementById('errorForPswd');
    let errorForNewPswd = document.getElementById('errorForNewPswd');
    errorForName.innerHTML = '';
    errorForEmail.innerHTML = '';
    errorForPswd.innerHTML = '';
    errorForNewPswd.innerHTML = '';
    
    let signUpName = document.getElementById('name').value.trim();
    let signUpEmail = document.getElementById('email').value.trim();
    let newPassword = document.getElementById('newPassword').value.trim();
    let confirmPassword = document.getElementById('confirmPassword').value.trim();
    
    let isValid = true;
    
    // Confirm name format
    if (!/^\S+\s+\S+$/.test(signUpName)) {
        errorForName.innerHTML = 'Name must include both first and last name.';
        document.getElementById('name').value = '';
        isValid = false;
    }
    // Validate email
    if (!/^(?:[^\s@]+@[^\s@]+\.[^\s@]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,})$/.test(signUpEmail)) {
        errorForEmail.innerHTML = "Invalid email";
        isValid = false;
    }
    // Validate password strength
    if (newPassword.length < 8 || !/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
        errorForPswd.innerHTML = 'Password must be at least 8 characters long and include uppercase, lowercase, and a number.';
        isValid = false;
    }
    // Confirm password
    if (newPassword !== confirmPassword) {
        errorForNewPswd.innerHTML = 'Passwords do not match.';
        isValid = false;
    }

    // If form details are correct
    if (isValid) {
        let userId = await generateUniqueId(signUpEmail, newPassword);
        const user = {
            id: userId,
            name: signUpName.toLowerCase(),
            email: signUpEmail.toLowerCase(),
            password: newPassword
        }
        //console.log(user);

        //search and get the email of each user from the basket
        let search = basket.find((x) => x.id === userId);

        //if the form on registering is not in the basket
        if(search === undefined){
            // Add the new user to the array
            basket.push(user);
            //store the data after being pushed
            localStorage.setItem("user", JSON.stringify(basket));
            //clear the form
            // Change page from sign up page to log in page
            signUp.classList.toggle("show");
            signIn.style.display = 'flex';
            this.reset();
        }else{
            //console.log('user already exist');
            errorForEmail.innerHTML = "email already exist";
        }
    }
});


signInForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    //console.log("sign in form has been clicked");
    const errorForLoginForm = document.getElementById('errorFor-login-form');
    const errorLoginEmailMsg = document.getElementById('errorFor-input-Name');
    const errorLoginPswdMsg = document.getElementById('errorFor-input-password');
    errorForLoginForm.innerHTML = ' ';
    errorLoginEmailMsg.innerHTML = ' ';
    errorLoginPswdMsg.innerHTML = ' ';

    const loginEmail = document.getElementById('loginEmail').value.trim();
    const loginPassword = document.getElementById('loginPassword').value.trim();

    // Retrieve existing users from localStorage
    let basket = JSON.parse(localStorage.getItem("user")) || [];

// Check if email and password inputs are empty
if (!loginEmail || !loginPassword) {
    errorForLoginForm.innerHTML = "No user with that details";
} else {
    // Search and get the email of each user from the basket
    let search = basket.find((x) => x.email === loginEmail);

    if (search) {
        if (search.password !== loginPassword) {
            //console.log("Incorrect password");
            errorLoginPswdMsg.innerHTML = "Incorrect password.";
        } else {
            // Store the data after being matched
            //localStorage.setItem("User", JSON.stringify(basket));
            userName.innerHTML = `Hello ${search.name}`;
            //console.log(search.email);
            // window.location.href = 'https://web.facebook.com/profile.php?id=100083717382670';
            sendMessage.style.display = 'flex';
            signIn.style.display = 'none';
            //Start.classList.remove("submitActive");
            //nav.style.filter = 'none';
            this.reset();
        }
    } else {
        errorLoginEmailMsg.innerHTML = "This email is not registered yet.";
    }
}

});

sendMsgForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const msgName = document.getElementById('msg-name').value;
    const msgEmail = document.getElementById('msg-email').value;
    const msgText = document.getElementById('msg-text').value;
    const subjectMsg = document.getElementById('subject-msg').value;

    const gnrlMsgName = document.getElementById('gnrlMsgName');
    const errorFrmsgName = document.getElementById('error-fr-msg-name');
    const errorFrmsgEmail = document.getElementById('error-fr-msg-email');

    // Clear previous error messages
    gnrlMsgName.innerHTML = "";
    errorFrmsgName.innerHTML = "";
    errorFrmsgEmail.innerHTML = "";

    // Retrieve existing users from localStorage
    let basket = JSON.parse(localStorage.getItem("user" || "allSendMsg")) || [];
    
    // Convert the name to lower case
    const inputName = msgName.toLowerCase();
    
    let allSendMsg  = {
        name: inputName,
        email: msgEmail,
        service: subjectMsg,
        text: msgText
    }
    // Check if any of the form fields are empty
    if (!allSendMsg.name || !allSendMsg.email || !allSendMsg.service || !allSendMsg.text) {
        gnrlMsgName.innerHTML = "All form fields must be filled";
        //console.log('no user');
        return; // Exit the function if any field is empty
    }
    
    // Find the user in the basket
    let user = basket.find((x) => x.name === allSendMsg.name);
    
    if (!user) {
        errorFrmsgName.innerHTML = "This name is not registered yet.";
        //console.log("Incorrect name");
    } else if (user.email !== allSendMsg.email) {
        errorFrmsgEmail.innerHTML = "This email is not registered.";
        //console.log("Incorrect email");
    } else {
        basket.push(allSendMsg);
        localStorage.setItem("allSendMsg", JSON.stringify(basket));
        // User exists and name matches

        //service and template id from emailjs.com
        const serviceID = "service_zpnnl5f";
        const templateID = "template_rnpnazc";

        //send massage to my email through emailjs.com
        emailjs.send(serviceID, templateID, allSendMsg)
        .then(
          (res) => {
            inputName.value = "";
            msgEmail.value = "";
            subjectMsg.value = "";
            msgText.value = "";
            console.log(res);
            alert("your message sent succesfully");
          }
       ) .catch((err) => console.log(err));

        //console.log("submitted", sendEmail.name);
        sendMessage.style.display = 'none';
        Start.classList.remove("submitActive");
         nav.style.filter = 'none';
        this.reset();
    }
});

//readmore button for service section in HTML
const readMore = document.querySelectorAll('.read-more-btn');  
readMore.forEach(button => {
    button.addEventListener('click', () => {
      const article = button.parentElement;
      const dots = article.querySelector('.dots');
      const moreText = article.querySelector('.more');
  
      if (dots.style.display === 'none') {
        dots.style.display = 'inline';
        button.textContent = 'Read more';
        moreText.style.display = 'none';
      } else {
        dots.style.display = 'none';
        button.textContent = 'Read less';
        moreText.style.display = 'inline';
      }
    });
  });

 /* //function to send email on submit
 function sendEmail(){
    var params = {
        name: document.getElementById('msg-name').value,
        email: document.getElementById('msg-email').value,
        subject: document.getElementById('subject-msg').value,
        message: document.getElementById('msg-text').value

    }
    
      const serviceID = "service_0a5pywo";
      const templateID = "template_rnpnazc";
    
      emailjs.send(serviceID, templateID, params)
      .then(
        (res) => {
            document.getElementById('msg-name').value = "";
            document.getElementById('msg-email').value = "";
            document.getElementById('subject-msg').value = "";
            document.getElementById('msg-text').value = "";
            console.log(res);
            alert("your message sent succesfully");
        }
     ) .catch((err) => console.log(err));
  }

 /* function sendEmail(){
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "eelyondesign@gmail.com",
        Password : "FCA5A204809C5D8FC0EF205785ED82216039",
        To : 'eelyondesign@gmail.com',
        From : document.getElementById('email').value,
        Subject : "This is the subject",
        Body : "And this is the body"
    }).then(
      message => alert(message)
    );
  }*/