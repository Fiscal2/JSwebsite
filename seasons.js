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
        modalHeaderDiv.classList.add("modal-header");

        const modalTitleH5 = document.createElement('h5');
        modalTitleH5.classList.add("modal-title");
        modalTitleH5.innerHTML = `Season ${season}`

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

        modalHeaderDiv.append(modalTitleH5, modalCloseButton);
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

EpisodeModalConstructor();