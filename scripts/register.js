const key = "6302026b39a0a971fe916256";

let clickable = true;

const lottie = $(".lottie");

const box = $("#toggleContainer .box");

let input = [];

let text = "";

let _id = "";

const notif = $(".notif");

$(document).ready(function() {
    lottie.hide();
    sessionStorage.clear();
});

function PostData()
{
    var jsondata = {"password": input[1],"username": input[0]};
    var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://asg2jigokunoryokan-b425.restdb.io/rest/login",
    "method": "POST",
    "headers": {
        "content-type": "application/json",
        "x-apikey": key,
        "cache-control": "no-cache"
    },
    "processData": false,
    "data": JSON.stringify(jsondata)
    }

    $.ajax(settings).done(function (response) {
    console.log(response);
    sessionStorage.setItem("earlyPrompt", true);
    window.open("../login.html");
    window.close();
    });
}


$("#submit").click(function () {
    if (!clickable) return;
    clickable = false;
    notif.removeClass("prompt");
    toggleLottie();
    input = [$("#username").val(), $("#password").val(), $("#confirm").val()];

    if (input[0] == "" || input[1] == "" || input[2] == "")
    {
        clickable = true;
        toggleLottie();
        return;
    }
    console.log("accepted");

    // if the confirm password fails
    if (input[1] != input[2])
    {
        clickable = true;
        toggleLottie();
        text = "Passwords do not match";
        notif.html(text);
        console.log("incorrect " + text);
        notif.addClass("prompt");
        notif.show();
        window.setTimeout(function(){
            notif.hide();
            notif.removeClass("prompt");
        }, 8000);
        return;
    }
    PostData();

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
