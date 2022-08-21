let NAVBAR;

window.onload = function() {Init()};

// subscribes function to scrolling action
window.onscroll = function () {toSticky()};

function Init()
{
    //gets Navbar object
    NAVBAR =  document.getElementById("nb");
}

// attaches sticky and non sticky function
function toSticky() 
{
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) NAVBAR.classList.add("sticky");
    else NAVBAR.classList.remove("sticky");
}
