"use strict";

// Fetches data from api, returns json response
async function fetchRickAndMortyData(url) {
    const responseData = await fetch(url);

    if (responseData.ok) {
        return await responseData.json();
    } else {
        return alert(`HTTP-Error: ${responseData.status}`);
    }
}
// Constructs modals for each season 
async function episodeModalBuilder() {
    const allEpisodesBySeason = await episodesBySeason();
    const modalDiv = document.getElementById("modalDiv");

    const numberOfSeasons = [1, 2, 3, 4, 5]
    for (const season of numberOfSeasons) {
        const modalContainerDiv = document.createElement('div');
        modalContainerDiv.classList.add("modal", "fade")
        const modalContainer = setElementAttributes(modalContainerDiv,
            {
                "id": `episodeModal${season}`,
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
        modalHeaderDiv.classList.add("modal-header", "bg-success");

        const modalTitleH4 = document.createElement('h4');
        modalTitleH4.classList.add("modal-title", "text-white");
        modalTitleH4.setAttribute("style", "text-shadow: 2px 2px 3px #000000;")
        modalTitleH4.innerHTML = `Season ${season}`

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

        const modalBody = episodeBuilder(modalBodyDiv, allEpisodesBySeason[season]);

        modalHeaderDiv.append(modalTitleH4, modalCloseButton);
        modalContentDiv.append(modalHeaderDiv, modalBody);
        modalDialogDiv.appendChild(modalContentDiv);
        modalContainer.appendChild(modalDialogDiv);
        modalDiv.appendChild(modalContainer);

    }
}


function episodeBuilder(modalBody, allEpisodes) {

    for (const episode of allEpisodes) {
        const episodeTitle = document.createElement('h5');
        episodeTitle.innerHTML = episode.name
        const episodeInfo = document.createElement('p');
        episodeInfo.innerHTML = `Episode: ${episode.id}, Air Date: ${episode.air_date}`
        modalBody.append(episodeTitle, episodeInfo)
    }
    return modalBody;
}

// automates multiple set attributes for an html element
function setElementAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    return element;
}

// gets all the episodes from the api 
async function fetchAllEpisodes() {
    const completeEpisodeList = [];
    let episodeBaseUrl = "https://rickandmortyapi.com/api/episode";
    const numberOfPages = 3;

    for (let i = 1; i <= numberOfPages; i++) {
        const episodesOnEachPage = await fetchRickAndMortyData(episodeBaseUrl);
        completeEpisodeList.push(episodesOnEachPage.results);
        episodeBaseUrl = episodesOnEachPage.info.next;
    }

    return completeEpisodeList.flat(1);
}

// takes all episodes and groups them by season 
async function episodesBySeason() {
    const allEpisodes = await fetchAllEpisodes();
    return allEpisodes.reduce(function (seasonObj, episodeObj) {
        const season = episodeObj['episode'].substring(2, 3);

        if (!seasonObj[season]) {
            seasonObj[season] = [];
        }
        // seasonObj[season] = seasonObj[season] ?? [] maybe this would work

        seasonObj[season].push(episodeObj);
        return seasonObj;
    }, {});
}

// crazy function that makes Season card
function seasonThumbnailBuilder() {
    const seasonContainer = document.getElementById("card-container");

    const seasonNumAndImage = {
        1: 'https://upload.wikimedia.org/wikipedia/en/b/b8/Rick_and_Morty_season_1.png',
        2: 'https://upload.wikimedia.org/wikipedia/en/b/b1/Rick_and_Morty_season_2.png',
        3: 'https://upload.wikimedia.org/wikipedia/en/5/52/Rick_and_Morty_season_3.png',
        4: 'https://upload.wikimedia.org/wikipedia/en/1/17/Rick_and_Morty_season_4.jpg',
        5: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Rick_and_Morty_season_5.jpg'
    }

    let tempRow;

    for (const [key, value] of Object.entries(seasonNumAndImage)) {

        if (key % 2 != 0) {
            const seasonContainerRow = document.createElement("div");
            seasonContainerRow.classList.add("row");
            tempRow = seasonContainerRow
        }

        const seasonContainerRow = tempRow

        const seasonContainerCol = document.createElement("div");
        seasonContainerCol.classList.add("col-md-4");

        const seasonContainerCard = document.createElement("div");
        seasonContainerCard.classList.add("card", "bg-transparent", "border-0", "text-center");
        seasonContainerCard.style = "width:16rem"

        const seasonContainerImg = document.createElement("img");
        seasonContainerImg.classList.add("img-thumbnail", "rounded", "mb-1", "mx-auto", "d-block");
        seasonContainerImg.setAttribute("style", "width: 250px; height: 350px");
        seasonContainerImg.setAttribute("src", value);

        const seasonContainerBody = document.createElement("div");
        seasonContainerBody.classList.add("card-body");

        const seasonContainerBtn = document.createElement("button");
        seasonContainerBtn.classList.add("btn", "btn-outline-success");
        seasonContainerBtn.innerHTML = "Episodes";
        seasonContainerBtn.setAttribute("data-bs-toggle", "modal");
        seasonContainerBtn.setAttribute("data-bs-target", `#episodeModal${key}`);

        seasonContainerBody.appendChild(seasonContainerBtn);
        seasonContainerCard.append(seasonContainerImg, seasonContainerBody);
        seasonContainerCol.appendChild(seasonContainerCard);
        seasonContainerRow.appendChild(seasonContainerCol);
        seasonContainer.appendChild(seasonContainerRow);
    }
}


seasonThumbnailBuilder();
episodeModalBuilder();

function numberAdder(numOne, numTwo) {
    return numOne + numTwo;
}