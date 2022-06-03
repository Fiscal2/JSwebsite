async function FetchRickAndMortyData(url) {
    const responseData = await fetch(url);

    if (responseData.ok) {
        return await responseData.json();
    } else {
        return alert(`HTTP-Error: ${responseData.status}`);
    }
}

async function LocationCardConstructor() {
    const locationBaseUrl = "https://rickandmortyapi.com/api/location/";
    const locationData = await FetchRickAndMortyData(locationBaseUrl);

    const cardRow = document.getElementById("cardrow");
    const modalDiv = document.getElementById("modalDiv");

    for (let location of locationData.results) {
        const columnSmall = document.createElement("div");
        columnSmall.classList.add("col-sm-4");
        const card = document.createElement("div");
        card.classList.add("card", "my-2", "bg-transparent", "text-white");

        card.innerHTML =
            `
            <h5 class="card-header bg-success">${location.name}</h5>
            <div class="card-body bg-success bg-opacity-75">
                <h5 class="card-title">${location.dimension}</h5>
                <h6 class="card-subtitle mb-2">Type: ${location.type}</h6>
                <p class="card-text">Number of residents: ${location.residents.length}</p>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#locationModal${location.id}">
                Residents
                </button>
            </div>
        `

        const modalContainerDiv = document.createElement('div');
        modalContainerDiv.classList.add("modal", "fade")
        const modalContainer = setElementAttributes(modalContainerDiv,
            {
                "id": `locationModal${location.id}`,
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
        modalTitleH5.innerHTML = location.name;

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

        const characterInfo = await ResidentsToCharacterObjects(locationBaseUrl, (location.id - 1));

        if (Array.isArray(characterInfo)) {
            for (character of characterInfo) {
                const info = ModalBodyElementsConstructor(character)
                modalBodyDiv.append(info.characterInfoImage, info.characterInfoText);
            }
        } else if (typeof characterInfo == "string") {
            characterInfoText = document.createElement('p');
            characterInfoText.classList.add("text-center");
            characterInfoText.innerHTML = characterInfo;
            modalBodyDiv.append(characterInfoText);
        } else {
            const info = ModalBodyElementsConstructor(characterInfo)
            modalBodyDiv.append(info.characterInfoImage, info.characterInfoText);
        }

        modalHeaderDiv.append(modalTitleH5, modalCloseButton);
        modalContentDiv.append(modalHeaderDiv, modalBodyDiv);
        modalDialogDiv.appendChild(modalContentDiv);
        modalContainer.appendChild(modalDialogDiv);
        modalDiv.appendChild(modalContainer);

        columnSmall.appendChild(card);
        cardRow.appendChild(columnSmall);
    }
}

async function ResidentsToCharacterObjects(locationUrl, id) {
    const locationData = await FetchRickAndMortyData(locationUrl);
    const characterArray = [];

    if (locationData.results[id].residents.length > 0) {
        for (let resident of locationData.results[id].residents) {
            const characterUrl = new URL(resident);
            characterArray.push(characterUrl.pathname.match('[0-9]+$'));
        }
    } else {
        return "This location has no residents";
    }

    const flatCharacterArray = characterArray.flat(1);
    const characterObjects = await FetchRickAndMortyData(`https://rickandmortyapi.com/api/character/${flatCharacterArray}`);
    return characterObjects;
}

function setElementAttributes(element, attributes) {
    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    return element;
}

function ModalBodyElementsConstructor(character) {
    if (character) {
        const characterInfoText = document.createElement('p');
        characterInfoText.classList.add("text-center")
        const characterInfoImage = document.createElement('img');
        characterInfoImage.setAttribute('src', character.image);
        characterInfoImage.classList.add("img-thumbnail", "mx-auto", "d-block");
        characterInfoText.innerHTML = character.name;
        return { characterInfoImage, characterInfoText };
    }
}

LocationCardConstructor();

ResidentsToCharacterObjects("https://rickandmortyapi.com/api/location/", 4);