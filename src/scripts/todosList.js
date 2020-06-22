import { getAllTodos, removeList, createTodoList } from './endPoints'
import { addToList } from './todos';

const todoSection = document.querySelector('#todo-section');
const todosSection = document.querySelector('#todos-section');
const todoMenu = document.querySelector('#todos-list');
const newTodoListBtn = document.querySelector('#new-todo-list-btn');
const goBackBtn = document.querySelector('#go-back-btn');

todoSection.style.display = "none";

export async function createTodoMenu() {
    todoMenu.innerHTML = "";
    const list = await getList();
    for (let doc in list) {
        createCard(doc);
    }
}

function createCard(text) {
    let card = document.createElement('li');
    card.className = "todo-card";
    card.append(createCardText(text));
    todoMenu.append(card);
    card.append(createDeleteButton());
}

function createCardText(text) { 
    let cardText = document.createElement('h3');
    cardText.innerText = text;
    cardText.addEventListener('click', (e) => {
        const todoToFetch = e.target.innerText;
        addToList(todoToFetch);
        document.querySelector('#todo-name-title').innerText = todoToFetch;
        todoSection.style.display = "block";
        todosSection.style.display = "none";
    });
    return cardText;
}

function createDeleteButton() {
    let edit = document.createElement('div');
    edit.className = "todo-edit-container";

    let trash = document.createElement('a');
    trash.className = "fas fa-trash";
    trash.addEventListener('click', (e) => {
        let pressedLi = e.currentTarget.parentNode.parentNode.childNodes[0].innerText;
        console.log(pressedLi);
        removeList(pressedLi);
        let items = todoMenu.getElementsByTagName('li');
        console.log(items.length);

        for (let i = 0; i < items.length; i++) {
            if (items[i].innerText === pressedLi) {
                todoMenu.removeChild(todoMenu.childNodes[i]);
            }
        }
    });
    edit.append(trash);
    return edit;
}

async function todoExists(text) {
    let list = await getList();
    for (let name in list) {
        if (text == name) {
            return true;
        }
    }
    return false;
}

async function getList() {
    const list = await getAllTodos();
    delete list.username;
    delete list.password;
    return list;
}

newTodoListBtn.addEventListener('submit', async (e) => {
    e.preventDefault();
    const textField = document.querySelector('#new-todo-text-field');
    const itemText = textField.value;
    if (!await todoExists(itemText)) {
        createTodoList(itemText);
        createCard(itemText);
        textField.value = "";
    } else {
        console.log(`${itemText} already exists`);
    }
})

goBackBtn.addEventListener('click', () => {
    todoSection.style.display = "none";
    todosSection.style.display = "flex";
})