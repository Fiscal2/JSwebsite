'use strict';
// global current page variable
let currentPage = 0

// Fetches data from api, returns json response
async function FetchRickAndMortyData(url) {
    const responseData = await fetch(url);

    if (responseData.ok) {
        return await responseData.json();
    } else {
        return alert(`HTTP-Error: ${responseData.status}`);
    }
}

// Fetches every page of characters(42 pages in all) from the api
async function FetchAllCharacters() {
    const completeCharactersList = [];
    let characterBaseUrl = "https://rickandmortyapi.com/api/character/";
    const numOfPages = 42;

    for (let i = 1; i <= numOfPages; i++) {
        const charactersOnEachPage = await FetchRickAndMortyData(characterBaseUrl);
        completeCharactersList.push(charactersOnEachPage.results);
        characterBaseUrl = charactersOnEachPage.info.next;
    }

    return completeCharactersList.flat(1);
}

// Randomly picks 3 characters for the carousel to use
function RandomUrlConstructor(length) {
    const randomNumArray = Array.from({ length: length }, () => Math.floor(Math.random() * 826) + 1);
    return `https://rickandmortyapi.com/api/character/${randomNumArray}`
}

// Function that builds the Carousel 
async function dynamicCarouselConstructor() {

    const randomizedCharacterUrls = RandomUrlConstructor(3);
    const randomCharacters = await FetchRickAndMortyData(randomizedCharacterUrls);

    const carouselInner = document.getElementById('carouselInner');

    for (const character of randomCharacters) {
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

        if (randomCharacters.indexOf(character) == 0) {
            carouselItem.classList.add("carousel-item", "active");

        } else {
            carouselItem.classList.add("carousel-item");
        }

        carouselItem.append(carouselImage, carouselCaption);
        carouselInner.appendChild(carouselItem);
    }
}

// Builds full page of cards, takes in page number to cycle which group of characters is visible 
async function CharacterBuilder(pageNumber = 0) {

    const collectionOfCharacters = await CharacterCollectionConstructor();
    const cardRow = document.getElementById('cardrow');
    cardRow.replaceChildren();

    for (const character of collectionOfCharacters[pageNumber]) {

        const card = CharacterCardConstructor(character);
        cardRow.appendChild(card);
    }
    currentPage = pageNumber;

    PaginatonButtonDisabler();
    pageButtonGroupSwapper();
}

// Constructs the cards for the characters giving all styles etc 
function CharacterCardConstructor(characterInfo) {
    const card = document.createElement('div');
    card.classList.add("card", "bg-info", "bg-opacity-75", "text-black", "mb-3", "shadow", "ms-3", "p-1");
    card.setAttribute("style", "max-width: 540px;");

    const cardInnerRow = document.createElement('div');
    cardInnerRow.classList.add("row", "g-0");

    const cardImageColumn = document.createElement('div');
    cardImageColumn.classList.add("col-md-4");

    const cardImage = document.createElement('img');
    cardImage.classList.add("img-thumbnail", "rounded-start");
    cardImage.setAttribute("src", characterInfo.image)

    const cardBodyColumn = document.createElement('div');
    cardBodyColumn.classList.add("col-md-8")

    const cardBody = document.createElement('div');
    cardBody.classList.add("card-body", "p-1", "ms-1");
    cardBody.innerHTML =
        `
        <h5 class="card-title text-white" style="text-shadow: 2px 2px 2px #000000;">${characterInfo.name}</h5>
        <p class="card-text mb-1"><b>Status:</b> ${characterInfo.status}</p> 
        <p class="card-text mb-1"><b>Species:</b> ${characterInfo.species}</p>
        <p class="card-text mb-1"><b>Gender:</b> ${characterInfo.gender}</p>
        <p class="card-text mb-1"><b>Origin:</b> ${characterInfo.origin['name'] || "unknown"}</p>
        `

    cardImageColumn.appendChild(cardImage);
    cardBodyColumn.appendChild(cardBody);
    cardInnerRow.append(cardImageColumn, cardBodyColumn);
    card.appendChild(cardInnerRow);
    return card;
}

