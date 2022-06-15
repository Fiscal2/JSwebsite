"use strict";

async function FetchRickAndMortyData(url) {
    const responseData = await fetch(url);

    if (responseData.ok) {
        return await responseData.json();
    } else {
        return alert(`HTTP-Error: ${responseData.status}`);
    }
}

async function FetchAllLocations() {
    const completeLocationList = [];
    let locationBaseUrl = "https://rickandmortyapi.com/api/location/";
    const numOfPages = 7;

    for (let i = 1; i <= numOfPages; i++) {
        const locationsOnEachPage = await FetchRickAndMortyData(locationBaseUrl);
        completeLocationList.push(locationsOnEachPage.results);
        locationBaseUrl = locationsOnEachPage.info.next;
    }

    return completeLocationList.flat(1);
}


async function LocationCollectionConstructor() {
    const allLocations = await FetchAllLocations();

    const groupedLocations = [];
    for (let i = 0; i < allLocations.length; i += 21) {
        groupedLocations.push(allLocations.slice(i, i + 21));
    }
    return groupedLocations;
}


async function PaginationCardBuilder(pageNumber = 0) {
    const groupedLocationData = await LocationCollectionConstructor();
    const cardRow = document.getElementById("cardrow");
    cardRow.replaceChildren();

    for (const location of groupedLocationData[pageNumber]) {
        const cardColumns = CardConstructor(location);
        cardRow.appendChild(cardColumns);
    }
}

async function ModalBuilder() {
    const locationData = await FetchAllLocations();
    const modalDiv = document.getElementById("modalDiv");

    for (const location of locationData) {
        const characterInfo = await ResidentsToCharacterObjects(location);
        const completedModal = ModalConstructor(location.id, characterInfo, location.name);
        modalDiv.appendChild(completedModal);
    }

    const loadingSpinner = document.getElementById("loadingSpinner");
    loadingSpinner.classList.add("d-none");
}

function CardConstructor(locationInfo) {
    const cardColumn = document.createElement("div");
    cardColumn.classList.add("col-sm-4");
    const card = document.createElement("div");
    card.classList.add("card", "my-2", "bg-transparent", "text-white");

    card.innerHTML =
        `
        <h5 class="card-header bg-success" style="text-shadow: 2px 2px 2px #000000;">${locationInfo.name}</h5>
        <div class="card-body bg-success bg-opacity-75">
            <h5 class="card-title">${locationInfo.dimension}</h5>
            <h6 class="card-subtitle mb-2">Type: ${locationInfo.type}</h6>
            <p class="card-text">Number of residents: ${locationInfo.residents.length}</p>
            <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#locationModal${locationInfo.id}">
            Residents
            </button>
        </div>
    `
    cardColumn.appendChild(card);
    return cardColumn
}


function ModalConstructor(locationId, characterDetails, modalTitle) {
    const modalContainerDiv = document.createElement('div');
    modalContainerDiv.classList.add("modal", "fade")
    const modalContainer = setElementAttributes(modalContainerDiv,
        {
            "id": `locationModal${locationId}`,
            "data-bs-keyboard": "false",
            "tabindex": "-1",
            "aria-labelledby": "locationModal",
            "aria-hidden": "true"
        });
    const modalDialogDiv = document.createElement('div');
    modalDialogDiv.classList.add("modal-dialog", "modal-dialog-centered", "modal-dialog-scrollable");

    const modalContentDiv = document.createElement('div');
    modalContentDiv.classList.add("modal-content");

    const modalHeaderDiv = document.createElement('div');
    modalHeaderDiv.classList.add("modal-header");

    const modalTitleH5 = document.createElement('h5');
    modalTitleH5.classList.add("modal-title");
    modalTitleH5.innerHTML = modalTitle;

    const modalCloseButtonElement = document.createElement('button');
    modalCloseButtonElement.classList.add("btn-close");
    const modalCloseButton = setElementAttributes(modalCloseButtonElement,
        {
            "type": "button",
            "data-bs-dismiss": "modal",
            "aria-label": "close"
        });

    const modalBodyDiv = document.createElement('div');
    modalBodyDiv.classList.add("modal-body");

    const modalBodyRowDiv = document.createElement('div');
    modalBodyRowDiv.classList.add("row");

    if (Array.isArray(characterDetails)) {
        for (const character of characterDetails) {
            const infoColumn = ModalBodyElementsConstructor(character);
            modalBodyRowDiv.append(infoColumn);
        }
    } else if (typeof characterDetails == "string") {
        modalBodyDiv.append(characterDetails);
    } else {
        const infoColumn = ModalBodyElementsConstructor(characterDetails);
        modalBodyRowDiv.classList.add("justify-content-center");
        modalBodyRowDiv.append(infoColumn);
    }

    modalBodyDiv.append(modalBodyRowDiv);
    modalHeaderDiv.append(modalTitleH5, modalCloseButton);
    modalContentDiv.append(modalHeaderDiv, modalBodyDiv);
    modalDialogDiv.appendChild(modalContentDiv);
    modalContainer.appendChild(modalDialogDiv);
    return modalContainer;
}


function ModalBodyElementsConstructor(character) {
    if (character) {
        const characterInfoColumn = document.createElement('div');
        characterInfoColumn.classList.add("col-md-4")

        const characterInfoText = document.createElement('p');
        characterInfoText.classList.add("text-center")
        characterInfoText.innerHTML = character.name;

        const characterInfoImage = document.createElement('img');
        characterInfoImage.setAttribute('src', character.image);
        characterInfoImage.setAttribute('loading', 'lazy');
        characterInfoImage.classList.add("img-thumbnail", "mx-auto", "d-block");

        characterInfoColumn.append(characterInfoImage, characterInfoText)
        return characterInfoColumn;
    }
}


async function ResidentsToCharacterObjects(locationInfo) {
    const characterArray = [];

    if (locationInfo.residents.length > 0) {
        for (const resident of locationInfo.residents) {
            const characterUrl = new URL(resident);
            characterArray.push(characterUrl.pathname.match('[0-9]+$'));
        }
    } else {
        return "This location has no residents";
    }

    return await FetchRickAndMortyData(`https://rickandmortyapi.com/api/character/${characterArray.flat(1)}`);
}


function setElementAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    return element;
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

PaginationCardBuilder();
ModalBuilder();
