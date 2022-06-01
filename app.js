'use strict';

const pickleRick = "https://rickandmortyapi.com/api/character/avatar/265.jpeg"
const mortySmith = "https://rickandmortyapi.com/api/character/avatar/2.jpeg"
const rickAndMortyUrl = "https://rickandmortyapi.com/api/character/1"
const randomizedCharacters = "https://rickandmortyapi.com/api/character/[1,2,3]"

function switchTheme() {
    console.log(document.body.classList)
    const currentBackground = document.body.classList[0]
    const titleElement = document.getElementById("Title")
    const titleTextColor = titleElement.classList[0]
    const themeButton = document.getElementById("themebutton")

    if (currentBackground == "bg-dark") {
        themeButton.innerHTML = "Dark"
        document.body.classList.replace(currentBackground, "bg-info")
        titleElement.classList.replace(titleTextColor, "text-black")
    } else {
        themeButton.innerHTML = "Light"
        document.body.classList.replace(currentBackground, "bg-dark")
        titleElement.classList.replace(titleTextColor, "text-white")
    }
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

function dynamicCarousel(randomizedCharacters) {
    fetch(randomizedCharacters)
        .then((response) => {
            return response.json();
        })
    .then((data) => {
        const carousel = document.getElementById('carousel-inner')
        const characterPicture = document.getElementById('carousel-item')
        characterPicture.setAttribute('src', data.image)
        const carouselItem = document.createElement('div');
        const Img = document.createElement('img');
        Img.setAttribute('src', data.image)


        carousel.append(Img);
    })
    .catch((error) => {
        console.log(error);
    });
}
    dynamicCarousel(randomizedCharacters);

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