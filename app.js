'use strict';

const button = document.querySelector('.btn');
const image = document.querySelector('img')

const pickleRick = "https://rickandmortyapi.com/api/character/avatar/265.jpeg"
const mortySmith = "https://rickandmortyapi.com/api/character/avatar/2.jpeg"

button.addEventListener('click', function () {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');

    const className = document.body.className;

    const imageSRC = image.getAttribute('src')

    if (className == "light-theme") {
        this.textContent = "Dark";
    } else {
        this.textContent = "Light";
    }

    if (imageSRC === pickleRick) {
        image.setAttribute('src', mortySmith)
    } else {
        image.setAttribute('src', pickleRick)
    }
});

function Pressed() {
    const text = document.getElementById("inp").value.toLowerCase();
    const mortyText = "morty smith"
    const pickleRickText = "pickle rick"

    if (text.length > 3 && mortyText.includes(text)) {
        image.setAttribute('src', mortySmith)
    } else if (pickleRickText.includes(text)) {
        image.setAttribute('src', pickleRick)
    } else {
        console.log(text)
    }
}

const rickAndMortyUrl = "https://rickandmortyapi.com/api/character/1"
const div = document.getElementById('rickAndMorty');
const list = document.createDocumentFragment();

fetch(rickAndMortyUrl)
    .then((response) => {
        return response.json();
    })
    .then((data) => {

        console.log(data)
        let name = document.createElement('h1');

        let picture = document.createElement('img');
        picture.setAttribute("height", 100);
        picture.setAttribute("width", 100);
        picture.alt = `image of ${data.name}`

        let status = document.createElement('p');
        let species = document.createElement('p');
        let gender = document.createElement('p');
        let origin = document.createElement('p');

        picture.src = `${data.image}`;
        name.innerHTML = `${data.name}`;
        status.innerHTML = `Status: ${data.status}`;
        species.innerHTML = `Species: ${data.species}`;
        gender.innerHTML = `Gender: ${data.gender}`;
        origin.innerHTML = `Origin: ${data.origin['name']}`;

        div.appendChild(picture);
        div.appendChild(name);
        div.appendChild(status);
        div.appendChild(species);
        div.appendChild(gender);
        div.appendChild(origin);

    })
    .catch((error) => {
        console.log(error);
    });

