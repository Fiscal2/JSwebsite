"use strict";

import { tableConstructor } from "./utilities/tableBuilder.js";
import { genericCardCreator } from "./genericBuilders.js";


async function fetchLocalFileData(filePath) {
    const responseData = await fetch(filePath);

    if (responseData.ok) {
        return await responseData.json();
    } else {
        return alert(`HTTP-Error: ${responseData.status}`);
    }
}


async function creatorCardInfo() {
    const justinImg = "/assets/JustinPhoto.jpg";
    const danImg = "https://m.media-amazon.com/images/M/MV5BMjEzMDY2NzI3MF5BMl5BanBnXkFtZTcwODY5MjI3NA@@._V1_.jpg";
    const cardRow = document.getElementById("creatorCard");

    const cardImageDan = imageAndColumnBuilder("Dan Harmon", danImg);
    const cardImageJustin = imageAndColumnBuilder("Justin Roiland", justinImg);

    const creatorCardTemplate = document.createElement("template");
    creatorCardTemplate.innerHTML =
        `<div class="row justify-content-center mb-2">
            ${cardImageJustin.innerHTML}
            ${cardImageDan.innerHTML}
        </div>
        <blockquote class="blockquote">
            <p class="text-start" style="text-indent: 2em;">
            Rick and Morty is an American adult animated science fiction sitcom created by Justin
            Roiland and Dan Harmon for Cartoon Network's nighttime programming block Adult Swim.
            The series follows the misadventures of cynical mad scientist Rick Sanchez
            and his good-hearted, but fretful grandson Morty Smith,
            who split their time between domestic life and interdimensional adventures.
            </p>
        </blockquote>
        <figcaption class="blockquote-footer">
            <cite title="Source">
                <a href="https://en.wikipedia.org/wiki/Rick_and_Morty" target="_blank">Wikipedia</a>
            </cite>
        </figcaption>`.trim()

    const card = genericCardCreator("The Creators", creatorCardTemplate.innerHTML);

    cardRow.appendChild(card);
}


function imageAndColumnBuilder(creatorName, imageSource) {
    const creatorImageColumn = document.createElement("template");
    creatorImageColumn.innerHTML =
        `<div class="col-sm-4">
            <img src=${imageSource} class="img-thumbnail" style="width: 200px; height:250px;"/>
            <p class="card-text text-center"><b>${creatorName}</b></p>
        </div>`.trim()
    return creatorImageColumn;
}


async function viewershipCardBuilder() {
    const viewershipData = await fetchLocalFileData('/javascript/viewership.json');
    for (const seasonData of viewershipData["viewership"]) {
        const viewershipCard = document.getElementById("viewershipCard");
        const seasonDiv = document.createElement("div");
        seasonDiv.innerHTML = `<h4 style="text-shadow: 2px 2px 2px #000000;">Season ${seasonData["season"]}</h4>`

        for (const episode of Object.entries(seasonData["episodes"])) {
            const episodeInfo = document.createElement("p");
            episodeInfo.setAttribute("style", "text-indent: 2em;")
            const views = episode[1] * 1000000;
            episodeInfo.innerHTML = `<b>Episode:</b> ${episode[0]}, <b>Views:</b> ${views.toLocaleString('en-US')}`
            seasonDiv.appendChild(episodeInfo);
        }
        viewershipCard.appendChild(seasonDiv);
    }
}


function accordionConstructor() {
    const accordionParent = document.getElementById("accordionParent");
    const accordionInfo =
    {
        1: "Awards",
        2: "Streaming Services",
        3: "Social Media"
    }

    for (const [key, value] of Object.entries(accordionInfo)) {
        const accordionItem = document.createElement('div');
        accordionItem.classList.add('accordion-item');

        const accordionHeader = document.createElement('h2');
        accordionHeader.setAttribute("id", `#heading${key}`);
        accordionHeader.classList.add('accordion-header');

        const accordionButton = document.createElement('button');
        accordionButton.classList.add("accordion-button", "collapsed");
        accordionButton.innerHTML = value
        accordionButton.setAttribute("type", "button");
        accordionButton.setAttribute("data-bs-toggle", "collapse");
        accordionButton.setAttribute("data-bs-target", `#collapse${key}`);
        accordionButton.setAttribute("aria-expanded", "false");
        accordionButton.setAttribute("aria-controls", `collapse${key}`);

        const accordionHeading = document.createElement('div');
        accordionHeading.setAttribute("id", `collapse${key}`);
        accordionHeading.classList.add("accordion-collapse", "collapse");
        accordionHeading.setAttribute("aria-labelledby", `heading${key}`);
        accordionHeading.setAttribute("data-bs-parent", "#accordionParent");

        const accordionBody = document.createElement("div");
        accordionBody.classList.add("accordion-body");
        accordionBody.setAttribute("id", "accordionBodyText")
        accordionBody.innerHTML = "test"

        accordionHeading.appendChild(accordionBody);
        accordionHeader.appendChild(accordionButton);
        accordionItem.append(accordionHeader, accordionHeading);
        accordionParent.appendChild(accordionItem);
    }
}

accordionConstructor();
creatorCardInfo();
viewershipCardBuilder();


const tableHeaders = ["Season", "Rotten Tomatoes", "Metacritic"];
const tableRatingData = [
    { "Season": 1, "Rotten Tomatoes": "96%", "Metacritic": "85" },
    { "Season": 2, "Rotten Tomatoes": "91%", "Metacritic": "86" },
    { "Season": 3, "Rotten Tomatoes": "96%", "Metacritic": "88" },
    { "Season": 4, "Rotten Tomatoes": "94%", "Metacritic": "84" },
    { "Season": 5, "Rotten Tomatoes": "95%", "Metacritic": "89" }
]

tableConstructor(tableHeaders, tableRatingData);
