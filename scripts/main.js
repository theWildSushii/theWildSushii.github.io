var root;
var daynightButton

function ready(callback) {
    if (document.readyState != 'loading') callback();
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
    else document.attachEvent('onreadystatechange', function () {
        if (document.readyState == 'complete') callback();
    });
}

function toggleDaynight() {
    if (root.classList.contains("light")) {
        daynightButton.innerText = "dark_mode";
        root.classList.add("dark");
        root.classList.remove("light");
    } else {
        daynightButton.innerText = "light_mode";
        root.classList.add("light");
        root.classList.remove("dark");
    }
}

ready(function () {
    root = document.querySelector(":root");
    daynightButton = document.getElementById("daynight-button");

    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
        daynightButton.innerHTML = "light_mode";
        root.classList.add("light");
        root.classList.remove("dark");
    } else {
        daynightButton.innerHTML = "dark_mode";
        root.classList.add("dark");
        root.classList.remove("light");
    }
});