"use strict";

// Fetches data from api, returns json response
async function FetchRickAndMortyData(url) {
    const responseData = await fetch(url);

    if (responseData.ok) {
        return await responseData.json();
    } else {
        return alert(`HTTP-Error: ${responseData.status}`);
    }
}

async function paginatedFetchEndpoint({ endpoint, pageCount, grouped = false, groupSize = 0 }) {
    const responseArray = [];
    let baseUrl = `https://rickandmortyapi.com/api/${endpoint}/`;

    for (let i = 1; i <= pageCount; i++) {
        const pageData = await FetchRickAndMortyData(baseUrl);
        responseArray.push(pageData.results);
        baseUrl = pageData.info.next;
    }

    if (grouped) {
        return await LocationGroupBuilder(responseArray.flat(1), groupSize)
    }

    return responseArray.flat(1);
}

// constructs 6 arrays of 21 locations 
async function LocationGroupBuilder(allLocations, groupSize) {
    const groupedLocations = [];
    for (let i = 0; i < allLocations.length; i += groupSize) {
        groupedLocations.push(allLocations.slice(i, i + groupSize));
    }
    return groupedLocations;
}

// cycles cards depending on page number
async function PaginationCardBuilder(pageNumber = 0) {
    const groupedLocationData = await paginatedFetchEndpoint({ endpoint: "location", pageCount: 7, grouped: true, groupSize: 21 });
    const cardRow = document.getElementById("cardrow");
    cardRow.replaceChildren();

    for (const location of groupedLocationData[pageNumber]) {
        const cardColumns = CardTemplateConstructor(location);
        cardRow.appendChild(cardColumns);
    }
}

// builds the finished modals for each location 
// also lets loading wheel spin while the for loop is going then hides it
async function ModalBuilder() {
    const locationData = await paginatedFetchEndpoint({ endpoint: "location", pageCount: 7 });
    const modalDiv = document.getElementById("modalDiv");

    for (const location of locationData) {
        const characterInfo = await ResidentsToCharacterObjects(location.residents);
        const completedModal = ModalConstructor(location.id, characterInfo, location.name);
        modalDiv.appendChild(completedModal);
    }

    const loadingSpinner = document.getElementById("loadingSpinner");
    loadingSpinner.classList.add("d-none");
}

// makes the cards for the locations in as few lines as possible
function CardTemplateConstructor(locationInfo) {
    const card = document.createElement('template');
    const templateHTML =
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

    card.innerHTML = templateHTML;
    return card.content;
}

// takes in a location, character object, and location name and makes the majority of the modal
// on line 130 is logic for 1 character, many characters, or No characters 
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

// takes in character object and makes a the modal body elements
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

// gets all character urls from locations and makes 1 query with an array of all the numbers
// parsing the urls to just get the numbers off the ends with .match()
async function ResidentsToCharacterObjects(locationResidents) {
    const characterArray = [];
    if (locationResidents.length > 0) {
        for (const resident of locationResidents) {
            const characterUrl = new URL(resident);
            characterArray.push(characterUrl.pathname.match('[0-9]+$'));
        }
    } else {
        return "This location has no residents";
    }

    return await FetchRickAndMortyData(`https://rickandmortyapi.com/api/character/${characterArray.flat(1)}`);
}

// automates multiple set attributes for an html element
function setElementAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    return element;
}

// Function for search box, does minor sanitization of input, hides/shows cards depending on input
function CardSearchFilter() {
    const searchInput = document.getElementById("navsearch").value.replace(/[^a-z0-9]/gi, '').toLowerCase().trim();
    const rowOfCards = document.getElementById("cardrow").children;

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
