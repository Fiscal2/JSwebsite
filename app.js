'use strict';

const rickAndMortyUrl = "https://rickandmortyapi.com/api/character/1"
const randomizedCharacters = "https://rickandmortyapi.com/api/character/[1,2,3]"
var apiLink = ""

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

function dynamicCarousel(apiLink) {
    fetch(apiLink)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);

            const carouselInner = document.getElementById('carouselInner');

            for (let character of data) {
                const carouselImage = document.createElement('img');
                carouselImage.setAttribute('src', character.image);
                carouselImage.classList.add("d-block", "mx-auto", "img-fluid");
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
dynamicCarousel(apiLink);

function fetchCharacter(url) {
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
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

function RandomUrlConstructor(apiLink) {
    // You will need to make an array with 3 random numbers in it...
    const randomNumArray = Array.from({length: 3}, () => Math.floor(Math.random() * 40));
    const randomUrl = `https://rickandmortyapi.com/api/character/${randomNumArray}`
    var apiLink = apiLink.concat(randomUrl);
    console.log(apiLink);
    
}

RandomUrlConstructor(apiLink);