document.getElementById("registerForm").style.transform = "translateY(520px)";
document.getElementById("loginform").style.transform = "translateY(0px)";
document.getElementById("usrEmailInp").focus();
today  = new Date();
var date = today.getDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear() ; //gives the  current date to the system


  
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


    var emailReg = document.getElementById("usrEmailInpReg").value;
    var passwordReg = document.getElementById("usrPwdInpReg").value;
    var confPasswordReg = document.getElementById("usrPwdConfInpReg").value;
    let timer;
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = 8;
    var generated_password = "";


function isEmail(emailAdress){

if (emailAdress.match(regex)) 
return true;
else 
return false; 
}

document.getElementById("usrEmailInpReg").addEventListener("input", () => {
    var emailReg = document.getElementById("usrEmailInpReg").value;
    if(isEmail(emailReg) == true)
    {
    document.getElementById("validEmail").style.transform = "translateX(50px)";
    }
    else
    {
        document.getElementById("validEmail").style.transform = "translateX(150px)";

    }
    emailReg.length == 0 ? document.getElementById("validUser").style.transform = "translateX(150px)" : null;
})

function isUser(userName)
{
    if(userName.trim() != "")
    {
        var usrFind = db.collection("users").doc(userName);
        usrFind.get().then((doc) => {
            if(doc.exists)
            {
                document.getElementById("validUser").style.transform = "translateX(150px)";
                document.querySelector(".usrNameInpReg").style.color = "red";
                return false;
            }
            else
            {
                document.querySelector(".usrNameInpReg").style.color = "#fff";
                document.getElementById("validUser").style.transform = "translateX(50px)";
                return true;
            }
        });
    }
    else
    {
        return false;
    }
    if(userName.length < 5)
    {
        return false;
    }
}


document.getElementById("usrNameInpReg").addEventListener("keyup", (e) => {
    
    clearTimeout(timer);
    timer = setTimeout(() => {
        globalThis.userNameReg = document.getElementById("usrNameInpReg").value.toLowerCase();
        isUser(userNameReg);
    
        }, 500);
        
        document.getElementById("usrNameInpReg").value.length == 0 ? document.getElementById("validUser").style.transform = "translateX(150px)" : null;

})

function isPass(password, confPass)
{
    if((password.trim() == "") || (confPass.trim() == ""))
    {
        return false;
    }
    else if((password == confPass) && (password.length > 6))
    {
        document.querySelector(".usrPwdInpReg").style.color = "white";
        document.querySelector(".usrPwdConfInpReg").style.color = "white";
        return true;
        
    }
    else if((password != confPass))
    {
        document.querySelector(".usrPwdInpReg").style.color = "red";
        document.querySelector(".usrPwdConfInpReg").style.color = "red";
        return false;
    }
    else if(password.length < 6)
    {
        RegisterError("Password too Short!");
        document.querySelector(".usrPwdInpReg").style.color = "red";
        document.querySelector(".usrPwdConfInpReg").style.color = "red";
        return false; 
    }
    else if(password.length >  15)
    {
        RegisterError("Password too Long");
        document.querySelector(".usrPwdInpReg").style.color = "red";
        document.querySelector(".usrPwdConfInpReg").style.color = "red";
        return false; 
    }
    else
    {
        return false;
    }
}

document.getElementById("usrPwdInpReg").addEventListener("input", (e) => {
    confPassValue = document.getElementById("usrPwdConfInpReg").value;
    passValue = document.getElementById("usrPwdInpReg").value;
    isPass(passValue, confPassValue);
})

document.getElementById("usrPwdConfInpReg").addEventListener("input", (e) => {
    PassValue = document.getElementById("usrPwdInpReg").value;
    confPassValue = document.getElementById("usrPwdConfInpReg").value;
    isPass(PassValue, confPassValue);
})


