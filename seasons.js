async function FetchRickAndMortyData(url) {
    const responseData = await fetch(url);

    if (responseData.ok) {
        return await responseData.json();
    } else {
        return alert(`HTTP-Error: ${responseData.status}`);
    }
}

async function EpisodeModalConstructor() {
    const episodeBaseUrl = "https://rickandmortyapi.com/api/episode"
    const numberOfSeasons = [1, 2, 3, 4, 5]
    const modalDiv = document.getElementById("modalDiv");

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

        const modalBodyRowDiv = document.createElement('div');
        modalBodyRowDiv.classList.add("row");

        modalBodyDiv.append(modalBodyRowDiv);
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
        const nextPageUrl = `https://rickandmortyapi.com/api/episode?page=${i}`
        const episodesOnEachPage = await FetchRickAndMortyData(nextPageUrl);
        completeEpisodeList.push(episodesOnEachPage.results)
    }

    const flatCompleteEpisodeList = completeEpisodeList.flat(1);;
    return flatCompleteEpisodeList;
}

async function SeasonsConstructor() {
    allEpisodes = await FetchAllEpisodes();
    return groupBySeason(allEpisodes, 'episode')
}

function groupBySeason(episodeList, property) {
    return episodeList.reduce(function (seasonObj, episodeObj) {
        const season = episodeObj[property].substring(2, 3);

        if (!seasonObj[season]) {
            seasonObj[season] = [];
        }

        seasonObj[season].push(episodeObj);
        return seasonObj;
    }, {});
}

console.log(SeasonsConstructor());
EpisodeModalConstructor();