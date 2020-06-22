import { login } from './endPoints.js';
import { createTodoMenu } from './todosList.js';


const loginForm = document.querySelector('#login');
const logoutBtn = document.querySelector('.logout');
const notLoggedInSection = document.querySelector('#not-logged-in');
const loggedInSection = document.querySelector('#logged-in-section');


loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userName = document.querySelector('#user-name').value;
    const userPass = document.querySelector('#user-pass').value;
    checkCredentials(userName, userPass);
});

logoutBtn.addEventListener('click', (e) => {
    sessionStorage.clear();
    e.preventDefault();
    logUserOut();
});

function checkCredentials(username, password) {
    login(username, password).then((value) => {
        if (value) {
            console.log(`${username} is loggin in`);
            logUserIn();
        } else {
            console.log("Username or password is wrong");
            document.querySelector('#wrong-password-or-username-text').innerText = "Username or password is wrong";
        }
    });
}

function logUserIn() {
    createTodoMenu();
    loggedInSection.style.display = "block";
    notLoggedInSection.style.display = "none";
}

function logUserOut() {
    loggedInSection.style.display = "none";
    notLoggedInSection.style.display = "block";
    document.querySelector('#user-name').value = "";
    document.querySelector('#user-pass').value = "";
    document.querySelector('#todo-section').style.display = "none";
    document.querySelector("#account-section").style.display = "none";
    document.querySelector('#todos-section').style.display = "flex";
}