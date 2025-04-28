
const firebaseConfig = {
    apiKey: "AIzaSyDWkgzZeTcQOGgDFC6UFs0LUA72KHtOG_4",
    authDomain: "psswdmanager-68a29.firebaseapp.com",
    projectId: "psswdmanager-68a29",
    storageBucket: "psswdmanager-68a29.appspot.com",
    messagingSenderId: "18800570825",
    appId: "1:18800570825:web:5e8580cb73e6c3b155f818"
  };

  // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  
    const db = firebase.firestore();
    document.getElementById("pull_up").addEventListener("click" ,() =>{
    document.getElementById("registerForm").style.transform = "translateY(-20px)";
    document.getElementById("loginform").style.transform = "translateY(-520px)";



    // document.querySelector(".signin_with_github").style.transform = "translateY(-585px) translateX(-190px)"
})

document.getElementById("pull_down").addEventListener("click" ,() =>{
    document.getElementById("registerForm").style.transform = "translateY(520px)";
    document.getElementById("loginform").style.transform = "translateY(0px)";

})

document.getElementById("forgot_password_login_page_link").addEventListener("click", () => {
    document.getElementById("loginform").style.opacity = 0;
    document.getElementById("loginform").style.pointerEvents = "none";
    document.getElementById("registerForm").style.opacity = 0;
    document.getElementById("registerForm").style.pointerEvents = "none";
    document.getElementById("LogoutForm").style.transform = "translateY(1204px)";
    document.getElementById("ForgetPasswordForm").style.transform = "translateY(0)";
    document.getElementById("signin_with_google").style.display = "none";
    document.getElementById("signin_with_github").style.display = "none";
})

document.getElementById("reLogin").addEventListener("click", () => {
    document.getElementById("registerForm").style.transform = "translateY(520px)";
    document.getElementById("loginform").style.transform = "translateY(0px)";
    document.querySelector(".signin_with_google").style.transform = "translateY(0px) translateX(0px)"
    document.querySelector(".signin_with_github").style.transform = "translateY(0px) translateX(0px)"
    document.getElementById("ForgetPasswordForm").style.transform = "translateY(1204px)";
    document.getElementById("signin_with_google").style.display = "block";
    document.getElementById("signin_with_github").style.display = "block";
    document.getElementById("loginform").style.opacity = 1;
    document.getElementById("loginform").style.pointerEvents = "all";
    document.getElementById("registerForm").style.opacity = 1;
    document.getElementById("registerForm").style.pointerEvents = "all";

})
if (localStorage.getItem("CurUsername")) 
{
    db.collection("users").doc(localStorage.getItem("CurUsername").toLowerCase()).get().then((doc) => {
        document.getElementById("profilePicData").setAttribute("src",  doc.data().user_logo);

    });
        
    document.getElementById("loginform").style.opacity = 0;
    document.getElementById("loginform").style.pointerEvents = "none";
    document.getElementById("registerForm").style.opacity = 0;
    document.getElementById("registerForm").style.pointerEvents = "none";
    document.getElementById("LogoutForm").style.transform = "translateY(0)";
    document.getElementById("signin_with_google").style.display = "none";
    document.getElementById("signin_with_github").style.display = "none";

}
else
{
    document.getElementById("loginform").style.opacity = 1;
    document.getElementById("loginform").style.pointerEvents = "all";
    document.getElementById("registerForm").style.opacity = 1;
    document.getElementById("registerForm").style.pointerEvents = "all";

    document.getElementById("LogoutForm").style.transform = "translateY(1204px)";
    document.getElementById("LogoutForm").style.opacity = 0;
    document.getElementById("LogoutForm").style.pointerEvents = "none";
    
} 

function typeWriterErrorHTML(idOfTextHolder, textToType, speed) {
    var i = 0;
    var speed = speed || 25; // Default speed if not provided
    document.getElementById(idOfTextHolder).innerHTML = "";
    function type() {
        if (i < textToType.length) {
            document.getElementById(idOfTextHolder).innerHTML += textToType.charAt(i);
            i++;
            setTimeout(type, speed);
        }
         if(i == textToType.length )
         {
            setTimeout(() => {
                document.getElementById(idOfTextHolder).innerHTML = "";
            }, 4000);
         }
    }
    type(); // Call the function to start the typing effect
}

function LoginError(errorLogin)
{
    typeWriterErrorHTML("ErrorLog", errorLogin);
}

function RegisterError(errorRegister)
{
    typeWriterErrorHTML("ErrorReg", errorRegister);

}
function ForgotPasswordError(errorForgotPassword)
{
    typeWriterErrorHTML("ErrorForgetPassword", errorForgotPassword);
}


// const message = 'Hello, world!';
// const hash = SHA256(message).toString();
// console.log(`Hash: ${hash}`);

