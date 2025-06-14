const tabsContainer = document.getElementById("tabsContainer");

let currentOpenedTab = null;

function handleTabClick(e) {
    const clickedTabText = e.target.textContent;
    if(currentOpenedTab) {
        currentOpenedTab.hidden = true;
    }

    const clickedTab = document.getElementById(e.target.textContent.toLowerCase());
    if(clickedTab) {
        clickedTab.hidden = false;
        currentOpenedTab = clickedTab;
    }
}




window.onload = () => {
    tabsContainer.addEventListener("click", handleTabClick)
}

window.onbeforeunload = (e) => {
    tabsContainer.removeEventListener("click", handleTabClick);
}