import css from './styles/style.css';
import { createTodoMenu } from './scripts/todosList';

require('./scripts/login.js');
require('./scripts/createAccount.js');
require('./scripts/todos.js');
require('./scripts/todosList.js');

const createAccountLink = document.querySelector('#create-account-toggle');
const loggedInSection = document.querySelector('#logged-in-section');
const createAccountDisplay = document.querySelector('#account-section');
const loginDisplay = document.querySelector('#login-section');


if (sessionStorage.getItem("userId") != null) {
    loggedInSection.style.display = "block";
    document.querySelector("#not-logged-in").style.display = "none";
    document.querySelector('#todos-section').style.display = "flex";
    createTodoMenu();
} else {
    console.log("none");
    createAccountDisplay.style.display = "none";
    loggedInSection.style.display = "none";
}

//=================================
createAccountLink.addEventListener('click', () => {
    if (createAccountDisplay.style.display === "none") {
        createAccountDisplay.style.display = "block";
        loginDisplay.style.display = "none";
        createAccountLink.childNodes[1].innerText = "Back To Login Page";

    } else {
        createAccountDisplay.style.display = "none";
        loginDisplay.style.display = "block";
        createAccountLink.childNodes[1].innerText = "Create Account";
    }
})