function authUser()
{

    const numberOfTilesSpawned = document.querySelectorAll(".tile").length;
    // console.log(numberOfTilesSpawned)
      document.getElementById("successLoaderContainer").classList.add("OpacityActive");
      var TilesAnimationInterval = setInterval(() => {
          var n = Math.floor(Math.random() * (numberOfTilesSpawned - 0 + 1)) + 0;
         document.querySelectorAll(".tile")[n].click();
        }, 1300 );
    globalThis.userNameLogin = document.getElementById("usrEmailInp").value.toLowerCase().trim();
    var passwordLogin = document.getElementById("usrPwdInp").value.trim();
    var docRef = db.collection("users").doc(userNameLogin);

    docRef.get().then((doc) => { //gets the whole data against the entered email address
        if (doc.exists) 
        {
            console.log(doc.data())
           passwordFRomServer = doc.data().password; //gets the username from the doc
            if(passwordLogin == passwordFRomServer)
            {
                setTimeout(() => {
                    document.getElementById("successLoaderContainer").classList.remove("OpacityActive");
                    
                    clearInterval(TilesAnimationInterval);
                  }, 3300);
                  localStorage.setItem("CurUsername", userNameLogin);
                redirectTo("password/");
            }
            else
            {
                setTimeout(() => {
                    document.getElementById("successLoaderContainer").classList.remove("OpacityActive");
                    
                    clearInterval(TilesAnimationInterval);
                  }, 3300);
                LoginError("Seems like Password is Lost in Vaccation!");
            }
        }
        else
        {
            setTimeout(() => {
                document.getElementById("successLoaderContainer").classList.remove("OpacityActive");
                
                clearInterval(TilesAnimationInterval);
              }, 3300);
            LoginError("Account Doesn't Exist, Please Register!");
            setTimeout(() => {
                document.getElementById("usrEmailInp").value = "";
                document.getElementById("usrPwdInp").value = "";
                document.getElementById("registerForm").style.transform = "translateY(-20px)";
                document.getElementById("loginform").style.transform = "translateY(-520px)";
            }, 2000);
        }
    })
}
function regUser() 
{
    var emailReg = document.getElementById("usrEmailInpReg").value.trim();
    var passwordReg = document.getElementById("usrPwdInpReg").value.trim();
    var confPasswordReg = document.getElementById("usrPwdConfInpReg").value.trim();
    globalThis.userNameReg = document.getElementById("usrNameInpReg").value.trim().toLowerCase();
    RegisterError("");

    if(isEmail(emailReg) == false)
    {
        RegisterError("Enter a Valid Email");
        
    }
    if(isUser(userNameReg) == false)
    {
        document.getElementById("validUser").style.transform = "translateX(150px)";
        document.querySelector(".usrNameInpReg").style.color = "red";
    }
    if(isPass(passwordReg, confPasswordReg) == false)
    {
        document.querySelector(".usrPwdConfInpReg").style.color = "red";
        document.querySelector(".usrPwdInpReg").style.color = "red";

    }   
    else
    {
    const numberOfTilesSpawned = document.querySelectorAll(".tile").length;
      document.getElementById("successLoaderContainer").classList.add("OpacityActive");
      var TilesAnimationInterval = setInterval(() => {
          var n = Math.floor(Math.random() * (numberOfTilesSpawned - 0 + 1)) + 0;
         document.querySelectorAll(".tile")[n].click();
        }, 1300 );

        firebase.auth().createUserWithEmailAndPassword(emailReg, passwordReg)
            .then((userCredential) => {
                var user = userCredential.user //contains the user credentials
                db.collection('users').doc(userNameReg.toLowerCase()).set({
                    username : userNameReg.toLowerCase(),
                    password : passwordReg,
                    email : emailReg,
                    uid : user.uid,
                    displayName : userNameReg,
                    dateCreated: date,
                    isDev : "DEV",
                    otp: 0,
                    provider : "Firebase",
                    lastPasswordChange: date,
                    user_logo: "https://firebasestorage.googleapis.com/v0/b/psswdmanager-68a29.appspot.com/o/OfficialFiles%2Fuser_logo_defualt.jpg?alt=media&token=2e4e1159-2536-4f9e-866d-f9942f9e2d3d",
                })
                var templateParams = {
                    name: user.displayName,
                    service_name : "Firebase",
                    email_provided : emailReg,
                };
                emailjs.send('service_lw32yzm', 'template_jqmgo3l', templateParams)
              
                .then(function(response) {
                   console.log('SUCCESS!', response.status, response.text);
                }, function(error) {
                   console.log('FAILED...', error);
                });

            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                errorMessage == "The email address is already in use by another account." ? RegisterError("The email address is already in use"): RegisterError(errorMessage);
              });

              
    }
document.getElementById("usrEmailInpReg").value = "";
   document.getElementById("usrPwdInpReg").value = "";
   document.getElementById("usrPwdConfInpReg").value = "";
   document.getElementById("usrNameInpReg").value = "";
    document.getElementById("registerForm").style.transform = "translateY(520px)";
    document.getElementById("loginform").style.transform = "translateY(0px)";

    setTimeout(() => {
        document.getElementById("successLoaderContainer").classList.remove("OpacityActive");
        clearInterval(TilesAnimationInterval);
      }, 3300);
   


}


