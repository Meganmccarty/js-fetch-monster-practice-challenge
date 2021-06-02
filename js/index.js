const submissionForm = document.getElementById('create-monster');
const monsterContainer = document.getElementById('monster-container');
const forwardButton = document.getElementById('forward');
const backButton = document.getElementById('back');

let currentPage = 1;

function getMonsters(currentPage) {
    monsterContainer.innerHTML = '';
    return fetch(`http://localhost:3000/monsters/?_limit=50&_page=${currentPage}`)
    .then(response => response.json())
    .then(data => data.map(element => displayData(element)))
}

function displayData(data) {
    const newDiv = document.createElement('div');
    const h2 = document.createElement('h2');
    h2.innerText = data.name;
    const h4 = document.createElement('h4');
    h4.innerText = data.age;
    const p = document.createElement('p');
    p.innerText = data.description;
    newDiv.append(h2, h4, p);
    monsterContainer.append(newDiv);
}

const form = document.querySelector('form');
const inputName = form[0];
const inputAge = form[1];
const inputDesc = form[2];

form.addEventListener('submit', createMonster);

function createMonster(e) {
    e.preventDefault();
    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "name": inputName.value,
            "age": inputAge.value,
            "description": inputDesc.value
        })
    }

    console.log(configObj);

    fetch(monstersAPI, configObj)
    .then(response => response.json())
    .then(data => displayData(data))
    .catch(error => console.log(error));
}

forwardButton.addEventListener('click', goForward);
backButton.addEventListener('click', goBackward);

function goForward() {
    console.log(currentPage);
    currentPage++;
    return getMonsters(currentPage);
}

function goBackward() {
    if (currentPage > 1) {
        currentPage--;
        return getMonsters(currentPage);
    }
}

console.log(getMonsters());