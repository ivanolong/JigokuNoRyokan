const key = "6302026b39a0a971fe916256";

let clickable = true;

const lottie = $(".lottie");

const box = $("#toggleContainer .box");

let input = [];

let text = "";

let _id = "";

const notif = $(".notif");

// prompts user to log in after registering
$(document).ready(function() {
    if (sessionStorage.getItem("earlyPrompt"))
    {
        sessionStorage.clear();
        text = "Login again";
        notif.html(text);
        notif.attr("style", "background-color:green");
        notif.addClass("prompt");
        notif.show();
        window.setTimeout(function(){
            notif.attr();
            notif.hide();
            notif.removeClass("prompt");
        }, 8000);
    }
    lottie.hide();
    _id = sessionStorage._id;
    if (_id == undefined || _id == "") return;

    console.log("logged in");
    $("body").empty();
    $("body").append("<nav id='nb' class='navbar'><h1 class='logo'>Jigoku No Ryokan</h1><ul class='menu'><li><a href='./index.html'>Download</a></li><li><a href='./tipsNTricks.html'>Tips and Tricks</a></li><li><a href='../blog.html'>Blog</a></li><li><a href='./aboutUs.html'>About Us</a></li><li><a href='#top'>Login</a></li></ul></nav><div style='width: 100vw; height: 90vh; background-image: url(../assets/background.jpg); display: flex; justify-content: center; align-items: center; flex-direction: column;'><div id='user' style='color: white; -webkit-text-stroke: 2px black; font-weight: 700; font-size:3vw;'>Hello YourName, what would you like to do today?</div><button id='logOut' class='btn' style='width: 30%; cursor: pointer; height: 10%; background-color: red; border-radius: 5vw; color: white; font-size: 1vw;'>Log Out</button></div>");

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://asg2jigokunoryokan-b425.restdb.io/rest/login/${_id}`,
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "x-apikey": key,
          "cache-control": "no-cache"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        $("#user").empty();
        $("#user").append("Hello " + response["username"] + ", what would you like to do today?");
    });

});

function GetData()
{
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://asg2jigokunoryokan-b425.restdb.io/rest/login",
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "x-apikey": key,
          "cache-control": "no-cache"
        }
      }

    $.ajax(settings).done(function (response) {
        console.log(response);

        for (let i = 0; i < response.length; i++)
        {
            if (response[i]["username"] != input[0]) 
            {
                text = "wrong username";
                // called when lottie is to end.
                continue;
            }
            
            if (response[i]["password"] != input[1])
            {
                text = "wrong password";
                // called when lottie is to end.
                continue;
            }
            text = "cleared";
            _id = response[i]._id;
            console.log(_id);
            break;
        }     
        
        // if the pw and username are correct, switch sites
        if (text == "cleared")
        {
            sessionStorage.setItem("_id", _id);
            window.location.reload();
            return;
        }

        notif.html(text);
        console.log("incorrect " + text);
        notif.addClass("prompt");
        notif.show();
        window.setTimeout(function(){
            notif.hide();
            notif.removeClass("prompt");
        }, 8000);
        clickable = true;
        toggleLottie();
      });

      
}

$(document).on("click", "#logOut.btn", function(){
    sessionStorage.clear();
    window.location.reload();
});

$("#submit").click(function () {
    if (!clickable) return;
    clickable = false;
    notif.removeClass("prompt");
    toggleLottie();
    input = [$("#username").val(), $("#password").val()]
    if (input[0] == "" || input[1] == "") 
    {
        clickable = true;
        toggleLottie();
        return;
    };
    console.log("accepted");
    GetData()
});

function toggleLottie()
{
    // if button is clickable, hide lottie and show input
    if (!clickable) {
        lottie.show();
        box.hide();
    } else {
        lottie.hide();
        box.show();
    }
};