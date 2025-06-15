const myEmail = "hello@anshumanupadhyay.me";
const myPassword = "YOUR_PASSWORD";
const verifyPassword = myPassword;

const forms = document.forms[0];

const elements = [myEmail, myPassword, verifyPassword];

for(let i = 0; i <= 2; i++) {
    forms[i].value = elements[i];
}