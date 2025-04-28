

db.collection("users").doc(localStorage.getItem("CurUsername").toLowerCase()).onSnapshot((doc) => {
    document.getElementById("profileName").value = doc.data().displayName;
    document.getElementById("pro").innerHTML = doc.data().isDev;
    document.getElementById("profilePicData").setAttribute("src",  doc.data().user_logo);
    document.getElementById("profile_logo").style.background = `url("${doc.data().user_logo}")`
    document.getElementById("profile_logo").style.backgroundSize = "cover";

    document.getElementById("profile_logo_nav").style.background = `url("${doc.data().user_logo}")`
    document.getElementById("profile_logo_nav").style.backgroundSize = "cover";
    document.getElementById("profile_logo_top_nav").style.background = `url("${doc.data().user_logo}")`
    document.getElementById("profile_logo_top_nav").style.backgroundSize = "cover";

    document.getElementById("profile_name").innerHTML = "Hello, " + doc.data().displayName.slice(0,10)+"...";
})




function uploadUserDP()
{
    var input = document.createElement('input')
    input.type = 'file';
    input.accept = ".jpg";
    input.onchange = e =>
    {   
        thumbFile = e.target.files[0];
        editUserDP(thumbFile);
    }  
    input.click()
}

function editUserDP (usr_dp) {
    let numberOfTilesSpawned = document.querySelectorAll(".tile").length;
    document.getElementById("successLoaderContainer").classList.add("OpacityActive");
    var storageRef = firebase.storage(app).ref(localStorage.getItem("CurUsername")+"/"+"User_DP");

    //Upload file
    var task = storageRef.put(usr_dp);
    
    //Update progress bar
    task.on('state_changed',
        function progress(snapshot){
            var percentage_thumb = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            
            percentage_thumb = Math.floor(percentage_thumb) + "%";
            globalThis.TilesAnimationInterval = setInterval(() => {
                var n = Math.floor(Math.random() * (numberOfTilesSpawned - 0 + 1)) + 0;
               document.querySelectorAll(".tile")[n].click();
              }, 1300 );

        },  
        function error(err){
                editUserDP(usr_dp);
        },
        function complete(){
            task.snapshot.ref.getDownloadURL().then(function(url){
                    // console.log(url);

                    var downloadUrl = url;
                    db.collection('users').doc("cypher dev").update({
                        user_logo : String(downloadUrl)
                    });
                    document.getElementById("profilePicData").setAttribute("src",  url);
            })
            setTimeout(() => {
                document.getElementById("successLoaderContainer").classList.remove("OpacityActive");
                clearInterval(TilesAnimationInterval)
            }, 1200);
            
        }
    );

}