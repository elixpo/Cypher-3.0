globalThis.last_fetched_unique_id;
globalThis.blockCounter = 0;
globalThis.ViewMode = "ReadOnly"; //ReadOnly || Editable || Editing
let initialLoad = true;
let lastTouchEnd = 0;
const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var passwordLength = 8;
var generated_password = "";
var showAddPwd;
var ViewModeReadOnlyTimer;

const default_logo  = "https://firebasestorage.googleapis.com/v0/b/psswdmanager-68a29.appspot.com/o/OfficialFiles%2Fuser_logo_defualt.jpg?alt=media&token=2e4e1159-2536-4f9e-866d-f9942f9e2d3d"
const google  = "https://firebasestorage.googleapis.com/v0/b/psswdmanager-68a29.appspot.com/o/OfficialFiles%2FGoogle__G__logo.svg.png?alt=media&token=9c6e22bb-dfb0-4368-89c9-2372ba57762c"
const twitter  = "https://firebasestorage.googleapis.com/v0/b/psswdmanager-68a29.appspot.com/o/OfficialFiles%2FLogo_of_Twitter.svg.png?alt=media&token=93468f9a-5119-472d-a104-e3e70c5b76c7"
const facebook  = "https://firebasestorage.googleapis.com/v0/b/psswdmanager-68a29.appspot.com/o/OfficialFiles%2FFacebook_Logo_2023.png?alt=media&token=4cb37d2f-8b86-4ba3-ae0d-ecaa3a0d66cd"
const whatsapp = "https://firebasestorage.googleapis.com/v0/b/psswdmanager-68a29.appspot.com/o/OfficialFiles%2Fwhatsapp-6273368_1280.png?alt=media&token=89901647-d012-4a69-b678-69b0a3c83370"
const figma  = "https://firebasestorage.googleapis.com/v0/b/psswdmanager-68a29.appspot.com/o/OfficialFiles%2Ffigmalogo.jpg?alt=media&token=05f56181-eb24-48a6-9ba4-956a612ced22"
const canva  = "https://firebasestorage.googleapis.com/v0/b/psswdmanager-68a29.appspot.com/o/OfficialFiles%2Fcanva%20log.jpeg?alt=media&token=14873fa8-a591-4548-b5a9-c80423526719"
const openai  = "https://firebasestorage.googleapis.com/v0/b/psswdmanager-68a29.appspot.com/o/OfficialFiles%2Fopenai-icon-2021x2048-4rpe5x7n.png?alt=media&token=69583699-74af-49e7-b3aa-5b7ff9c8a8bc" 
const instagram = "https://firebasestorage.googleapis.com/v0/b/psswdmanager-68a29.appspot.com/o/OfficialFiles%2Finstagram.jpeg?alt=media&token=6e0e915f-d3fa-45b9-a57d-4eb69dd1fab7"
const github = "https://firebasestorage.googleapis.com/v0/b/psswdmanager-68a29.appspot.com/o/OfficialFiles%2Fgithub%20logo.png?alt=media&token=074703b5-9535-4a73-b140-fb0301630003"

const visacard = "https://firebasestorage.googleapis.com/v0/b/psswdmanager-68a29.appspot.com/o/OfficialFiles%2Fvisa%20card.jpg?alt=media&token=7247a729-2bdc-4341-970b-54c621edcc6f"
const americanExpress = "https://firebasestorage.googleapis.com/v0/b/psswdmanager-68a29.appspot.com/o/OfficialFiles%2Famerican%20logo%20card.jpg?alt=media&token=b9eb5d85-1e35-4ff0-98ea-5fc9ae3095dc";
const mastercard = "https://firebasestorage.googleapis.com/v0/b/psswdmanager-68a29.appspot.com/o/OfficialFiles%2Fmastercard.png?alt=media&token=bd60d3c3-5bf5-4432-acd2-9e3c34069021"



const firebaseConfig = {
    apiKey: "AIzaSyDWkgzZeTcQOGgDFC6UFs0LUA72KHtOG_4",
    authDomain: "psswdmanager-68a29.firebaseapp.com",
    databaseURL: "https://psswdmanager-68a29-default-rtdb.firebaseio.com",
    projectId: "psswdmanager-68a29",
    storageBucket: "psswdmanager-68a29.appspot.com",
    messagingSenderId: "18800570825",
    appId: "1:18800570825:web:5e8580cb73e6c3b155f818"
  };
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  window.onload = userGreetings(), scrollTop(), checkLocalStorage(),  getDataOfUser() ;

function scrollTop()
{
  TopScrollInterval = setInterval(() => {
    window.scrollTo(0, 0);
  }, 20);
  setTimeout(() => {
    clearInterval(TopScrollInterval);
  }, 3300);
}


// document.getElementById("sendBtn").addEventListener('click', (e) => {
//  	e.preventDefault();
//  	Email.send({
//  		SecureToken: "token",
//  		To: 'taritbhatt2007@gmail.com',
//  		From: "ayushbhatt633@gmail.com",
//  		Subject: "This is the subject",
//  		Body: "body content"
//  	}).then(
//  		message => alert(message)
//  	);
//  })

// window.addEventListener("deviceorientation", function(event) {
//     console.log(event.gamma);
//     });

document.getElementById("searchBar").addEventListener("keyup", () => {
  filterSearch();
})
document.getElementById("searchBarPwdCollec").addEventListener("keyup", () => {
  filterSearchCollect();
})

document.getElementById("allPsswds").addEventListener("scroll", () => {
  document.getElementById("allPsswds").scrollTop === (document.getElementById("allPsswds").scrollHeight - document.getElementById("allPsswds").offsetHeight) ? loadMoreData() : null;
  
  // loadMoreData();

})
document.getElementById("navBarBtnsPsswdGen").addEventListener("click" , () => {
    document.querySelector(".autoGenPassword").classList.toggle("active");
})

document.getElementById("navBarBtnsPsswdGenDesk").addEventListener("click" , () => {
  document.querySelector(".autoGenPassword").classList.toggle("active");
})

document.getElementById("caretDownPsswd").addEventListener("click",() => {
    document.querySelector(".autoGenPassword").classList.toggle("active");
})

document.getElementById("profile_logo_nav").addEventListener("click" ,() => {
  document.querySelector(".profileContainer").classList.add("active");
})

document.getElementById("profile_logo_nav").addEventListener("click" ,() => {
  document.querySelector(".profileContainer").classList.add("active");
})

document.getElementById("profile_logo_top_nav").addEventListener("click" ,() => {
  document.querySelector(".profileContainer").classList.add("active");
})


document.getElementById("profile_logo").addEventListener("click" ,() => {
  document.querySelector(".profileContainer").classList.add("active");
})




document.getElementById("caretDownProfile").addEventListener("click", () => {
  document.querySelector(".profileContainer").classList.remove("active");
})

document.getElementById("profilePicData").addEventListener("click", () => {
  uploadUserDP();
})


document.getElementById("navBarBtnsAllPsswd").addEventListener("click" , () => {
  blockCounter = 0;
    document.getElementById("allPsswds").classList.add("active"); 
    
    document.querySelectorAll(".ALL_psswdBlobCntSng").forEach(elm => {
      // console.log(blockCounter)
      elm.style.cssText = `transform: translateX(-100%);  animation: appearFromPopping 0.5s linear forwards; animation-delay: ${blockCounter*0.1}s;`
      blockCounter += 1;
    })
    setTimeout(() => {
      document.getElementById("CrossAllPwdDown").style.display = "block";
      document.getElementById("searchBarPwdCollec").style.display = "block";
      document.querySelector(".maskPwdCollec").style.display = "block";
      filterSearchCollect();
    }, 500);
    
})

document.getElementById("navBarBtnsAllPsswdDesk").addEventListener("click" , () => {
  blockCounter = 0;
    document.getElementById("allPsswds").classList.add("active"); 
    
    document.querySelectorAll(".ALL_psswdBlobCntSng").forEach(elm => {
      // console.log(blockCounter)
      elm.style.cssText = `transform: translateX(-100%);  animation: appearFromPopping 0.5s linear forwards; animation-delay: ${blockCounter*0.1}s;`
      blockCounter += 1;
    })
    setTimeout(() => {
      document.getElementById("CrossAllPwdDown").style.display = "block";
      document.getElementById("searchBarPwdCollec").style.display = "block";
      document.querySelector(".maskPwdCollec").style.display = "block";
      filterSearchCollect();
    }, 500);
    
})

