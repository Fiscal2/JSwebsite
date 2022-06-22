"use strict";

import { fetchRickAndMortyData, paginatedFetchEndpoint } from "./utilities/fetch.js";

// cycles cards depending on page number
window.paginationCardBuilder = async (pageNumber = 0) => {
    const groupedLocationData = await paginatedFetchEndpoint({ endpoint: "location", pageCount: 7, grouped: true, groupSize: 21 });
    const cardRow = document.getElementById("cardrow");
    cardRow.replaceChildren();

    for (const location of groupedLocationData[pageNumber]) {
        const cardColumns = cardTemplateBuilder(location);
        cardRow.appendChild(cardColumns);
    }

    const loadingSpinner = document.getElementById("loadingSpinner");
    loadingSpinner.classList.add("d-none");
}

// makes the cards for the locations in as few lines as possible
function cardTemplateBuilder(locationInfo) {
    const card = document.createElement('template');
    card.innerHTML =
        `
        <div class="col-sm-4">
            <div class="card my-2 bg-transparent text-white">
                <h5 class="card-header bg-success" style="text-shadow: 2px 2px 2px #000000;">${locationInfo.name}</h5>
                <div class="card-body bg-success bg-opacity-75">
                    <h5 class="card-title">${locationInfo.dimension || "Unknown Dimension"}</h5>
                    <h6 class="card-subtitle mb-2">Type: ${locationInfo.type}</h6>
                    <p class="card-text">Number of residents: ${locationInfo.residents.length}</p>
                    <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#locationModal${locationInfo.id}">
                    Residents
                    </button>
                </div>
            </div>
        </div>
    `.trim()

    return card.content;
}


function placeHolderBuilder() {
    const placeholder = document.createElement("template");
    placeholder.innerHTML =
        `
        <div class="row">
        <div class="col-sm-4">
            <div class="card my-2 bg-transparent text-white " aria-hidden="true">
                <h5 class="card-header bg-success"><span class="placeholder col-6"></span></h5>
                <div class="card-body bg-success bg-opacity-75">
                    <p class="card-text placeholder-glow">
                        <span class="placeholder col-4"></span>
                        <span class="placeholder col-4"></span>
                        <span class="placeholder col-6"></span>
                        <span class="placeholder col-8"></span>
                    </p>
                    <button tabindex="-1" class="btn btn-dark disabled placeholder col-6 w-25"></button>
                </div>
            </div>
        </div>
        `.trim()

    return placeholder.content;
}
// builds the finished modals for each location 
// also lets loading wheel spin while the for loop is going then hides it
async function modalBuilder() {
    const locationData = await paginatedFetchEndpoint({ endpoint: "location", pageCount: 7 });
    const modalDiv = document.getElementById("modalDiv");

    for (const location of locationData) {
        const characterInfo = await residentsToCharacterObjects(location.residents);
        const completedModal = modalBodyBuilder(location.id, characterInfo, location.name);
        modalDiv.appendChild(completedModal);
    }
}
// takes in a location, character object, and location name and makes the majority of the modal
// on line 130 is logic for 1 character, many characters, or No characters 
function modalBodyBuilder(locationId, characterDetails, modalTitle) {
    const modalContainerDiv = document.createElement('div');
    modalContainerDiv.classList.add("modal", "fade");

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

    const modalBodyInfo = modalBodyElements(characterDetails);

    modalBodyDiv.append(modalBodyInfo);
    modalHeaderDiv.append(modalTitleH5, modalCloseButton);
    modalContentDiv.append(modalHeaderDiv, modalBodyDiv);
    modalDialogDiv.appendChild(modalContentDiv);
    modalContainer.appendChild(modalDialogDiv);
    return modalContainer;
}
// Need to work on this logic...
// takes in character object, array of objects or string and returns the modal body elements
function modalBodyElements(character) {
    if (Object.prototype.toString.call(character) === '[object Object]') {
        character = [character];
    }
    if (typeof character !== "string") {
        const modalBodyRowDiv = document.createElement('div');
        modalBodyRowDiv.classList.add("row");

        for (const characterInfo of character) {
            const characterInfoTemplate = document.createElement("template");
            characterInfoTemplate.innerHTML =
                `<div class="col-md-4">
                    <img src=${characterInfo.image} class="img-thumbnail mx-auto d-block" loading="lazy"/>
                    <p class="text-center">${characterInfo.name}</p>
                </div>`.trim();
            modalBodyRowDiv.append(characterInfoTemplate.content);
        }
        return modalBodyRowDiv;
    } else {
        return character;
    }
}

// gets all character urls from locations and makes 1 query with an array of all the numbers
// parsing the urls to just get the numbers off the ends with .match()
async function residentsToCharacterObjects(locationResidents) {
    const characterArray = [];
    if (locationResidents.length > 0) {
        for (const resident of locationResidents) {
            const characterUrl = new URL(resident);
            characterArray.push(characterUrl.pathname.match('[0-9]+$'));
        }
    } else {
        return "This location has no residents";
    }

    return await fetchRickAndMortyData(`https://rickandmortyapi.com/api/character/${characterArray.flat(1)}`);
}

// automates multiple set attributes for an html element
function setElementAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    return element;
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

paginationCardBuilder();
modalBuilder();
