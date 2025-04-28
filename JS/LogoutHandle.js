

document.getElementById("submitEntryCardLogout").addEventListener("click", () => {

    var docRef = db.collection("users").doc(localStorage.getItem("CurUsername").toLowerCase());
    docRef.get().then((doc) => {
        if(doc.data().provider == "Google")
        {
            firebase.auth().signOut().then(function() {
            document.getElementById("loginform").style.opacity = 1;
            document.getElementById("loginform").style.pointerEvents = "all";
            document.getElementById("registerForm").style.opacity = 1;
            document.getElementById("registerForm").style.pointerEvents = "all";
            

            document.getElementById("LogoutForm").style.transform = "translateY(1204px)";
            document.getElementById("LogoutForm").style.opacity = 0;
            document.getElementById("LogoutForm").style.pointerEvents = "none";


            localStorage.clear();
            location.reload();
            })
        }

        else if(doc.data().provider == "Github")
        {
            firebase.auth().signOut().then(function() {
            document.getElementById("loginform").style.opacity = 1;
            document.getElementById("loginform").style.pointerEvents = "all";
            document.getElementById("registerForm").style.opacity = 1;
            document.getElementById("registerForm").style.pointerEvents = "all";

            document.getElementById("LogoutForm").style.transform = "translateY(1204px)";
            document.getElementById("LogoutForm").style.opacity = 0;
            document.getElementById("LogoutForm").style.pointerEvents = "none";


            localStorage.clear();
            location.reload();
            })
        }

        else if(doc.data().provider == "Firebase")
        {
            document.getElementById("loginform").style.opacity = 1;
            document.getElementById("loginform").style.pointerEvents = "all";
            document.getElementById("registerForm").style.opacity = 1;
            document.getElementById("registerForm").style.pointerEvents = "all";

            document.getElementById("LogoutForm").style.transform = "translateY(1204px)";
            document.getElementById("LogoutForm").style.opacity = 0;
            document.getElementById("LogoutForm").style.pointerEvents = "none";


            localStorage.clear();
            location.reload();
        }
    })
    
})

document.getElementById("reEnter").addEventListener("click", () => {
    // location.replace("s2.html");
    redirectTo("password/");
})