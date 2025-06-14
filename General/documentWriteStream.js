const body = document.getElementById("body");
const h1Element = document.createElement("h1");
h1Element.textContent = "This is some text";
const h2Element = document.createElement("h2");
h1Element.textContent = "This is some text 2";
body.appendChild(h1Element)
body.replaceChild(h2Element);