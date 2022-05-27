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
const cardContainer = document.getElementById('cardbody')

fetch(rickAndMortyUrl)
    .then((response) => {
        return response.json();
    })
    .then((data) => {

        console.log(data)

        const rickPicture = document.getElementById('cardimg')
        rickPicture.setAttribute('src', data.image)
        const stats = document.createElement('div');

        stats.innerHTML =
            `
            <h1>${data.name}</h1>
            <p>Status: ${data.status}</p> 
            <p>Species: ${data.species}</p>
            <p>Gender: ${data.gender}</p>
            <p>Origin: ${data.origin['name']}</p>
            `
        cardContainer.append(stats);
    })
    .catch((error) => {
        console.log(error);
    });

