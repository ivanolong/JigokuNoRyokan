let _id = "";

let yourName = "";

const key = "6302026b39a0a971fe916256";

$(document).ready(function() {
    console.log("ready");
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://asg2jigokunoryokan-b425.restdb.io/rest/chat`,
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "x-apikey": key,
          "cache-control": "no-cache"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        decipherText(response);
    });

    _id = sessionStorage.getItem("_id");
    if (_id == undefined || _id == "") {
        console.log("not logged in");
        const messageRegion = $(".sendMessage")
        messageRegion.empty();
        messageRegion.attr("style", "display: block; width: 70vw; height: 70%; background-color:white;");
        messageRegion.append("<div style='display: flex; align-items: center; justify-content: space-evenly; flex-direction: column; width: 70vw; height: 30vh;'><div class='info' style='font-size: 2vw;'>Not a Member yet? Log in here!</div><a href='../login.html' style='width: 10vw; padding:2.5vh; border-radius: 1vw; border: 0.1vw solid black; cursor:pointer; background-color:orange; text-align:center;'>Log In</button></div>");
        return;
    }

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
        yourName = response.username;
    });

});

async function decipherText(textData)
{
    let content = "";
    let name = "";
    let message = "";
    for (let i = textData.length -1; i > 0; i--) {
        name = textData[i].username;
        message = textData[i].message;
        content += `<div class="message-wrapper"><div class="profile-wrapper"><div class="pfp"></div><div class="username"> ${name} </div></div><div class="messages"> ${message}</div></div>`;
    }
    $("#chatSpace").append(content);
}


$(document).on("click", "button", function(){
    let message = $("textarea").val();
    if (message == "") {
        $("textarea").attr("placeholder","You cannot send empty messages.");
        return;
    }
    
    var jsondata = {"message": message,"username": yourName};
    $("textarea").val('');
    var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://asg2jigokunoryokan-b425.restdb.io/rest/chat",
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
    window.location.reload();
    });
})