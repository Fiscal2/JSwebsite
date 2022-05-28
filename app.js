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


function fetchCharacter(url) {
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            console.log(data)
            const cardContainer = document.getElementById('cardbody')
            const rickPicture = document.getElementById('cardimg')
            rickPicture.setAttribute('src', data.image)
            const stats = document.createElement('div');

            stats.innerHTML =
                `
            <h1>${data.name}</h1>
            <h4>Status: ${data.status}</h4> 
            <h4>Species: ${data.species}</h4>
            <h4>Gender: ${data.gender}</h4>
            <h4>Origin: ${data.origin['name']}</h4>
            `
            cardContainer.append(stats);
        })
        .catch((error) => {
            console.log(error);
        });
}

fetchCharacter(rickAndMortyUrl);

function enterListener(e) {
    document.querySelector('#txtSearch').addEventListener('keypress', function () {
        if (e.key === 'Enter') {
          image.setAttribute('src', mortySmith)
        } else if (pickleRickText.includes(text)) {
            image.setAttribute('src', pickleRick)
        } else {
            console.log(text)
        }
        
    });
}

enterListener();