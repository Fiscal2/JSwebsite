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
        const modalTemplate = document.createElement("template");
        const modalBodyElements = episodeBuilder(allEpisodesBySeason[season]);
        modalTemplate.innerHTML =
            `<div class="modal fade" id="episodeModal${season}" tabindex="-1" aria-labelledby="locationModal" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header bg-success">
                            <h4 class="modal-title text-white" style="text-shadow: 2px 2px 3px #000000;">Season ${season}</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ${modalBodyElements.innerHTML}
                        </div>
                    </div>
                </div>
            </div>`.trim()

        modalDiv.appendChild(modalTemplate.content);
    }
}

function episodeBuilder(allEpisodes) {
    const modalBodyElementContainer = document.createElement('div');

    for (const episode of allEpisodes) {
        const episodeTemplate = document.createElement("template");
        episodeTemplate.innerHTML =
            `
            <h5>${episode.name}</h5>
            <p>Episode: ${episode.id}, Air Date: ${episode.air_date}</p>
            `
        modalBodyElementContainer.append(episodeTemplate.content)
    }
    return modalBodyElementContainer;
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
        const seasonCardTemplate = document.createElement("template");
        seasonCardTemplate.innerHTML =
            `
            <div class="col-md-4">
                <div class="card bg-transparent border-0 text-center" style="width: 16rem;">
                    <img class="img-thumbnail rounded mb-1 mx-auto d-block" src=${value} style="width: 250px; height: 350px;"/>
                    <div class="card-body">
                        <button class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#episodeModal${key}">Episodes</button>
                    </div>
                </div>
            </div>
            `
        seasonContainerRow.appendChild(seasonCardTemplate.content);
        seasonContainer.appendChild(seasonContainerRow);
    }
}


seasonThumbnailBuilder();
episodeModalBuilder();