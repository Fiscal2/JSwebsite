'use strict';

async function FetchRickAndMortyData(url) {
    const responseData = await fetch(url);

    if (responseData.ok) {
        return await responseData.json();
    } else {
        return alert(`HTTP-Error: ${responseData.status}`);
    }
}

function switchTheme() {
    const currentBackground = document.body.classList[0]
    const themeButton = document.getElementById("themebutton")

    if (currentBackground == "otherBackground") {
        themeButton.innerHTML = "Light"
        document.body.classList.replace(currentBackground, "backgroundImage")
        themeButton.classList.replace("btn-dark", "btn-warning")

    } else {
        themeButton.innerHTML = "Dark"
        document.body.classList.replace(currentBackground, "otherBackground")
        themeButton.classList.replace("btn-warning", "btn-dark")
    }
}

async function dynamicCarouselConstructor() {

    const randomizedCharacters = RandomUrlConstructor(3);
    const data = await FetchRickAndMortyData(randomizedCharacters);

    const carouselInner = document.getElementById('carouselInner');

    for (let character of data) {
        const carouselImage = document.createElement('img');
        carouselImage.setAttribute('src', character.image);
        carouselImage.classList.add("d-block", "mx-auto", "img-fluid", "rounded");

        const carouselCaption = document.createElement('div');
        carouselCaption.classList.add("carousel-caption", "d-none", "d-md-block", "justify-content-center");

        const captionTitle = document.createElement('h5');
        captionTitle.classList.add("fw-bold", "text-light", "bg-dark", "bg-opacity-75");
        captionTitle.innerHTML = character.name

        const carouselContainer = document.createElement('div');
        carouselContainer.classList.add("container")
        carouselContainer.appendChild(captionTitle);

        carouselCaption.appendChild(carouselContainer);

        const carouselItem = document.createElement('div');

        if (data.indexOf(character) == 0) {
            carouselItem.classList.add("carousel-item", "active");

        } else {
            carouselItem.classList.add("carousel-item");
        }

        carouselItem.append(carouselImage, carouselCaption);
        carouselInner.appendChild(carouselItem);
    }
}

async function CharacterCardConstructor() {

    const rickAndMortyUrl = "https://rickandmortyapi.com/api/character/?page=2"
    const data = await FetchRickAndMortyData(rickAndMortyUrl)

    for (let character of data.results) {
        const cardRow = document.getElementById('cardrow');
        const card = document.createElement('div');
        card.classList.add("card", "bg-secondary", "text-white", "mb-3", "shadow", "ms-3", "p-1");
        card.setAttribute("style", "max-width: 540px;");

        const cardInnerRow = document.createElement('div');
        cardInnerRow.classList.add("row", "g-0");

        const cardImageColumn = document.createElement('div');
        cardImageColumn.classList.add("col-md-4");

        const cardImage = document.createElement('img');
        cardImage.classList.add("img-thumbnail", "rounded-start");
        cardImage.setAttribute("src", character.image)

        const cardBodyColumn = document.createElement('div');
        cardBodyColumn.classList.add("col-md-8")

        const cardBody = document.createElement('div');
        cardBody.classList.add("card-body", "p-1", "ms-1");

        cardBody.innerHTML =
            `
            <h5 class="card-title">${character.name}</h5>
            <p class="card-text mb-1">Status: ${character.status}</p> 
            <p class="card-text mb-1">Species: ${character.species}</p>
            <p class="card-text mb-1">Gender: ${character.gender}</p>
            <p class="card-text mb-1">Origin: ${character.origin['name']}</p>
            `

        cardImageColumn.appendChild(cardImage);
        cardBodyColumn.appendChild(cardBody);
        cardInnerRow.append(cardImageColumn, cardBodyColumn);
        card.appendChild(cardInnerRow);
        cardRow.appendChild(card);
    }
}


function RandomUrlConstructor(length) {
    const randomNumArray = Array.from({ length: length }, () => Math.floor(Math.random() * 826) + 1);
    return `https://rickandmortyapi.com/api/character/${randomNumArray}`
}

dynamicCarouselConstructor();
CharacterCardConstructor();