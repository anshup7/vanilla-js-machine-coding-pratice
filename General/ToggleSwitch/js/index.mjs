const toggleButton = document.getElementById("toggleButton");

function handleToggleSwitchClick(e) {
    const toggleStatus = e.target.getAttribute("data-toggle-status");
    if(!toggleStatus || toggleStatus == "false") {
        e.target.setAttribute("data-toggle-status", "true");
        e.target.classList.add("toggle-right");
    } else {
        e.target.setAttribute("data-toggle-status", "false");
        e.target.classList.remove("toggle-right");
    }
}

window.onload = () => {
    toggleButton.addEventListener("click", handleToggleSwitchClick);
}

window.onbeforeunload = () => {
    toggleButton.removeEventListener("click", handleToggleSwitchClick);
}