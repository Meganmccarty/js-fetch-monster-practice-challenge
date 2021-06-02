const submissionForm = document.getElementById('create-monster');
const monsterContainer = document.getElementById('monster-container');
const forwardButton = document.getElementById('forward');
const backButton = document.getElementById('back');

const monstersAPI ='http://localhost:3000/monsters/';

function getMonsters() {
    return fetch(monstersAPI)
    .then(response => response.json())
    .then(data => displayData(data))
}

function displayData(data) {
    for (let i = 0; i <= 49; i++) {
        const newDiv = document.createElement('div');
        const h2 = document.createElement('h2');
        h2.innerText = data[i].name;
        const h4 = document.createElement('h4');
        h4.innerText = data[i].age;
        const p = document.createElement('p');
        p.innerText = data[i].description;
        newDiv.append(h2, h4, p);
        monsterContainer.append(newDiv);
    }
}

console.log(getMonsters());