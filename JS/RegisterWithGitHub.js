document.getElementById("signin_with_github").addEventListener("click", () => {
    var provider = new firebase.auth.GithubAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;

        var docRef = db.collection("users").doc(user.displayName);

        docRef.get().then((doc) => { // gets the whole data against the entered email address
            if (doc.exists) {
                localStorage.setItem("CurUsername", user.displayName);
                // window.location.replace("s2.html");
                redirectTo("password/");
            } else {
                document.getElementById("successLoaderContainer").classList.add("OpacityActive");
                var TilesAnimationInterval = setInterval(() => {
                    var n = Math.floor(Math.random() * (numberOfTilesSpawned - 0 + 1)) + 0;
                    document.querySelectorAll(".tile")[n].click();
                }, 1300);

                db.collection('users').doc(user.displayName.toLowerCase()).set({
                    username: user.displayName.toLowerCase(),
                    email: user.email,
                    uid: user.uid,
                    displayName: user.displayName,
                    dateCreated: date,
                    isDev: "DEV",
                    otp: 0,
                    provider: "Github",
                    lastPasswordChange: date,
                    user_logo: user.photoURL,
                }).then(() => {
                    var templateParams = {
                        name: user.displayName,
                        service_name: "Github",
                        email_provided: user.email,
                    };
                    emailjs.send('service_lw32yzm', 'template_jqmgo3l', templateParams)
                        .then(function(response) {
                            console.log('SUCCESS!', response.status, response.text);
                        }, function(error) {
                            console.log('FAILED...', error);
                        });

                    setTimeout(() => {
                        document.getElementById("successLoaderContainer").classList.remove("OpacityActive");
                        clearInterval(TilesAnimationInterval);
                    }, 3300);

                    localStorage.setItem("CurUsername", user.displayName);
                    redirectTo("password/");
                })
                .catch((err) => {
                    console.error("Error adding document: ", err);
                    setTimeout(() => {
                        document.getElementById("successLoaderContainer").classList.remove("OpacityActive");
                        clearInterval(TilesAnimationInterval);
                    }, 3300);
                });
            }
        }).catch((err) => {
            console.error("Error getting document:", err);
        });
    })
    .catch((err) => {
        console.error("Error during signInWithPopup:", err.message);
        if(err.message == "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.")
        {
            RegisterError("Email Associated with Different Account/Service");
        }
        else 
        {
            RegisterError("Some Error Occured!");
        }
    });
});
