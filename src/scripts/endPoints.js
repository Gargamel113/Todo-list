import { db, firestore } from './databaseConnection';
const users = db.collection('users');
let userKey, user;
//==============READ FUNCTIONS==================
// user = db.collection('users').doc("uKxDrlWoex8GOe5vZfQH");
// user = db.collection('users');

//READ ALL TODOS FROM CHOOSEN TODOLIST
export async function getTodo(field) {
    if (user) {
        const doc = await user.get();
        return doc.get(field);
    }
}

export async function getAllTodos() {
    if (sessionStorage.getItem("userId")){
        const key = sessionStorage.getItem("userId");
        user = db.collection('users').doc(key);
        const doc = await user.get();
        return doc.data();
    }
}

async function userExists(name, pass) {
    const key = await users.where("username", "==", name)
        .get()
        .then((e) => {
            return checkCredentials(e, { name: name, pass: pass });
        });
    return verifyUserKey(key);
}
//==============LOGIN FUNCTIONS==================
export async function login(userName = "default", password = "default") {
    const key = await users.where("username", "==", userName)
        .get()
        .then((e) => {
            return checkCredentials(e, { name: userName, pass: password });
        });
    return verifyUserKey(key);
}

function checkCredentials(r_data, l_data) {
    let foundUser;
    r_data.forEach((doc) => {
        let username = doc.data().username;
        let password = doc.data().password;
        if (!foundUser) {
            foundUser = (username === l_data.name && password === l_data.pass) ? doc.id : "No-key";
        }
    })
    return foundUser;
}

function verifyUserKey(key) {
    if (key && key != "No-key") {
        userKey = key;
        user = db.collection('users').doc(key);
        sessionStorage.setItem("userId", key);
        return true;
    } else {
        return false;
    }
}
//==============UPDATE FUNCTIONS==================
export async function setTicked(item, ticked, currentTodoList) {
    const document = await user.get();
    const list = document.get(currentTodoList);

    for (let i = 0; i < list.length; i++) {
        if (list[i].text === item) {
            list[i].text = item;
            list[i].ticked = ticked;
            let updatedList = {};
            updatedList[currentTodoList] = list;
            user.update(updatedList);
        }
    }
}

export async function updateItems(oldItem, newItem, currentTodoList) {
    const document = await user.get();
    const list = document.get(currentTodoList);

    for (let i = 0; i < list.length; i++) {
        if (list[i].text === oldItem) {
            list[i].text = newItem;
            let updatedList = {};
            updatedList[currentTodoList] = list;
            user.update(updatedList);
        }
    }
}
//==============DELETE FUNCTIONS==================
export function removeItem(item, currentTodoList) {
    const itemToRemove = {}
    itemToRemove[currentTodoList] = firestore.FieldValue.arrayRemove(item);
    user.update(itemToRemove);
}

export function removeList(listName) {
    const itemToRemove = {}
    itemToRemove[listName] = firestore.FieldValue.delete();
    user.update(itemToRemove);
}
//==============CREATE FUNCTIONS==================
//CREATE NEW USER
export async function createUser(name, pass) {
    return await userExists(name, pass)
        .then((value) => {
            if (value) {
                console.log("User already exists");
                return false;
            } else {
                users.add({
                    username: name,
                    password: pass,
                }).then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                }).catch((err) => {
                    console.error("Error adding document: ", err);
                });
                return true;
            }
        })
}

//ADD NEW TODO ITEM
export async function addItem(item, currentTodoList) {
    let newItem = {
        text: item,
        ticked: false,
    };
    const updatedObj = {}
    updatedObj[currentTodoList] = firestore.FieldValue.arrayUnion(newItem);
    user.update(updatedObj);
}

export async function createTodoList(name) {
    let document = await getAllTodos();

    let jdoc = JSON.stringify(document);
    let newJson = jdoc.substring(0, jdoc.length - 1);
    newJson += `,"${name}":[]}`;
    const newDoc = JSON.parse(newJson);
    user.update(newDoc);
}