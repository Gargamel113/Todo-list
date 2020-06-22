import { getTodo, addItem, removeItem, setTicked, updateItems } from './endPoints.js';

const todoList = document.querySelector('#todo-list');
const itemForm = document.querySelector('#add-todo');
let currentTodoList;

async function addToList(listName) {
    todoList.innerText = "";
    currentTodoList = listName;
    console.log(`currentTodoList: ${currentTodoList}`);
    const list = await getTodo(listName);
    for (let key in list) {
        todoList.append(createLi(list[key]));
    }
}

function createEditDiv() {
    let edit = document.createElement('div');
    edit.className = "item-edit-container";
    edit.append(createEditButton());
    edit.append(createRemoveButton());
    return edit;
}

function createEditButton() {
    let pen = document.createElement('a');
    pen.className = "fas fa-pen";
    pen.addEventListener('click', (e) => {
        let newInput = prompt("Enter new item: ");
        if (newInput != "" && newInput != null) {
            let oldItem = e.currentTarget.parentNode.parentNode.childNodes[0].innerText;
            updateItems(oldItem, newInput, currentTodoList);
            updateTodoList("update", { oldText: oldItem, newText: newInput });
        }
    });
    return pen;
}

function createRemoveButton() {
    let trash = document.createElement('a');
    trash.className = "fas fa-trash";
    trash.addEventListener('click', (e) => {
        let pressedLi = e.currentTarget.parentNode.parentNode.childNodes[0];
        console.log(pressedLi.innerText);
        removeItem({
            text: pressedLi.innerText,
            ticked: pressedLi.className == "false" ? false : true,
        }, currentTodoList);
        updateTodoList("remove", pressedLi.innerText);
    });
    return trash;
}


function createLi(data) {
    let li = document.createElement('li');
    let p = document.createElement('p');
    p.className = data.ticked;
    p.innerText = data.text;
    p.addEventListener('click', (e) => {
        if (e.target.className === "false") {
            e.target.className = "true";
        } else {
            e.target.className = "false";
        }
        let name = e.target.innerText;
        let tick = e.target.className === "false" ? false : true;
        setTicked(name, tick, currentTodoList);
    });
    li.appendChild(p);
    li.appendChild(createEditDiv());
    return li;
}


//ADD NEW TODO
itemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let itemText = document.querySelector('#item')
    if (itemText.value != "") {
        addItem(itemText.value, currentTodoList);
        updateTodoList("add", { text: itemText.value, ticked: false });
    }
    itemText.value = "";
});

function updateTodoList(option, item) {
    switch (option) {
        case "add": todoList.append(createLi(item))
            break;
        case "remove": removeLocalLi(item);
            break;
        case "update": updateLi(item);
            break;
    }
}

function updateLi(item) {
    let items = todoList.getElementsByTagName('li');
    for (let key in items) {
        if (items[key].innerText === item.oldText) {
            todoList.childNodes[key].childNodes[0].innerText = item.newText;
        }
    }
}

function removeLocalLi(text) {
    let items = todoList.getElementsByTagName('li');
    for (let key in items) {
        if (items[key].innerText === text) {
            todoList.removeChild(todoList.childNodes[key]);
        }
    }
}

export { addToList };