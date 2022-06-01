'use strict';

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

function dynamicCarousel(randomizedCharacters) {
    fetch(randomizedCharacters)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);

            const carouselInner = document.getElementById('carouselInner');

            // Method 1:
            for (let i = 0; i < data.length; i++) {
                console.log(`Method 1: ${data[i].image}`)
            }
            // Method 2:
            for (let character of data) {
                console.log(`Method 2:${character.image}`)
                carouselImage.setAttribute('src', character.image);
                carouselItem.classList.add("carousel-item")
                carouselItem.className = "d-block mx-auto img-fluid";
                // Hint: 
                // carouselImage.setAttribute('src', character.image);
            }

            // You will use these inside your FOR loop
            // Check the Console to see what they are doing
            // You also will need to add the classes to the div and img
            // Hint: carouselItem.classList.add("carousel-item")
            // The img needs class="d-block mx-auto img-fluid"   
            const carouselImage = document.createElement('img');
            const carouselItem = document.createElement('div');
            carouselImage.setAttribute('src', data[0].image);

            carouselItem.append(carouselImage);

            // You will also need to remove(or comment out) the HTML between line 63-75(this function is replacing all that)
            // Uncomment below line when you are ready to use it.. breaks the current carousel

            carouselInner.append(carouselItem);
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