'use strict';

function switchTheme() {
    console.log(document.body.classList)
    const currentBackground = document.body.classList[0]
    const themeButton = document.getElementById("themebutton")

    if (currentBackground == "bg-dark") {
        themeButton.innerHTML = "Dark"
        document.body.classList.replace(currentBackground, "bg-info")
    } else {
        themeButton.innerHTML = "Light"
        document.body.classList.replace(currentBackground, "bg-dark")
    }
}

function Pressed() {
    const text = document.getElementById("navsearch").value.toLowerCase();
    const mortyText = "morty smith"
    const pickleRickText = "pickle rick"
    const pickleRick = "https://rickandmortyapi.com/api/character/avatar/265.jpeg"
    const mortySmith = "https://rickandmortyapi.com/api/character/avatar/2.jpeg"

    if (text.length > 3 && mortyText.includes(text)) {
        image.setAttribute('src', mortySmith)
    } else if (pickleRickText.includes(text)) {
        image.setAttribute('src', pickleRick)
    } else {
        console.log(text)
    }
}

function dynamicCarousel(url) {
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const carouselInner = document.getElementById('carouselInner');

            for (let character of data) {
                const carouselImage = document.createElement('img');
                carouselImage.setAttribute('src', character.image);
                carouselImage.classList.add("d-block", "mx-auto", "img-fluid", "rounded");
                const carouselItem = document.createElement('div');

                if (data.indexOf(character) == 0) {
                    carouselItem.classList.add("carousel-item", "active");

                } else {
                    carouselItem.classList.add("carousel-item");
                }

                carouselItem.appendChild(carouselImage);
                carouselInner.appendChild(carouselItem);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function fetchCharacter(url) {
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const cardContainer = document.getElementById('cardbody')
            const rickPicture = document.getElementById('cardimg')
            rickPicture.setAttribute('src', data.image)

            cardContainer.innerHTML =
                `
            <h2 class="card-title">${data.name}</h2>
            <p class="card-text mb-1">Status: ${data.status}</p> 
            <p class="card-text mb-1">Species: ${data.species}</p>
            <p class="card-text mb-1">Gender: ${data.gender}</p>
            <p class="card-text mb-1">Origin: ${data.origin['name']}</p>
            `
        })
        .catch((error) => {
            console.log(error);
        });
}

function RandomUrlConstructor() {
    const randomNumArray = Array.from({ length: 3 }, () => Math.floor(Math.random() * 826) + 1);
    const randomUrl = `https://rickandmortyapi.com/api/character/${randomNumArray}`
    return randomUrl;
}

const rickAndMortyUrl = "https://rickandmortyapi.com/api/character/1"
const randomizedCharacters = RandomUrlConstructor();

fetchCharacter(rickAndMortyUrl);
dynamicCarousel(randomizedCharacters);