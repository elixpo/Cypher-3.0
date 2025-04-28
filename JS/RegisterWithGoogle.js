document.getElementById("signin_with_google_reg").addEventListener("click", () => {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
        // This gives you a Google Access Token.
        var token = result.credential.accessToken;
        console.log(token);
        // This gives you the signed-in user.
        var user = result.user;
        console.log(user);
        var docRef = db.collection("users").doc(user.displayName);
        docRef.get().then((doc) => { // gets the whole data against the entered email address
            if (doc.exists) {
                localStorage.setItem("CurUsername", user.displayName);
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
                    emailVerified: user.emailVerified,
                    displayName: user.displayName,
                    dateCreated: date,
                    isDev: "DEV",
                    otp: 0,
                    provider: "Google",
                    lastPasswordChange: date,
                    user_logo: user.photoURL,
                }).then(() => {
                    var templateParams = {
                        name: user.displayName,
                        service_name: "Google",
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
                }).catch((err) => {
                    console.error("Error adding document:", err);
                });
            }
        });
    })
    .catch(function(error) {
        // Handle errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if(error.message)
        {
            LoginError("There's an Error");
        }
    });
});