// Gets all 826 characters and makes 14 arrays of 59 character
async function CharacterCollectionConstructor() {
    const rickAndMortyUrl = "https://rickandmortyapi.com/api/character/"
    const allCharacters = await FetchAllCharacters(rickAndMortyUrl);

    const groupedCharacters = [];
    for (let i = 0; i < allCharacters.length; i += 59) {
        groupedCharacters.push(allCharacters.slice(i, i + 59));
    }
    return groupedCharacters;
}

// Next & Previous buttons in pagination use this to cycle character cards
function pageChanger(operation) {
    if (currentPage > 0 || currentPage < 13) {
        CharacterBuilder((currentPage + operation));
        pageButtonGroupSwapper();
    }
}

// Depending on current page, Next/Previous button will disable
function PaginatonButtonDisabler() {
    const previousButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    if (currentPage === 0) {
        previousButton.classList.add("disabled");
    } else {
        previousButton.classList.remove("disabled");
    }

    if (currentPage === 13) {
        nextButton.classList.add("disabled");
    } else {
        nextButton.classList.remove("disabled");
    }
}

// Initalizes and builds the pagination button group, which changes if its 1-7 or 8-14
function PaginationButtonGroupBuilder(buttonGroup = 0) {
    const groupedButtonList = PaginationListConstructor();
    const paginationList = document.getElementById("paginationList");
    const paginationListArray = Array.from(paginationList.children);

    if (paginationList.childElementCount > 2) {
        paginationListArray.splice(1, 7, ...groupedButtonList[buttonGroup])
    } else {
        paginationListArray.splice(1, 0, ...groupedButtonList[buttonGroup])
    }

    paginationList.replaceChildren();
    paginationList.append(...paginationListArray)
}

// Currently doesn't work correctly but works going Next from 1-7 to 8-14 just not in reverse
function pageButtonGroupSwapper() {
    if (currentPage > 0 && currentPage % 7 === 0) {
        PaginationButtonGroupBuilder(currentPage / 7);
    } else {
        PaginationButtonGroupBuilder(0);
    }
}

// Creates 14 buttons for pagination button group
function PaginationListConstructor() {
    const paginationListContainer = document.createElement("div");

    for (let i = 1; i <= 14; i++) {
        const pageButton = document.createElement("li");
        pageButton.classList.add("page-item");

        const pageButtonAnchor = document.createElement("a");
        pageButtonAnchor.classList.add("page-link");
        pageButtonAnchor.setAttribute("onclick", `CharacterBuilder(${i - 1})`)
        pageButtonAnchor.innerHTML = `${i}`

        pageButton.appendChild(pageButtonAnchor);
        paginationListContainer.appendChild(pageButton);
    }

    return PaginationCollectionConstructor(paginationListContainer.children);
}

// Puts the 14 buttons into 2 arrays of 7 buttons
function PaginationCollectionConstructor(paginationListChildren) {
    const groupedPaginationButtons = [];
    const paginationListArray = Array.from(paginationListChildren);
    for (let i = 0; i < paginationListChildren.length; i += 7) {
        groupedPaginationButtons.push(paginationListArray.slice(i, i + 7));
    }

    return groupedPaginationButtons;
}

// Function for search box, does minor sanitization of input, hides/shows cards depending on input
function CardSearchFilter() {
    const searchInput = document.getElementById("navsearch").value.replace(/[^a-z0-9]/gi, '').toLowerCase().trim();
    const rowOfCards = document.getElementById("cardrow").children;
    console.log(searchInput);
    for (const card of rowOfCards) {
        const cardHeaderText = card.querySelector("h5").innerHTML.toLowerCase().trim();

        if (!cardHeaderText.includes(searchInput) && !!searchInput) {
            card.classList.add("d-none");
        } else {
            card.classList.remove("d-none");
        }
    }
}

PaginationButtonGroupBuilder();
dynamicCarouselConstructor();
CharacterBuilder();