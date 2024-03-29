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
        `<div class="col-sm-4">
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
        </div>`.trim()

    return card.content;
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
    const modalBodyInfo = modalBodyElements(characterDetails);
    const bodyDiv = document.createElement("div");
    bodyDiv.appendChild(modalBodyInfo);
    const modalBodyTemplate = document.createElement("template");
    modalBodyTemplate.innerHTML =
        `<div id="locationModal${locationId}" data-bs-keyboard="false" tabindex="-1" aria-labelledby="locationModal" aria-hidden="true" class="modal fade">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${modalTitle}</h5>
                        <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label=close></button>
                    </div>
                    <div class="modal-body">
                        ${bodyDiv.innerHTML}
                    </div>
                </div>
            </div>
        </div>`.trim()
    return modalBodyTemplate.content;
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