document.getElementById("CrossAllPwdDown").addEventListener("click", () => {
  blockCounter = 0;
  document.querySelectorAll(".ALL_psswdBlobCntSng").forEach(elm => {
    elm.style.cssText = `transform: translateX(-100%); animation: disapperarFromPopping 0.5s linear forwards; animation-direction: reverse; animation-delay: ${blockCounter*0.1}s;`
  })


  setTimeout(() => {
    document.getElementById("CrossAllPwdDown").style.display = "none";
    document.getElementById("searchBarPwdCollec").style.display = "none";
    document.querySelector(".maskPwdCollec").style.display = "none";
  }, 100);
    document.getElementById("allPsswds").classList.remove("active");
})



function checkLocalStorage()
{
  (localStorage.getItem("CurUsername")) ? null : redirectTo("");
}




function filterSearch()
{
  var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("searchBar");
    filter = input.value.toUpperCase();
    ul = document.getElementById("psswdBlobCont");
    li = ul.getElementsByClassName("psswdBlobCntSng");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByClassName("InfoContainer")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function filterSearchCollect()
{
  var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("searchBarPwdCollec");
    filter = input.value.toUpperCase();
    ul = document.getElementById("allPsswds");
    li = ul.getElementsByClassName("ALL_psswdBlobCntSng");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByClassName("InfoContainer")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


function togglePasswordvisibility(checker, target) //checker  = the id of the eye button; target = the id of the placeholder on which the action will be taken
{
    document.getElementById(checker).classList.contains("hidden") ? document.getElementById(target).setAttribute("type", "password") : document.getElementById(target).setAttribute("type", "text");
}

function GenPwd(target)
{
    clearTimeout(showAddPwd);
    generated_password = "";
    for (var i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        generated_password += chars.substring(randomNumber, randomNumber +1);
       }
       document.getElementById(target).value = generated_password;
       document.getElementById(target).setAttribute("type", "name");
        showAddPwd = setTimeout(() => {
            document.getElementById(target).setAttribute("type", "password");
    }, 2500);
}

i = 0;


// function typeWriterEffect(idOfTextHolder, textToType, speed) {
//     let speed = 75; //speed duration of effect in millisec
//     var idOfPlaceholder = String(idOfTextHolder);
//     var textToTypeNew = String(textToType)
//     if (i < String(textToType).length) {
//         document.getElementById(idOfTextHolder).value += String(textToType).charAt(i);
//         i++;
//         setTimeout(() => {
//             typeWriterEffect("selectedServiceAddPassword", "google");
//         }, speed);
//     }
// }


function typeWriterEffectHTML(idOfTextHolder, textToType, speed) {
    var i = 0;
    var speed = speed || 75; // Default speed if not provided
    document.getElementById(idOfTextHolder).innerHTML = "";
    function type() {
        if (i < textToType.length) {
            document.getElementById(idOfTextHolder).innerHTML += textToType.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type(); // Call the function to start the typing effect
    
}


function typeWriterEffectValue(idOfTextHolder, textToType, speed) {
    var i = 0;
    var speed = speed || 75; // Default speed if not provided
    document.getElementById(idOfTextHolder).value = "";
    function type() {
        if (i < textToType.length) {
            (textToType.charAt(i)) == " " ?  document.getElementById(idOfTextHolder).value += " " : document.getElementById(idOfTextHolder).value += textToType.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type(); // Call the function to start the typing effect
    
}

function StarShine()
{
    let index = 0,
    interval = 500;

const rand = (min, max) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

const animate = star => {
  star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
  star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

  star.style.animation = "none";
  star.offsetHeight;
  star.style.animation = "";
}

for(const star of document.getElementsByClassName("magic-star")) {
  setTimeout(() => {
    animate(star);
    
    setInterval(() => animate(star), 1000);
  }, index++ * (interval / 3))
}

}


setInterval(() => {
    document.getElementById("psswdBlobCont").childElementCount > 0 ? 
    setTimeout(() => {
      document.getElementById("loaderRippleForData").style.opacity = 0
    }, 800)
     : 
     document.getElementById("loaderRippleForData").style.opacity = 1;

     
  }, 200);

// Example usage:



function getDataOfUserCollect()
{
  var starCountRef = firebase.database().ref(localStorage.getItem("CurUsername")+'/');
  starCountRef
  .orderByKey()
  .limitToFirst(15)
  .once('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
      for (i = 0; i < Object.values(data).length; i++)
        {
          switch (String(Object.values(data)[i].service).toLowerCase()) {
            case "google":
              image_url = google;
              break;
            case "twitter":
              image_url = twitter;
              break;
            
            case "facebook":
                image_url = facebook;
                break;
            
            case "whatsapp":
              image_url = whatsapp;
              break;

            case "figma":
              image_url = figma;
              break;

            case "canva":
              image_url = canva;
              break;
            
            case "openai":
            image_url = openai;
            break;

            default:
              image_url = default_logo;
              break;
          }
          switch (String(Object.values(data)[i].cardNumber).slice(0,1))
          {
            case "4":
              var card_image_url = visacard;
              console.log(card_image_url)
              break;
            case "5":
              var card_image_url = mastercard;
              break;
            case "2":
              var card_image_url = mastercard;
              break;
            case "3":
              var card_image_url = americanExpress;
              break;
            default:
              var card_image_url = default_logo;
              break;
          }
          switch (String(Object.values(data)[i].AppName).toLowerCase()) {
            case "google":
              var app_image_url = google;
              break;
            case "twitter":
              var app_image_url = twitter;
              break;
            
            case "facebook":
                var app_image_url = facebook;
                break;
            
            case "whatsapp":
              var app_image_url = whatsapp;
              break;

            case "figma":
              var app_image_url = figma;
              break;

            case "canva":
              var app_image_url = canva;
              break;
            
            case "openai":
            var app_image_url = openai;
            break;
            
            case "instagram":
              var app_image_url = instagram;
              break;

            case "insta":
              var app_image_url = instagram;
              break

            default:
              var app_image_url = default_logo;
              break;
          }

          DataAddTagLoginCollec = `<div class="ALL_psswdBlobCntSng" onclick = "viewDetails(this)" data-id="${decrypt(Object.values(data)[i].username,Object.values(data)[i].sk) +"   "+decrypt(Object.values(data)[i].password, Object.values(data)[i].sk)+"   "+decrypt(Object.values(data)[i].email, Object.values(data)[i].sk)+"   "+Object.values(data)[i].service+"   "+Object.values(data)[i].typeOfData+"   "+Object.values(data)[i].AppName+"   "+Object.values(data)[i].AppPassword+"   "+Object.values(data)[i].cardNumber+"   "+Object.values(data)[i].cardExpiry+"   "+Object.values(data)[i].cardCVV+"   "+Object.values(data)[i].cardHolderName+"   "+Object.values(data)[i].serviceCard}"  >
          <div class="ALL_psswdBlobCntSngImg" style="background-image : url('${image_url}');"></div>
          
          <div class="ALL_psswdBlobCntSngName">${(Object.values(data)[i].service) == "Custom" ? "Login Details " : "Login Details of "+(Object.values(data)[i].service)} </div>
          <div class="ALL_psswdBlobCntSngEmail">${decrypt(Object.values(data)[i].email, Object.values(data)[i].sk)}</div>
          <span class="InfoContainer" style="display: none;">Login Details ${(Object.values(data)[i].service)} ${decrypt(Object.values(data)[i].email, Object.values(data)[i].sk)}</span>
          </div>`

          DataAddTagCardCollec = `<div class="ALL_psswdBlobCntSng" onclick = "viewDetails(this)" data-id="${Object.values(data)[i].username+"   "+Object.values(data)[i].password+"   "+Object.values(data)[i].email+"   "+Object.values(data)[i].service+"   "+Object.values(data)[i].typeOfData+"   "+Object.values(data)[i].AppName+"   "+Object.values(data)[i].AppPassword+"   "+decrypt(Object.values(data)[i].cardNumber,Object.values(data)[i].sk_card)+"   "+decrypt(Object.values(data)[i].cardExpiry, Object.values(data)[i].sk_card)+"   "+decrypt(Object.values(data)[i].cardCVV, Object.values(data)[i].sk_card)+"   "+decrypt(Object.values(data)[i].cardHolderName, Object.values(data)[i].sk_card)+"   "+Object.values(data)[i].serviceCard+"   "+Object.values(data)[i].unique_id}" style = "transform: translateX(-100%); animation: appearFromSide 0.5s linear forwards; animation-delay: ${i*0.1}s; ">
          <div class="ALL_psswdBlobCntSngImg" style="background-image : url(${card_image_url});"></div>
          <p class="ALL_psswdBlobCntSngName">${Object.values(data)[i].typeOfData}</p>
          <p class="ALL_psswdBlobCntSngEmail">${String(decrypt(Object.values(data)[i].cardNumber, Object.values(data)[i].sk_card)).slice(0,4) + "-****-****-****"} </p>
          <span class="InfoContainer" style="display: none;"> ${Object.values(data)[i].typeOfData} ${String(decrypt(Object.values(data)[i].cardNumber, Object.values(data)[i].sk_card))} </span>
          </div>`

          DataAddTagAppCollec = `<div class="ALL_psswdBlobCntSng" onclick = "viewDetails(this)" data-id="${Object.values(data)[i].username+"   "+Object.values(data)[i].password+"   "+Object.values(data)[i].email+"   "+Object.values(data)[i].service+"   "+Object.values(data)[i].typeOfData+"   "+decrypt(Object.values(data)[i].AppName,Object.values(data)[i].sk_app)+"   "+decrypt(Object.values(data)[i].AppPassword,Object.values(data)[i].sk_app)+"   "+Object.values(data)[i].cardNumber+"   "+Object.values(data)[i].cardExpiry+"   "+Object.values(data)[i].cardCVV+"   "+Object.values(data)[i].cardHolderName+"   "+Object.values(data)[i].serviceCard}" >
          <div class="ALL_psswdBlobCntSngImg" style="background-image : url(${app_image_url});"></div>
          <div class="ALL_psswdBlobCntSngName">Password of ${Object.values(data)[i].typeOfData} --> ${decrypt(Object.values(data)[i].AppName, Object.values(data)[i].sk_app)}</div>
          <p class="psswdBlobCntSngEmail">${String(decrypt(Object.values(data)[i].AppPassword, Object.values(data)[i].sk_app)).slice(0,2) + String(decrypt(Object.values(data)[i].AppPassword, Object.values(data)[i].sk_app)).slice(2).replace(String(decrypt(Object.values(data)[i].AppPassword, Object.values(data)[i].sk_app)).slice(2), "*".repeat(String(decrypt(Object.values(data)[i].AppPassword, Object.values(data)[i].sk_app)).slice(2).length))} </p>
          <span class="InfoContainer" style="display: none;"> ${decrypt(Object.values(data)[i].AppName,Object.values(data)[i].sk_app)} </span>
          </div>`

          if(Object.values(data)[i].typeOfData == "Login")
          {
            document.getElementById("allPsswds").innerHTML += DataAddTagLoginCollec;
          }
          else if(Object.values(data)[i].typeOfData == "Card")
          {
            document.getElementById("allPsswds").innerHTML += DataAddTagCardCollec;
          }
          else if(Object.values(data)[i].typeOfData == "App")
          {
            document.getElementById("allPsswds").innerHTML += DataAddTagAppCollec;
          }
        }
        globalThis.last_fetched_unique_id =  Object.values(data)[Object.values(data).length - 1].unique_id;
        // console.log(last_fetched_unique_id)
        

        
    }
    else
    {
      // console.log("No Collection can be fetched");
    }
  });
}

function getDataOfUserCollectMore(lastFetchedDocId)
{
  var starCountRef = firebase.database().ref(localStorage.getItem("CurUsername")+'/');
  starCountRef
  .orderByKey()
  .startAfter(lastFetchedDocId)
  .limitToFirst(7)
  .once('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
      for (i = 0; i < Object.values(data).length; i++)
        {
          switch (String(Object.values(data)[i].service).toLowerCase()) {
            case "google":
              image_url = google;
              break;
            case "twitter":
              image_url = twitter;
              break;
            
            case "facebook":
                image_url = facebook;
                break;
            
            case "whatsapp":
              image_url = whatsapp;
              break;

            case "figma":
              image_url = figma;
              break;

            case "canva":
              image_url = canva;
              break;
            
            case "openai":
            image_url = openai;
            break;

            default:
              image_url = default_logo;
              break;
          }

          DataAddTagLoginCollec = `<div class="ALL_psswdBlobCntSng" onclick = "viewDetails(this)" data-id="${decrypt(Object.values(data)[i].username,Object.values(data)[i].sk) +"   "+decrypt(Object.values(data)[i].password, Object.values(data)[i].sk)+"   "+decrypt(Object.values(data)[i].email, Object.values(data)[i].sk)+"   "+Object.values(data)[i].service+"   "+Object.values(data)[i].typeOfData+"   "+Object.values(data)[i].AppName+"   "+Object.values(data)[i].AppPassword+"   "+Object.values(data)[i].cardNumber+"   "+Object.values(data)[i].cardExpiry+"   "+Object.values(data)[i].cardCVV+"   "+Object.values(data)[i].cardHolderName+"   "+Object.values(data)[i].serviceCard}"  >
          <div class="ALL_psswdBlobCntSngImg" style="background-image : url('${image_url}');"></div>
          <div class="ALL_psswdBlobCntSngName">${(Object.values(data)[i].service) == "Custom" ? "Login Details " : "Login Details of "+(Object.values(data)[i].service)} </div>
          <div class="ALL_psswdBlobCntSngEmail">${decrypt(Object.values(data)[i].email, Object.values(data)[i].sk)}</div>
          <span class="InfoContainer" style="display: none;">Login Details ${(Object.values(data)[i].service)} ${decrypt(Object.values(data)[i].email, Object.values(data)[i].sk)}</span>
          </div>`

          DataAddTagCardCollec = `<div class="ALL_psswdBlobCntSng" onclick = "viewDetails(this)" data-id="${Object.values(data)[i].username+"   "+Object.values(data)[i].password+"   "+Object.values(data)[i].email+"   "+Object.values(data)[i].service+"   "+Object.values(data)[i].typeOfData+"   "+Object.values(data)[i].AppName+"   "+Object.values(data)[i].AppPassword+"   "+decrypt(Object.values(data)[i].cardNumber,Object.values(data)[i].sk_card)+"   "+decrypt(Object.values(data)[i].cardExpiry, Object.values(data)[i].sk_card)+"   "+decrypt(Object.values(data)[i].cardCVV, Object.values(data)[i].sk_card)+"   "+decrypt(Object.values(data)[i].cardHolderName, Object.values(data)[i].sk_card)+"   "+Object.values(data)[i].serviceCard+"   "+Object.values(data)[i].unique_id}" style = "transform: translateX(-100%); animation: appearFromSide 0.5s linear forwards; animation-delay: ${i*0.1}s; ">
          <div class="ALL_psswdBlobCntSngImg" style="background-image : url(${card_image_url});"></div>
          <p class="ALL_psswdBlobCntSngName">${Object.values(data)[i].typeOfData}</p>
          <p class="ALL_psswdBlobCntSngEmail">${String(decrypt(Object.values(data)[i].cardNumber, Object.values(data)[i].sk_card)).slice(0,4) + "-****-****-****"} </p>
          <span class="InfoContainer" style="display: none;"> ${Object.values(data)[i].typeOfData} ${String(decrypt(Object.values(data)[i].cardNumber, Object.values(data)[i].sk_card))} </span>
          </div>`

          DataAddTagAppCollec = `<div class="ALL_psswdBlobCntSng" onclick = "viewDetails(this)" data-id="${Object.values(data)[i].username+"   "+Object.values(data)[i].password+"   "+Object.values(data)[i].email+"   "+Object.values(data)[i].service+"   "+Object.values(data)[i].typeOfData+"   "+decrypt(Object.values(data)[i].AppName,Object.values(data)[i].sk_app)+"   "+decrypt(Object.values(data)[i].AppPassword,Object.values(data)[i].sk_app)+"   "+Object.values(data)[i].cardNumber+"   "+Object.values(data)[i].cardExpiry+"   "+Object.values(data)[i].cardCVV+"   "+Object.values(data)[i].cardHolderName+"   "+Object.values(data)[i].serviceCard}" >
          <div class="ALL_psswdBlobCntSngImg" style="background-image : url(${app_image_url});"></div>
          <div class="ALL_psswdBlobCntSngName">Password of ${Object.values(data)[i].typeOfData} --> ${decrypt(Object.values(data)[i].AppName, Object.values(data)[i].sk_app)}</div>
          <p class="psswdBlobCntSngEmail">${String(decrypt(Object.values(data)[i].AppPassword, Object.values(data)[i].sk_app)).slice(0,2) + String(decrypt(Object.values(data)[i].AppPassword, Object.values(data)[i].sk_app)).slice(2).replace(String(decrypt(Object.values(data)[i].AppPassword, Object.values(data)[i].sk_app)).slice(2), "*".repeat(String(decrypt(Object.values(data)[i].AppPassword, Object.values(data)[i].sk_app)).slice(2).length))} </p>
          <span class="InfoContainer" style="display: none;"> ${decrypt(Object.values(data)[i].AppName,Object.values(data)[i].sk_app)} </span>
          </div>`

          if(Object.values(data)[i].typeOfData == "Login")
          {
            document.getElementById("allPsswds").innerHTML += DataAddTagLoginCollec;
          }
          else if(Object.values(data)[i].typeOfData == "Card")
          {
            document.getElementById("allPsswds").innerHTML += DataAddTagCardCollec;
          }
          else if(Object.values(data)[i].typeOfData == "App")
          {
            document.getElementById("allPsswds").innerHTML += DataAddTagAppCollec;
          }
        }
        globalThis.last_fetched_unique_id =  Object.values(data)[Object.values(data).length - 1].unique_id;
        // console.log(last_fetched_unique_id)
        

        
    }
    else
    {
      console.log("No Collection can be fetched");
    }
  });
}

function loadMoreData()
{
getDataOfUserCollectMore(last_fetched_unique_id);
}

function getDataOfUser()
{
  var starCountRef = firebase.database().ref(localStorage.getItem("CurUsername")+'/');
  starCountRef.limitToFirst(15)
  .once('value', (snapshot) => {
    // document.getElementById("psswdBlobCont").innerHTML = ";"
    
    const data = snapshot.val();
  
    // Check if data exists
    if (data) {
      document.getElementById("noDataPatch").classList.remove("noDataPatchVisible");
      document.getElementById("psswdBlobCont").style.overflowY = "auto";
      // Convert the object values to an array
      const dataArray = Object.values(new Set(Object.values(data)))
      


        for (i = 0; i < Object.values(data).length; i++)
        {
            //deciding logo for each service 
          switch (String(Object.values(data)[i].service).toLowerCase()) {
            case "google":
              image_url = google;
              break;
            case "twitter":
              image_url = twitter;
              break;
            
            case "facebook":
                image_url = facebook;
                break;
            
            case "whatsapp":
              image_url = whatsapp;
              break;

            case "figma":
              image_url = figma;
              break;

            case "canva":
              image_url = canva;
              break;
            
            case "openai":
            image_url = openai;
            break;

            default:
              image_url = default_logo;
              break;
          }
          switch (String(Object.values(data)[i].cardNumber).slice(0,1))
          {
            case "4":
              var card_image_url = visacard;
              console.log(card_image_url)
              break;
            case "5":
              var card_image_url = mastercard;
              break;
            case "2":
              var card_image_url = mastercard;
              break;
            case "3":
              var card_image_url = americanExpress;
              break;
            default:
              var card_image_url = default_logo;
              break;
          }

          switch (String(Object.values(data)[i].AppName).toLowerCase()) {
            case "google":
              var app_image_url = google;
              break;
            case "twitter":
              var app_image_url = twitter;
              break;
            
            case "facebook":
                var app_image_url = facebook;
                break;
            
            case "whatsapp":
              var app_image_url = whatsapp;
              break;

            case "figma":
              var app_image_url = figma;
              break;

            case "canva":
              var app_image_url = canva;
              break;
            
            case "openai":
            var app_image_url = openai;
            break;
            
            case "instagram":
              var app_image_url = instagram;
              break;

            case "insta":
              var app_image_url = instagram;
              break

            default:
              var app_image_url = default_logo;
              break;
          }
          
          DataAddTagLogin = `<div class="psswdBlobCntSng" onclick = "viewDetails(this)" data-id="${decrypt(Object.values(data)[i].username, Object.values(data)[i].sk)+"   "+decrypt(Object.values(data)[i].password,Object.values(data)[i].sk)+"   "+decrypt(Object.values(data)[i].email, Object.values(data)[i].sk)+"   "+Object.values(data)[i].service+"   "+Object.values(data)[i].typeOfData+"   "+Object.values(data)[i].AppName+"   "+Object.values(data)[i].AppPassword+"   "+Object.values(data)[i].cardNumber+"   "+Object.values(data)[i].cardExpiry+"   "+Object.values(data)[i].cardCVV+"   "+Object.values(data)[i].cardHolderName+"   "+Object.values(data)[i].serviceCard+"   "+Object.values(data)[i].unique_id}" style = "transform: translateX(-100%); animation: appearFromSide 0.5s linear forwards; animation-delay: ${i*0.1}s; ">
          <div class="psswdBlobCntSngImg" style="background-image : url('${image_url}');"></div>
          <p class="psswdBlobCntSngName">${(Object.values(data)[i].service) == "Custom" ? "Login Details" : "Login Details of "+(Object.values(data)[i].service)}</p>
          <p class="psswdBlobCntSngEmail">${decrypt(Object.values(data)[i].email, Object.values(data)[i].sk)}</p>
          <span class="InfoContainer" style="display: none;"> Login Details ${(Object.values(data)[i].service)} ${Object.values(data)[i].email} </span>
          </div>`

          

          DataAddTagCard = `<div class="psswdBlobCntSng" onclick = "viewDetails(this)" data-id="${Object.values(data)[i].username+"   "+Object.values(data)[i].password+"   "+Object.values(data)[i].email+"   "+Object.values(data)[i].service+"   "+Object.values(data)[i].typeOfData+"   "+Object.values(data)[i].AppName+"   "+Object.values(data)[i].AppPassword+"   "+decrypt(Object.values(data)[i].cardNumber,Object.values(data)[i].sk_card)+"   "+decrypt(Object.values(data)[i].cardExpiry, Object.values(data)[i].sk_card)+"   "+decrypt(Object.values(data)[i].cardCVV, Object.values(data)[i].sk_card)+"   "+decrypt(Object.values(data)[i].cardHolderName, Object.values(data)[i].sk_card)+"   "+Object.values(data)[i].serviceCard+"   "+Object.values(data)[i].unique_id}" style = "transform: translateX(-100%); animation: appearFromSide 0.5s linear forwards; animation-delay: ${i*0.1}s; ">
          <div class="psswdBlobCntSngImg" style="background-image : url(${card_image_url});"></div>
          <p class="psswdBlobCntSngName">${Object.values(data)[i].typeOfData}</p>
          <p class="psswdBlobCntSngEmail">${String(decrypt(Object.values(data)[i].cardNumber, Object.values(data)[i].sk_card)).slice(0,4) + "-****-****-****"} </p>
          <span class="InfoContainer" style="display: none;"> ${Object.values(data)[i].typeOfData} ${String(decrypt(Object.values(data)[i].cardNumber, Object.values(data)[i].sk_card))} </span>
          </div>`

          
          

          DataAddTagApp = `<div class="psswdBlobCntSng" onclick = "viewDetails(this)" data-id="${Object.values(data)[i].username+"   "+Object.values(data)[i].password+"   "+Object.values(data)[i].email+"   "+Object.values(data)[i].service+"   "+Object.values(data)[i].typeOfData+"   "+decrypt(Object.values(data)[i].AppName, Object.values(data)[i].sk_app)+"   "+decrypt(Object.values(data)[i].AppPassword,Object.values(data)[i].sk_app)+"   "+Object.values(data)[i].cardNumber+"   "+Object.values(data)[i].cardExpiry+"   "+Object.values(data)[i].cardCVV+"   "+Object.values(data)[i].cardHolderName+"   "+Object.values(data)[i].serviceCard+"   "+Object.values(data)[i].unique_id}" style = "transform: translateX(-100%); animation: appearFromSide 0.5s linear forwards; animation-delay: ${i*0.1}s; ">
          <div class="psswdBlobCntSngImg" style="background-image : url('${app_image_url}');"></div>
          <p class="psswdBlobCntSngName">Password of ${Object.values(data)[i].typeOfData} --> ${decrypt(Object.values(data)[i].AppName, Object.values(data)[i].sk_app)}</p>
          <p class="psswdBlobCntSngEmail">${String(decrypt(Object.values(data)[i].AppPassword, Object.values(data)[i].sk_app)).slice(0,2) + String(decrypt(Object.values(data)[i].AppPassword, Object.values(data)[i].sk_app)).slice(2).replace(String(decrypt(Object.values(data)[i].AppPassword, Object.values(data)[i].sk_app)).slice(2), "*".repeat(String(decrypt(Object.values(data)[i].AppPassword, Object.values(data)[i].sk_app)).slice(2).length))} </p>
          <span class="InfoContainer" style="display: none;"> ${decrypt(Object.values(data)[i].AppName, Object.values(data)[i].sk_app)} </span>
          </div>`

          if(Object.values(data)[i].typeOfData == "Login")
          {
            document.getElementById("psswdBlobCont").innerHTML += DataAddTagLogin;
          }
          else if(Object.values(data)[i].typeOfData == "Card")
          {
            document.getElementById("psswdBlobCont").innerHTML += DataAddTagCard;
          }
          else if(Object.values(data)[i].typeOfData == "App")
          {
            document.getElementById("psswdBlobCont").innerHTML += DataAddTagApp;
          }
          // getDataOfUserCollect(Object.values(data)[0].unique_id)
          // console.log(Object.values(data)[0].unique_id)
        }

       //dataArray.typeOfData
    } else {
      // console.log('No data available');
      document.getElementById("noDataPatch").classList.add("noDataPatchVisible");
      document.getElementById("psswdBlobCont").style.overflowY = "hidden";
    }
  });
 
  const initialLoadCount = setInterval(() => {
    if(document.getElementById("psswdBlobCont").childElementCount > 2)
    {
      initialLoad = false;
      clearInterval(initialLoadCount);
    }
  }, 1000);
  
}

function getDataOfUserCont()
{

  if (initialLoad) return;
  else
  {
    var starCountRef = firebase.database().ref(localStorage.getItem("CurUsername")+'/');
    starCountRef.on('child_added', (snapshot) => {
      console.log("child_added")
      location.reload()
      
      const data = snapshot.val();
    console.log(data)
      // Check if data exists
      if (data) {
        document.getElementById("noDataPatch").classList.remove("noDataPatchVisible");
        document.getElementById("psswdBlobCont").style.overflowY = "auto";
  
       
              //deciding logo for each service 
              switch (String((data).service).toLowerCase()) {
                case "google":
                  image_url = google;
                  break;
                case "twitter":
                  image_url = twitter;
                  break;
                
                case "facebook":
                    image_url = facebook;
                    break;
                
                case "whatsapp":
                  image_url = whatsapp;
                  break;
    
                case "figma":
                  image_url = figma;
                  break;
    
                case "canva":
                  image_url = canva;
                  break;
                
                case "openai":
                image_url = openai;
                break;
    
                default:
                  image_url = default_logo;
                  break;
              }
              switch (String((data).cardNumber).slice(0,1))
              {
                case "4":
                  var card_image_url = visacard;
                  console.log(card_image_url)
                  break;
                case "5":
                  var card_image_url = mastercard;
                  break;
                case "2":
                  var card_image_url = mastercard;
                  break;
                case "3":
                  var card_image_url = americanExpress;
                  break;
                default:
                  var card_image_url = default_logo;
                  break;
              }
    
              switch (String((data).AppName).toLowerCase()) {
                case "google":
                  var app_image_url = google;
                  break;
                case "twitter":
                  var app_image_url = twitter;
                  break;
                
                case "facebook":
                    var app_image_url = facebook;
                    break;
                
                case "whatsapp":
                  var app_image_url = whatsapp;
                  break;
    
                case "figma":
                  var app_image_url = figma;
                  break;
    
                case "canva":
                  var app_image_url = canva;
                  break;
                
                case "openai":
                var app_image_url = openai;
                break;
                
                case "instagram":
                  var app_image_url = instagram;
                  break;
    
                case "insta":
                  var app_image_url = instagram;
                  break
    
                default:
                  var app_image_url = default_logo;
                  break;
              }
    
              DataAddTagLogin = `<div class="psswdBlobCntSng" onclick = "viewDetails(this)" data-id="${decrypt((data).username, (data).sk)+"   "+decrypt((data).password,(data).sk)+"   "+decrypt((data).email,(data).sk)+"   "+(data).service+"   "+(data).typeOfData+"   "+(data).AppName+"   "+(data).AppPassword+"   "+(data).cardNumber+"   "+(data).cardExpiry+"   "+(data).cardCVV+"   "+(data).cardHolderName+"   "+(data).serviceCard+"   "+(data).unique_id}" style = "transform: translateX(-100%); animation: appearFromSide 0.5s linear forwards; animation-delay: ${i*0.1}s; ">
              <div class="psswdBlobCntSngImg" style="background-image : url('${image_url}');"></div>
              <p class="psswdBlobCntSngName">${((data).service) == "Custom" ? "Login Details" : "Login Details of "+((data).service)}</p>
              <p class="psswdBlobCntSngEmail">${(data).email}</p>
              <span class="InfoContainer" style="display: none;"> Login Details ${((data).service)} ${(data).email} </span>
              </div>`
    
              
    
              DataAddTagCard = `<div class="psswdBlobCntSng" onclick = "viewDetails(this)" data-id="${(data).username+"   "+(data).password+"   "+(data).email+"   "+(data).service+"   "+(data).typeOfData+"   "+(data).AppName+"   "+(data).AppPassword+"   "+decrypt((data).cardNumber,(data).sk_card)+"   "+decrypt((data).cardExpiry, (data).sk_card)+"   "+decrypt((data).cardCVV, (data).sk_card)+"   "+decrypt((data).cardHolderName, (data).sk_card)+"   "+(data).serviceCard+"   "+(data).unique_id}" style = "transform: translateX(-100%); animation: appearFromSide 0.5s linear forwards; animation-delay: ${i*0.1}s; ">
              <div class="psswdBlobCntSngImg" style="background-image : url(${card_image_url});"></div>
              <p class="psswdBlobCntSngName">${(data).typeOfData}</p>
              <p class="psswdBlobCntSngEmail">${String(decrypt((data).cardNumber, (data).sk_card)).slice(0,4) + "-****-****-****"} </p>
              <span class="InfoContainer" style="display: none;"> ${(data).typeOfData} ${String(decrypt((data).cardNumber, (data).sk_card))} </span>
              </div>`
    
              
              
    
              DataAddTagApp = `<div class="psswdBlobCntSng" onclick = "viewDetails(this)" data-id="${(data).username+"   "+(data).password+"   "+(data).email+"   "+(data).service+"   "+(data).typeOfData+"   "+decrypt((data).AppName,(data).sk_app)+"   "+decrypt((data).AppPassword,(data).sk_app)+"   "+(data).cardNumber+"   "+(data).cardExpiry+"   "+(data).cardCVV+"   "+(data).cardHolderName+"   "+(data).serviceCard+"   "+(data).unique_id}" style = "transform: translateX(-100%); animation: appearFromSide 0.5s linear forwards; animation-delay: ${i*0.1}s; ">
              <div class="psswdBlobCntSngImg" style="background-image : url('${app_image_url}');"></div>
              <p class="psswdBlobCntSngName">Password of ${(data).typeOfData} --> ${decrypt((data).AppName,(data).sk_app)}</p>
              <p class="psswdBlobCntSngEmail">${String(decrypt((data).AppPassword, (data).sk_app)).slice(0,2) + String(decrypt((data).AppPassword, (data).sk_app)).slice(2).replace(String(decrypt((data).AppPassword, (data).sk_app)).slice(2), "*".repeat(String(decrypt((data).AppPassword, (data).sk_app)).slice(2).length))} </p>
              <span class="InfoContainer" style="display: none;"> ${decrypt((data).AppName,(data).sk_app)} </span>
              </div>`
    
              if((data).typeOfData == "Login")
              {
                document.getElementById("psswdBlobCont").innerHTML += DataAddTagLogin;
              }
              else if((data).typeOfData == "Card")
              {
                document.getElementById("psswdBlobCont").innerHTML += DataAddTagCard;
              }
              else if((data).typeOfData == "App")
              {
                document.getElementById("psswdBlobCont").innerHTML += DataAddTagApp;
              }
  
         //dataArray.typeOfData
      } else {
        // console.log('No data available');
        document.getElementById("noDataPatch").classList.add("noDataPatchVisible");
        document.getElementById("psswdBlobCont").style.overflowY = "hidden";
      }
    });
  }
  
  
  
}


getDataOfUserCollect();
getDataOfUserCont()

function getDataOfUserUpdate()
{
  var starCountRef = firebase.database().ref(localStorage.getItem("CurUsername")+'/');
  starCountRef.on('child_changed', (snapshot) => {
    document.getElementById("psswdBlobCont").innerHTML = `<div class="noDataPatch" id="noDataPatch"></div>
    <div class="lds-ripple" id="loaderRippleForData"><div></div><div></div></div>`;
    document.getElementById("allPsswds").innerHTML = "";
    getDataOfUser();
    getDataOfUserCollect();
    const data = snapshot.val();
    // Check if data exists
    
    
    if(!data) {
      // console.log('No data available');
      document.getElementById("noDataPatch").classList.add("noDataPatchVisible");
      document.getElementById("psswdBlobCont").style.overflowY = "hidden";
    }
  });
  
  
}

getDataOfUserUpdate();




setInterval(() => {
  userGreetings();
}, 12000);
function userGreetings()
{
  var myDate = new Date();
  var hrs = myDate.getHours();
  var greet;

  if (hrs < 12)
  greet = 'Good Morning';
  else if (hrs >= 12 && hrs <= 17)
  greet = 'Good Afternoon';
  else if (hrs >= 17 && hrs <= 24)
  greet = 'Good Evening';

  document.getElementById("greeting").innerHTML = greet;
}
document.getElementById("logoutBrn").addEventListener("click", () => {
  logoutRedirect();
})

function logoutRedirect()
{
  redirectTo("");
}

function viewDetails(self)
{
  var obtainedUsername = self.getAttribute("data-id").split("   ")[0];
  var obtainedPassword = self.getAttribute("data-id").split("   ")[1];
  var obtainedEmail = self.getAttribute("data-id").split("   ")[2];
  var obtainedService = self.getAttribute("data-id").split("   ")[3];
  var obtainedTypeOfData = self.getAttribute("data-id").split("   ")[4];
  var obtainedAppName = self.getAttribute("data-id").split("   ")[5];
  var obtainedAppPassword = self.getAttribute("data-id").split("   ")[6];
  var obtainedCardNumber = self.getAttribute("data-id").split("   ")[7];
  var obtainedCardExpiry = self.getAttribute("data-id").split("   ")[8];
  var obtainedCardCVV = self.getAttribute("data-id").split("   ")[9];
  var obtainedCardHolderName = self.getAttribute("data-id").split("   ")[10];
  var obtainedCardService = self.getAttribute("data-id").split("   ")[11];
  var obtainedUniqueIdToDump = self.getAttribute("data-id").split("   ")[12];

//   console.log(obtainedUsername,
//     obtainedPassword,
//     obtainedEmail,
//     obtainedService,
//     obtainedTypeOfData,
//     obtainedAppName,
// obtainedAppPassword,
// obtainedCardNumber,
// obtainedCardExpiry,
// obtainedCardCVV,
// obtainedCardHolderName,
// obtainedCardService,
//obtainedUniqueIdToDump);  
  
    //come here
    switch (String(obtainedTypeOfData)) {
      case "Login":
        // info_array_for_login = [obtainedUsername, obtainedPassword, obtainedEmail, obtainedService];
        ShowInfoforLogin(obtainedUsername, obtainedPassword, obtainedEmail, obtainedService, obtainedUniqueIdToDump, obtainedTypeOfData);

        break;
      case "App":
        ShowInfoforApp(obtainedAppName, obtainedAppPassword, obtainedUniqueIdToDump, obtainedTypeOfData);
        break;
      case "Card":
        ShowInfoforCard(obtainedCardNumber, obtainedCardExpiry, obtainedCardCVV, obtainedCardHolderName, obtainedCardService, obtainedUniqueIdToDump);
    }
   

}

function ShowInfoforLogin(name, pass, email, service, dumpAddress, typeOfData)
{
    
   
    globalThis.ViewMode = "ReadOnly";
    document.getElementById("editDetailsForLogin").style.animationPlayState = "paused";
    document.getElementById("cancelEditDetails").style.opacity = "0";

    document.getElementById("delete_button").style.opacity = 1;
    document.getElementById("delete_button").style.pointerEvents = "all";

    document.getElementById("allPsswds").classList.add("blurHover");
    document.getElementById("CrossAllPwdDown").style.zIndex = 14;
    document.getElementById("searchBarPwdCollec").style.zIndex = 14;
    document.querySelector(".maskPwdCollec").style.zIndex = 14;
    document.getElementById("SeePwdOfAddPwd").classList.remove("hidden");
    document.getElementById("copyPassAddPassword").style.display = "block";
    document.getElementById("copyPassAddPassword").setAttribute("data-id", pass);
    document.getElementById("editDetailsForLogin").setAttribute("data-id", dumpAddress);
    document.getElementById("delete_button").setAttribute("data-id", dumpAddress);
    document.getElementById("cancelEditDetails").setAttribute("data-id", typeOfData);

    document.getElementById("caretDown").addEventListener("click", () => {
    document.getElementById("allPsswds").classList.remove("blurHover");
    document.getElementById("CrossAllPwdDown").style.zIndex = 20;
    document.getElementById("searchBarPwdCollec").style.zIndex = 17;
    document.querySelector(".maskPwdCollec").style.zIndex = 16;
    document.getElementById("copyPassAddPassword").style.display = "none";
    document.getElementById("copyPassAddPassword").setAttribute("data-id", "");

    // (ViewMode != "Editable") ? ( document.getElementById("editDetailsForLogin").style.opacity = "1",
    // document.getElementById("usernameInp").value = "",
    // document.getElementById("passwordInp").value = "",
    // document.getElementById("emailInp").value = "",
    // document.getElementById("selectedServiceAddPassword").innerHTML = "",
    // document.getElementById("passwordInp").setAttribute("type" , "password"),
    // togglePasswordvisibility("SeePwdOfAddPwd", "passwordInp"),

    // document.getElementById("usernameInp").removeAttribute("readOnly"),
    // document.getElementById("passwordInp").removeAttribute("readOnly"),
    // document.getElementById("emailInp").removeAttribute("readOnly"),
    // document.getElementById("suggestNav").style.pointerEvents = "all",
    // document.getElementById("submitEntry").style.pointerEvents = "all",

    // document.getElementById("GenPwd").style.opacity = "1",
    // document.getElementById("GenPwd").style.pointerEvents = "all",

    // clearTimeout(ViewModeReadOnlyTimer),
    // document.getElementById("delete_button").style.opacity = 0,
    // document.getElementById("delete_button").style.pointerEvents = "none",
    // document.getElementById("editDetailsForLogin").style.opacity = "0",
    // ViewMode = "Editable")
    
    
    // :
    // null;
})

    ViewModeReadOnlyTimer = setInterval(() => {
        if(ViewMode == "ReadOnly")
        {
            document.getElementById("usernameInp").setAttribute("readOnly" , "true");
            document.getElementById("editDetailsForLogin").style.opacity = "1";
            document.getElementById("passwordInp").setAttribute("readOnly" , "true");
            

            document.getElementById("emailInp").setAttribute("readOnly" , "true");
            document.getElementById("suggestNav").style.pointerEvents = "none";
            document.getElementById("submitEntry").style.pointerEvents = "none";    
            
            // document.getElementById("SeePwdOfAddPwd").style.opacity = "0";
            document.getElementById("GenPwd").style.opacity = "0";
            // document.getElementById("SeePwdOfAddPwd").style.pointerEvents = "none";
            document.getElementById("GenPwd").style.pointerEvents = "none";
        }
        else
        {
            null;
        }
    }, 200);


  document.getElementById("usernameInp").value = "";
  document.getElementById("passwordInp").value = "";
  document.getElementById("emailInp").value = "";
  document.getElementById("selectedServiceAddPassword").innerHTML = "";
  
  

  document.getElementById("addPsswd").classList.contains("active") ? null : document.getElementById("addPsswd").classList.add("active");

  setTimeout(() => {
    typeWriterEffectValue("usernameInp", name);
    typeWriterEffectValue("passwordInp", pass);
    typeWriterEffectValue("emailInp", email);
    typeWriterEffectHTML("selectedServiceAddPassword", service);
  }, 800);

document.getElementById("editDetailsForLogin").addEventListener("click", (e) => {
    document.getElementById("cancelEditDetails").style.opacity = "1";
    globalThis.appendLocation = e.target.getAttribute("data-id");
    console.log("Script js "+ appendLocation)
    globalThis.ViewMode = "Editable";
    document.getElementById("editDetailsForLogin").style.animationPlayState = "running";
    // ShowInfoforLogin(obtainedUsername, obtainedPassword, obtainedEmail, obtainedService, obtainedUniqueIdToDump);
    document.getElementById("allPsswds").classList.add("blurHover");
    document.getElementById("CrossAllPwdDown").style.zIndex = 14;
    document.getElementById("searchBarPwdCollec").style.zIndex = 14;
    document.querySelector(".maskPwdCollec").style.zIndex = 14;
    document.getElementById("SeePwdOfAddPwd").classList.remove("hidden");
    document.getElementById("copyPassAddPassword").style.display = "none";
    document.getElementById("copyPassAddPassword").setAttribute("data-id", "");

  
    document.getElementById("usernameInp").removeAttribute("readOnly");
    document.getElementById("passwordInp").removeAttribute("readOnly");
    document.getElementById("emailInp").removeAttribute("readOnly");
    document.getElementById("suggestNav").style.pointerEvents = "all";
    document.getElementById("submitEntry").style.pointerEvents = "all";
  
    document.getElementById("suggestNav").style.pointerEvents = "all";
    document.getElementById("submitEntry").style.pointerEvents = "all"; 
    document.getElementById("GenPwd").style.opacity = "1";
    document.getElementById("GenPwd").style.pointerEvents = "all";
  
  
    document.getElementById("submitEntry").addEventListener("click", () => {
      var loginUsernameEdit = document.getElementById("usernameInp").value;
      var loginPasswordEdit = document.getElementById("passwordInp").value;
      var loginEmailEdit = document.getElementById("emailInp").value;
      var ServiceEdit = document.getElementById("selectedServiceAddPassword").innerHTML;
      console.log(appendLocation);
      console.log(loginUsernameEdit, loginPasswordEdit, loginEmailEdit, ServiceEdit, appendLocation);
      // addToDBLogin(loginUsernameEdit, loginPasswordEdit, loginEmailEdit, ServiceEdit);


      const randomArray = new Uint8Array(16);
      crypto.getRandomValues(randomArray);
      const secretKey = CryptoJS.enc.Base64.stringify(CryptoJS.lib.WordArray.create(randomArray));
      
      firebase.database().ref(localStorage.getItem("CurUsername")+"/"+appendLocation).update({
        username: CryptoJS.AES.encrypt(loginUsernameEdit, secretKey).toString(),
        email: CryptoJS.AES.encrypt(loginEmailEdit, secretKey).toString(),
        password : CryptoJS.AES.encrypt(loginPasswordEdit, secretKey).toString(),
        service : ServiceEdit,
        sk : secretKey,
      }),
      
      
      document.getElementById("cancelEditDetails").style.opacity = "0";
      document.getElementById("caretDown").click();
    })
  
    document.getElementById("cancelEditDetails").addEventListener("click", (e) => {
      document.getElementById("editDetailsForLogin").style.animationPlayState = "paused";
      document.getElementById("cancelEditDetails").style.opacity = "0";
      ShowInfoforLogin(name, pass, email, service, dumpAddress, typeOfData);
    })
  
})

}


function copyPassword(self)
{
            const textToCopy = self.getAttribute("data-id");
            const textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
}
function copyPassword(self)
{
            const textToCopy = self.getAttribute("data-id");
            const textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
}


function ShowInfoforApp(appname, pass, dumpAddress ,typeOfData) 
{
    globalThis.ViewMode = "ReadOnly";
    
    document.getElementById("delete_button_app").style.opacity = 1;
    document.getElementById("delete_button_app").style.pointerEvents = "all";
    document.getElementById("delete_button_app").setAttribute("data-id", dumpAddress);
    
    document.getElementById("editDetailsForApp").style.animationPlayState = "paused";
    document.getElementById("cancelEditDetailsForApp").style.opacity = "0";
    document.getElementById("editDetailsForApp").setAttribute("data-id", dumpAddress);
    document.getElementById("cancelEditDetailsForApp").setAttribute("data-id", typeOfData);

    document.getElementById("allPsswds").classList.add("blurHover");
    document.getElementById("CrossAllPwdDown").style.zIndex = 14;
    document.getElementById("searchBarPwdCollec").style.zIndex = 14;
    document.querySelector(".maskPwdCollec").style.zIndex = 14;
    document.getElementById("SeePwd").classList.remove("hidden");
    document.getElementById("copyPass").style.display = "block";
    document.getElementById("copyPass").setAttribute("data-id", pass);

    document.getElementById("caretDownApp").addEventListener("click", () => {
      document.getElementById("copyPass").style.display = "none";
      document.getElementById("copyPass").setAttribute("data-id", "");
    document.getElementById("allPsswds").classList.remove("blurHover");
    document.getElementById("CrossAllPwdDown").style.zIndex = 20;
    document.getElementById("searchBarPwdCollec").style.zIndex = 17;
    document.querySelector(".maskPwdCollec").style.zIndex = 16;
    document.getElementById("delete_button_app").setAttribute("data-id", "");

    


        // (ViewMode != "Editable") ? (document.getElementById("usernameInpApp").value = "",
        // document.getElementById("passwordInpApp").value = "",
        // // globalThis.ViewMode = "Editable",

        // document.getElementById("passwordInpApp").setAttribute("type" , "password"),
        // togglePasswordvisibility("SeePwd", "passwordInpApp"),

        // document.getElementById("usernameInpApp").removeAttribute("readOnly"),
        // document.getElementById("passwordInpApp").removeAttribute("readOnly"),
        // document.getElementById("submitEntryApp").style.pointerEvents = "all",
        // document.getElementById("GenPwdApp").style.opacity = "1",
        // document.getElementById("GenPwdApp").style.pointerEvents = "all",
        // document.getElementById("editDetailsForApp").style.opacity = "0",
        // document.getElementById("delete_button").style.opacity = 1,
        // document.getElementById("delete_button").style.pointerEvents = "none",
        // clearTimeout(ViewModeReadOnlyTimer))
        // :
        // null;
    })


    ViewModeReadOnlyTimer = setInterval(() => {
        if(ViewMode == "ReadOnly")
        {
            document.getElementById("editDetailsForApp").style.opacity = "1";
            document.getElementById("usernameInpApp").setAttribute("readOnly" , "true");
            document.getElementById("passwordInpApp").setAttribute("readOnly" , "true");
            document.getElementById("submitEntryApp").style.pointerEvents = "none";   
            document.getElementById("GenPwdApp").style.opacity = "0";
            document.getElementById("GenPwdApp").style.pointerEvents = "none";

        }
        else
        {
            null;
        }
    }, 200);

  document.getElementById("usernameInpApp").value = "";
  document.getElementById("passwordInpApp").value = "";
  document.getElementById("addApp").classList.contains("active") ? null : document.getElementById("addApp").classList.add("active");

  setTimeout(() => {
    typeWriterEffectValue("usernameInpApp", appname);
    typeWriterEffectValue("passwordInpApp", pass);
  }, 800);

  
  document.getElementById("editDetailsForApp").addEventListener("click", (e) => {
    
    document.getElementById("cancelEditDetailsForApp").style.opacity = "1";
    globalThis.appendLocation = e.target.getAttribute("data-id");
    console.log("Script js "+ appendLocation)
    globalThis.ViewMode = "Editable";
    document.getElementById("editDetailsForApp").style.animationPlayState = "running";
    // ShowInfoforLogin(obtainedUsername, obtainedPassword, obtainedEmail, obtainedService, obtainedUniqueIdToDump);
    document.getElementById("allPsswds").classList.add("blurHover");
    document.getElementById("CrossAllPwdDown").style.zIndex = 14;
    document.getElementById("searchBarPwdCollec").style.zIndex = 14;
    document.querySelector(".maskPwdCollec").style.zIndex = 14;

    document.getElementById("SeePwd").classList.remove("hidden");
    document.getElementById("copyPass").style.display = "none";
    document.getElementById("copyPass").setAttribute("data-id", pass);


    document.getElementById("usernameInpApp").removeAttribute("readOnly");
    document.getElementById("passwordInpApp").removeAttribute("readOnly");
    document.getElementById("submitEntryApp").style.pointerEvents = "all";
    document.getElementById("GenPwdApp").style.opacity = "1";
    document.getElementById("GenPwdApp").style.pointerEvents = "all";

  

  
  
    document.getElementById("submitEntryApp").addEventListener("click", () => {
      var appNameEdit = document.getElementById("usernameInpApp").value;
      var appPasswordEdit = document.getElementById("passwordInpApp").value;
      console.log(appNameEdit, appPasswordEdit, appendLocation);
      // addAppToDB(appNameEdit, appPasswordEdit, appendLocation);
      // appendLocation

      const randomArray = new Uint8Array(16);
      crypto.getRandomValues(randomArray);
      const secretKey = CryptoJS.enc.Base64.stringify(CryptoJS.lib.WordArray.create(randomArray));

    firebase.database().ref(localStorage.getItem("CurUsername")+"/"+appendLocation).update({
        AppName: CryptoJS.AES.encrypt(appNameEdit, secretKey).toString(),
        AppPassword: CryptoJS.AES.encrypt(appPasswordEdit, secretKey).toString(),
        sk_app : secretKey
      }), 


      document.getElementById("cancelEditDetailsForApp").style.opacity = "0";
      document.getElementById("caretDownApp").click();
    })
  
    document.getElementById("cancelEditDetailsForApp").addEventListener("click", (e) => {
      document.getElementById("editDetailsForApp").style.animationPlayState = "paused";
      document.getElementById("cancelEditDetailsForApp").style.opacity = "0";
      ShowInfoforApp(appname, pass, dumpAddress ,typeOfData) 
    })
  
})


}

function ShowInfoforCard(num, exp, cvv, name, cardService, dumpAddress)
{
    
    globalThis.ViewMode = "ReadOnly";
    
    document.getElementById("delete_button_card").style.opacity = 1;
    document.getElementById("delete_button_card").setAttribute("data-id", dumpAddress);
    // console.log(document.getElementById("delete_button").style.opacity);
    document.getElementById("delete_button_card").style.pointerEvents = "all";

    document.getElementById("allPsswds").classList.add("blurHover");
    document.getElementById("CrossAllPwdDown").style.zIndex = 14;
    document.getElementById("searchBarPwdCollec").style.zIndex = 14;
    document.querySelector(".maskPwdCollec").style.zIndex = 14;

    document.getElementById("caretDownCard").addEventListener("click", () => {
    document.getElementById("allPsswds").classList.remove("blurHover");
    document.getElementById("CrossAllPwdDown").style.zIndex = 20;
    document.getElementById("CrossAllPwdDown").style.zIndex = 20;
    document.getElementById("searchBarPwdCollec").style.zIndex = 17;
    document.getElementById("delete_button_card").setAttribute("data-id", "");

    

        // (ViewMode != "Editable") ? (document.getElementById("usernameInpCard").value = "",
        // document.getElementById("passwordInpCard").value = "",
        // document.getElementById("DateInpCard").value = "",
        // document.getElementById("emailInpCard").value = "",
        // document.getElementById("selectedServiceCard").innerHTML = "",
        // globalThis.ViewMode = "Editable",

        // document.getElementById("usernameInpCard").removeAttribute("readOnly"),
        // document.getElementById("passwordInpCard").removeAttribute("readOnly"),
        // document.getElementById("emailInpCard").removeAttribute("readOnly"),
        // document.getElementById("DateInpCard").removeAttribute("readOnly"),
        // document.getElementById("suggestNavCard").style.pointerEvents = "all",
        // document.getElementById("submitEntryCard").style.pointerEvents = "all",
        // document.getElementById("delete_button").style.opacity = 0,
        // document.getElementById("delete_button").style.pointerEvents = "none",
        // clearTimeout(ViewModeReadOnlyTimer))
        // :
        // null;
    })
     ViewModeReadOnlyTimer = setInterval(() => {
        if(ViewMode == "ReadOnly")
        {
            document.getElementById("usernameInpCard").setAttribute("readOnly" , "true");
            document.getElementById("passwordInpCard").setAttribute("readOnly" , "true");
            document.getElementById("emailInpCard").setAttribute("readOnly" , "true");
            document.getElementById("DateInpCard").setAttribute("readOnly" , "true");
            document.getElementById("suggestNavCard").style.pointerEvents = "none";
            document.getElementById("submitEntryCard").style.pointerEvents = "none";


        }
        else
        {
            null;
        }
    }, 200);

  document.getElementById("usernameInpCard").value = "";
  document.getElementById("passwordInpCard").value = "";
  document.getElementById("DateInpCard").value = "";
  document.getElementById("emailInpCard").value = "";
  document.getElementById("selectedServiceCard").innerHTML = "";

  document.getElementById("usernameInpCard").style.disabled = true;

  document.getElementById("addCard").classList.contains("active") ? null : document.getElementById("addCard").classList.add("active");

  setTimeout(() => {
    typeWriterEffectValue("usernameInpCard", num);
    typeWriterEffectValue("passwordInpCard", cvv);
    typeWriterEffectValue("DateInpCard", exp);
    typeWriterEffectValue("emailInpCard", name);
    typeWriterEffectHTML("selectedServiceCard", cardService);
  }, 800);



}




document.getElementById("delete_button").addEventListener("click", (e) => {
  console.log(e.target.getAttribute("data-id"));
  typeWriterEffectHTML("delete_command", "Double Tap The Delete Button");
  setTimeout(() => {
    document.getElementById("delete_command").innerHTML = "";
  }, 6000);
})
document.getElementById("delete_button").addEventListener("dblclick", (e) => {
  console.log("double")
  document.getElementById("delete_command").innerHTML = "";
  document.getElementById("delete_button").style.transform = "translateX(-550px)";
    firebase.database().ref(localStorage.getItem("CurUsername")+"/"+e.target.getAttribute("data-id")).remove();
    location.reload();
})

document.getElementById("delete_button").addEventListener("touchend", (e) => {
  const now = (new Date()).getTime();
  const timeSinceLastTouch = now - lastTouchEnd;
  
  if (timeSinceLastTouch < 300 && timeSinceLastTouch > 0) {
    document.getElementById("delete_command").innerHTML = "";
    document.getElementById("delete_button").style.transform = "translateX(-550px)";
      firebase.database().ref(localStorage.getItem("CurUsername")+"/"+e.target.getAttribute("data-id")).remove();
      location.reload();
  }
  
  lastTouchEnd = now;
})





document.getElementById("delete_button_app").addEventListener("click", (e) => {
  console.log(e.target.getAttribute("data-id"));
  typeWriterEffectHTML("delete_command_app", "Double Tap The Delete Button");
  setTimeout(() => {
    document.getElementById("delete_command_app").innerHTML = "";
  }, 6000);
})
document.getElementById("delete_button_app").addEventListener("dblclick", (e) => {
  console.log("double")
  document.getElementById("delete_command_app").innerHTML = "";
  document.getElementById("delete_button_app").style.transform = "translateX(-550px)";
    firebase.database().ref(localStorage.getItem("CurUsername")+"/"+e.target.getAttribute("data-id")).remove();
    location.reload();
})

document.getElementById("delete_button_app").addEventListener("touchend", (e) => {
  const now = (new Date()).getTime();
  const timeSinceLastTouch = now - lastTouchEnd;
  
  if (timeSinceLastTouch < 300 && timeSinceLastTouch > 0) {
    document.getElementById("delete_command_app").innerHTML = "";
    document.getElementById("delete_button_app").style.transform = "translateX(-550px)";
      firebase.database().ref(localStorage.getItem("CurUsername")+"/"+e.target.getAttribute("data-id")).remove();
      location.reload();
  }
  
  lastTouchEnd = now;
})



document.getElementById("delete_button_card").addEventListener("click", (e) => {
  console.log(e.target.getAttribute("data-id"));
  typeWriterEffectHTML("delete_command_card", "Double Tap The Delete Button");
  setTimeout(() => {
    document.getElementById("delete_command_app").innerHTML = "";
  }, 6000);
})
document.getElementById("delete_button_card").addEventListener("dblclick", (e) => {
  console.log("double")
  document.getElementById("delete_command_card").innerHTML = "";
  document.getElementById("delete_button_card").style.transform = "translateX(-550px)";
    firebase.database().ref(localStorage.getItem("CurUsername")+"/"+e.target.getAttribute("data-id")).remove();
    location.reload();
})

document.getElementById("delete_button_card").addEventListener("touchend", (e) => {
  const now = (new Date()).getTime();
  const timeSinceLastTouch = now - lastTouchEnd;
  
  if (timeSinceLastTouch < 300 && timeSinceLastTouch > 0) {
    document.getElementById("delete_command_card").innerHTML = "";
    document.getElementById("delete_button_card").style.transform = "translateX(-550px)";
      firebase.database().ref(localStorage.getItem("CurUsername")+"/"+e.target.getAttribute("data-id")).remove();
      location.reload();
  }
  
  lastTouchEnd = now;
})




function decrypt(encrypted, secretKey)
{
  if(encrypted!=undefined)
  {
    const decryptedBytes = CryptoJS.AES.decrypt(encrypted, secretKey);
    const decrypted = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  }

}