function GenPwd()
{
    generated_password = "";
    for (var i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        generated_password += chars.substring(randomNumber, randomNumber +1);
       }
       document.getElementById("usrPwdInpReg").value = generated_password;
       document.getElementById("usrPwdConfInpReg").value = generated_password;
       document.getElementById("SeePwd").classList.remove("hidden");
       document.getElementById("SeePwdConf").classList.remove("hidden");
    setTimeout(() => {
        document.getElementById("SeePwd").classList.add("hidden");
        document.getElementById("SeePwdConf").classList.add("hidden");

    }, 2500);
}

document.getElementById("SeePwd").addEventListener("click", () => {
    document.getElementById("SeePwd").classList.contains("hidden") ? (document.getElementById("SeePwd").classList.remove("hidden")) (document.getElementById("SeePwd").setAttribute("name", "eye-off")) : (document.getElementById("SeePwd").classList.add("hidden")) (document.getElementById("SeePwd").setAttribute("name", "eye"));
});
document.getElementById("SeePwdConf").addEventListener("click", () => {
    document.getElementById("SeePwdConf").classList.contains("hidden") ? (document.getElementById("SeePwdConf").classList.remove("hidden")) (document.getElementById("SeePwdConf").setAttribute("name", "eye-off")) : (document.getElementById("SeePwdConf").classList.add("hidden")) (document.getElementById("SeePwdConf").setAttribute("name", "eye"));
});
document.getElementById("GenPwd").addEventListener("click", () => {
    document.getElementById("usrPwdInpReg").value = "";
    document.getElementById("usrPwdConfInpReg").value = "";
    GenPwd();
})

function togglePasswordvisibility()
{
    document.getElementById("SeePwd").classList.contains("hidden") ? document.getElementById("usrPwdInpReg").setAttribute("type", "password") : document.getElementById("usrPwdInpReg").setAttribute("type", "text");
    document.getElementById("SeePwdConf").classList.contains("hidden") ? document.getElementById("usrPwdConfInpReg").setAttribute("type", "password") : document.getElementById("usrPwdConfInpReg").setAttribute("type", "text");
}
setInterval(() => {
    togglePasswordvisibility();
}, 500);

document.getElementById("submitEntryCardReg").addEventListener("click", () => {
    regUser();
});

document.getElementById("submitEntryCard").addEventListener("click", () => {
    document.getElementById("usrEmailInp").value.length && document.getElementById("usrPwdInp").value.length > 0 ? authUser() : LoginError("Empty Username & Password? Nah man!");
    
});

// console.log(Math.round(document.getElementById("usrPwdInpReg").getBoundingClientRect().left) - 10);
