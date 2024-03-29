'use strict';
import { fetchRickAndMortyData, paginatedFetchEndpoint } from "./utilities/fetch.js";

// global current page variable
let currentPage = 0;

// Randomly picks 3 characters for the carousel to use
function randomUrlConstructor(length) {
    const randomNumArray = Array.from({ length: length }, () => Math.floor(Math.random() * 826) + 1);
    return `https://rickandmortyapi.com/api/character/${randomNumArray}`;
}

// Function that builds the Carousel 
async function dynamicCarouselConstructor() {
    const randomizedCharacterUrls = randomUrlConstructor(3);
    const randomCharacters = await fetchRickAndMortyData(randomizedCharacterUrls);
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
        carouselContainer.classList.add("container");
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
window.characterBuilder = async (pageNumber = 0) => {
    const collectionOfCharacters = await paginatedFetchEndpoint({ endpoint: "character", pageCount: 42, grouped: true, groupSize: 59 });
    const cardRow = document.getElementById('cardrow');
    cardRow.replaceChildren();

    for (const character of collectionOfCharacters[pageNumber]) {
        const card = characterCardBuilder(character);
        cardRow.appendChild(card);
    }

    const loadingSpinner = document.getElementById("loadingSpinner");
    loadingSpinner.classList.add("d-none");

    currentPage = pageNumber;
    paginatonButtonDisabler();
    pageButtonGroupSwapper();
}

// Constructs the cards for the characters giving all styles etc 
function characterCardBuilder(characterInfo) {
    const card = document.createElement('template');
    card.innerHTML =
        `<div class="card bg-info bg-opacity-75 text-black mb-3 shadow ms-3 p-1" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img class="img-thumbnail rounded-start" src="${characterInfo.image}"/>
                </div>
                <div class="col-md-8">
                    <div class="card-body p-1 ms-1">
                    <h5 class="card-title text-white" style="text-shadow: 2px 2px 2px #000000;">${characterInfo.name}</h5>
                    <p class="card-text mb-1"><b>Status:</b> ${characterInfo.status}</p> 
                    <p class="card-text mb-1"><b>Species:</b> ${characterInfo.species}</p>
                    <p class="card-text mb-1"><b>Gender:</b> ${characterInfo.gender}</p>
                    <p class="card-text mb-1"><b>Origin:</b> ${characterInfo.origin['name'] || "unknown"}</p>
                    </div>
                </div>
            </div>
        </div>`.trim()

    return card.content;
}

// Next & Previous buttons in pagination use this to cycle character cards
window.pageChanger = (operation) => {
    if (currentPage > 0 || currentPage < 13) {
        characterBuilder((currentPage + operation));
        pageButtonGroupSwapper();
    }
}

// Depending on current page, Next/Previous button will disable
function paginatonButtonDisabler() {
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
function paginationButtonGroupBuilder(buttonGroup = 0) {
    const groupedButtonList = paginationListBuilder();
    const paginationList = document.getElementById("paginationList");
    const paginationListArray = Array.from(paginationList.children);

    if (paginationList.childElementCount > 2) {
        paginationListArray.splice(1, 7, ...groupedButtonList[buttonGroup]);
    } else {
        paginationListArray.splice(1, 0, ...groupedButtonList[buttonGroup]);
    }

    paginationList.replaceChildren();
    paginationList.append(...paginationListArray);
}

// Changes button group from 1-7 to 8-14 and reverse
function pageButtonGroupSwapper() {
    if (currentPage > 0 && currentPage === 7) {
        paginationButtonGroupBuilder(1);
    }

    if (currentPage === 6) {
        paginationButtonGroupBuilder(0);
    }
}

// Creates 14 buttons for pagination button group
function paginationListBuilder() {
    const paginationListContainer = document.createElement("div");

    for (let i = 1; i <= 14; i++) {
        const pageButton = document.createElement("template");
        pageButton.innerHTML =
            `<li class="page-item">
                <a class="page-link" onclick="characterBuilder(${i - 1})">${i}</a>
            </li>`.trim();
        paginationListContainer.appendChild(pageButton.content);
    }

    return paginationCollectionBuilder(paginationListContainer.children);
}

// Puts the 14 buttons into 2 arrays of 7 buttons
function paginationCollectionBuilder(paginationListChildren) {
    const groupedPaginationButtons = [];
    const paginationListArray = Array.from(paginationListChildren);

    for (let i = 0; i < paginationListChildren.length; i += 7) {
        groupedPaginationButtons.push(paginationListArray.slice(i, i + 7));
    }

    return groupedPaginationButtons;
}

// Function for search box, does minor sanitization of input, hides/shows cards depending on input
window.cardSearchFilter = () => {
    const searchInput = document.getElementById("navsearch").value.toLowerCase().trim();
    const rowOfCards = document.getElementById("cardrow").children;

    for (const card of rowOfCards) {
        const cardHeaderText = card.querySelector("h5").innerHTML.toLowerCase();

        if (!cardHeaderText.trim().includes(searchInput) && !!searchInput) {
            card.classList.add("d-none");
        } else {
            card.classList.remove("d-none");
        }
    }
}


paginationButtonGroupBuilder();
dynamicCarouselConstructor();
characterBuilder();