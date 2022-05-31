'use strict';

const pickleRick = "https://rickandmortyapi.com/api/character/avatar/265.jpeg"
const mortySmith = "https://rickandmortyapi.com/api/character/avatar/2.jpeg"
const rickAndMortyUrl = "https://rickandmortyapi.com/api/character/1"

// button.addEventListener('click', function () {
//     document.body.classList.toggle('light-theme');
//     document.body.classList.toggle('dark-theme');

//     const className = document.body.className;

//     const imageSRC = image.getAttribute('src')

//     if (className == "light-theme") {
//         this.textContent = "Dark";
//     } else {
//         this.textContent = "Light";
//     }

//     if (imageSRC === pickleRick) {
//         image.setAttribute('src', mortySmith)
//     } else {
//         image.setAttribute('src', pickleRick)
//     }
// });
function switchTheme() {
    console.log(document.body.classList)
    const currentBackground = document.body.classList[0]
    const text = document.body.text
    console.log(currentBackground)
    document.body.classList.replace(currentBackground, "bg-dark")
    if (currentBackground == "bg-dark"){
        document.body.classList.replace(currentBackground, "bg-info")

    }
    document.body.classList.replace(currentBackground, "bg-dark")
}

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
            <h4 class="card-title text-center">${data.name}</h4>
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
}

fetchCharacter(rickAndMortyUrl);
switchTheme()