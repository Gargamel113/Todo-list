import { createUser } from './endPoints.js';


const createAccountForm = document.querySelector('#create-account');


createAccountForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    let user = document.querySelector('#c-user-name').value;
    let pass = document.querySelector('#c-user-pass').value;
    let passConfirm = document.querySelector('#c-user-pass-confirm').value;
    if (pass != passConfirm) {
        document.querySelector('#accountText').innerText = "Password did not match";
    } else {
        const response = await createUser(user, pass);
        if (response) {
            document.querySelector('#accountText').innerText = `User ${user} Was Created`;
        } else {
            document.querySelector('#accountText').innerText = `User ${user} Already Exists`;
        }
    }
});