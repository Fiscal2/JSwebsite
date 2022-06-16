'use strict';

let currentPage = 0

async function FetchRickAndMortyData(url) {
    const responseData = await fetch(url);

    if (responseData.ok) {
        return await responseData.json();
    } else {
        return alert(`HTTP-Error: ${responseData.status}`);
    }
}


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


function RandomUrlConstructor(length) {
    const randomNumArray = Array.from({ length: length }, () => Math.floor(Math.random() * 826) + 1);
    return `https://rickandmortyapi.com/api/character/${randomNumArray}`
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


async function CharacterBuilder(pageNumber = 0) {

    const data = await CharacterCollectionConstructor();
    const cardRow = document.getElementById('cardrow');
    cardRow.replaceChildren();

    for (const character of data[pageNumber]) {

        const card = CharacterCardConstructor(character);
        cardRow.appendChild(card);
    }
    currentPage = pageNumber;

    //Paginator5000();
}


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

async function CharacterCollectionConstructor() {
    const rickAndMortyUrl = "https://rickandmortyapi.com/api/character/"
    const allCharacters = await FetchAllCharacters(rickAndMortyUrl);

    const groupedCharacters = [];
    for (let i = 0; i < allCharacters.length; i += 59) {
        groupedCharacters.push(allCharacters.slice(i, i + 59));
    }
    return groupedCharacters;
}


function pageChanger(operation) {
    if (currentPage > 0 || currentPage < 59) {
        CharacterBuilder((currentPage + operation));
    }
}


function Paginator5000() {
    const previousButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    if (currentPage === 0) {
        previousButton.classList.add("d-none");
    } else {
        previousButton.classList.remove("d-none");
    }

    if (currentPage === 59) {
        nextButton.classList.add("d-none");
    } else {
        nextButton.classList.remove("d-none");
    }
}
function PaginationButtonGroupBuilder(buttonGroup = 0) {
    const paginationList = document.getElementById("paginationList");
    const groupedButtonList = PaginationListConstructor();
    for (const buttonList of groupedButtonList[buttonGroup]) {
        paginationList.append(buttonList)
    }
}

function PaginationListConstructor() {
    const paginationListContainer = document.createElement("div");

    const previousButton = document.createElement("li");
    previousButton.classList.add("page-item");
    previousButton.setAttribute("id", "prev")

    const previousButtonAnchor = document.createElement("a");
    previousButtonAnchor.classList.add("page-link");
    previousButtonAnchor.setAttribute("onclick", "pageChanger(-1)")
    previousButtonAnchor.innerHTML = "Previous"

    previousButton.appendChild(previousButtonAnchor);
    paginationListContainer.appendChild(previousButton);

    for (let i = 1; i <= 59; i++) {
        const pageButton = document.createElement("li");
        pageButton.classList.add("page-item");

        const pageButtonAnchor = document.createElement("a");
        pageButtonAnchor.classList.add("page-link");
        pageButtonAnchor.setAttribute("onclick", `CharacterBuilder(${i - 1})`)
        pageButtonAnchor.innerHTML = `${i}`

        pageButton.appendChild(pageButtonAnchor);
        paginationListContainer.appendChild(pageButton);
    }

    const nextButton = document.createElement("li");
    nextButton.classList.add("page-item");
    nextButton.setAttribute("id", "next")

    const nextButtonAnchor = document.createElement("a");
    nextButtonAnchor.classList.add("page-link");
    nextButtonAnchor.setAttribute("onclick", "pageChanger(1)")
    nextButtonAnchor.innerHTML = "Next"

    nextButton.appendChild(nextButtonAnchor);
    paginationListContainer.appendChild(nextButton);

    return PaginationCollectionConstructor(paginationListContainer.children);
}


function PaginationCollectionConstructor(paginationListChildren) {
    const groupedPaginationButtons = [];
    const paginationListArray = Array.from(paginationListChildren);
    for (let i = 0; i < paginationListChildren.length; i += 5) {
        groupedPaginationButtons.push(paginationListArray.slice(i, i + 5));
    }

    return groupedPaginationButtons;
}



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