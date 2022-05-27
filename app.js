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
const cardContainer = document.getElementById('cardbody')
const list = document.createDocumentFragment();

fetch(rickAndMortyUrl)
    .then((response) => {
        return response.json();
    })
    .then((data) => {

        console.log(data)
        let name = document.createElement('h1');

        let rickPicture = document.getElementById('cardimg')
        rickPicture.setAttribute('src', data.image)

        let status = document.createElement('p');
        let species = document.createElement('p');
        let gender = document.createElement('p');
        let origin = document.createElement('p');

        name.innerHTML = `${data.name}`;
        status.innerHTML = `Status: ${data.status}`;
        species.innerHTML = `Species: ${data.species}`;
        gender.innerHTML = `Gender: ${data.gender}`;
        origin.innerHTML = `Origin: ${data.origin['name']}`;

        cardContainer.append(name, status, species, gender, origin);
    })
    .catch((error) => {
        console.log(error);
    });

