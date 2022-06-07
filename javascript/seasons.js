async function FetchRickAndMortyData(url) {
    const responseData = await fetch(url);

    if (responseData.ok) {
        return await responseData.json();
    } else {
        return alert(`HTTP-Error: ${responseData.status}`);
    }
}

async function EpisodeModalConstructor() {
    const allEpisodesBySeason = await EpisodesBySeason();
    const modalDiv = document.getElementById("modalDiv");

    const numberOfSeasons = [1, 2, 3, 4, 5]
    for (let season of numberOfSeasons) {
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

        for (let episode of allEpisodesBySeason[season]) {
            const episodeTitle = document.createElement('h5');
            episodeTitle.innerHTML = episode.name
            const episodeInfo = document.createElement('p');
            episodeInfo.innerHTML = `Episode: ${episode.id}, Air Date: ${episode.air_date}`
            modalBodyDiv.append(episodeTitle, episodeInfo)
        }

        modalHeaderDiv.append(modalTitleH4, modalCloseButton);
        modalContentDiv.append(modalHeaderDiv, modalBodyDiv);
        modalDialogDiv.appendChild(modalContentDiv);
        modalContainer.appendChild(modalDialogDiv);
        modalDiv.appendChild(modalContainer);
    }
}

function setElementAttributes(element, attributes) {
    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    return element;
}

async function FetchAllEpisodes() {
    const completeEpisodeList = [];
    const episodeBaseUrl = "https://rickandmortyapi.com/api/episode";
    const pagesOfEpisodes = await FetchRickAndMortyData(episodeBaseUrl);
    completeEpisodeList.push(pagesOfEpisodes.results)
    const numberOfPages = pagesOfEpisodes.info.pages;

    for (let i = 2; i <= numberOfPages; i++) {
        const nextPageUrl = `${episodeBaseUrl}?page=${i}`
        const episodesOnEachPage = await FetchRickAndMortyData(nextPageUrl);
        completeEpisodeList.push(episodesOnEachPage.results)
    }

    return completeEpisodeList.flat(1);
}

async function EpisodesBySeason() {
    allEpisodes = await FetchAllEpisodes();
    return allEpisodes.reduce(function (seasonObj, episodeObj) {
        const season = episodeObj['episode'].substring(2, 3);

        if (!seasonObj[season]) {
            seasonObj[season] = [];
        }

        seasonObj[season].push(episodeObj);
        return seasonObj;
    }, {});
}

function seasonThumbnailContructor() {
    const seasonContainer = document.getElementById("season-container");

    const seasonNumAndImage = {
        1: 'https://upload.wikimedia.org/wikipedia/en/b/b8/Rick_and_Morty_season_1.png',
        2: 'https://upload.wikimedia.org/wikipedia/en/b/b1/Rick_and_Morty_season_2.png',
        3: 'https://upload.wikimedia.org/wikipedia/en/5/52/Rick_and_Morty_season_3.png',
        4: 'https://upload.wikimedia.org/wikipedia/en/1/17/Rick_and_Morty_season_4.jpg',
        5: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Rick_and_Morty_season_5.jpg'
    }

    for (const [key, value] of Object.entries(seasonNumAndImage)) {

        console.log(key)
        console.log(value)

        const seasonContainerRow = document.createElement("div");
        seasonContainerRow.classList.add("row");

        const seasonContainerCol = document.createElement("div");
        seasonContainerCol.classList.add("col-sm-4");

        const seasonContainerCard = document.createElement("div");
        seasonContainerCard.classList.add("card", "bg-transparent", "border-0", "text-center");

        const seasonContainerImg = document.createElement("img");
        seasonContainerImg.classList.add("img-thumbnail", "rounded", "mb-1", "mx-auto", "d-block");

        const seasonContainerBody = document.createElement("div");
        seasonContainerBody.classList.add("card-body");

        const seasonContainerBtn = document.createElement("button");
        seasonContainerBtn.classList.add("btn", "btn-outline-success");
        seasonContainerBtn.innerHTML = "Episodes";
        seasonContainerBtn.setAttribute("data-bs-toggle", "modal");
        seasonContainerBtn.setAttribute("data-bs-target", '#episodeModal');

        seasonContainerBody.appendChild(seasonContainerBtn);
        seasonContainerCard.append(seasonContainerImg, seasonContainerBody);
        seasonContainerCol.appendChild(seasonContainerCard);

        if (key == 1 || key == 3 || key == 5) {
            seasonContainerRow.appendChild(seasonContainerCol);
            seasonContainer.appendChild(seasonContainerRow);
        }
    }

}

seasonThumbnailContructor();
EpisodeModalConstructor();