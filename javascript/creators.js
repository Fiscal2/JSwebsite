"use strict";

import { fetchRickAndMortyData } from "./utilities/fetch.js";
import { tableConstructor } from "./utilities/tableBuilder.js";
import { cardBuilder } from "./utilities/cardBuilder.js";


async function creatorCardBuilder() {
    const justinImg = "/assets/JustinPhoto.jpg";
    const danImg = "/assets/danPhoto.jpg";
    const cardRow = document.getElementById("creatorCard");

    const creatorCardTemplate = document.createElement("template");
    creatorCardTemplate.innerHTML =
        `<div class="row justify-content-center mb-2">
            <div class="col-sm-4">
                <img src=${justinImg} class="img-thumbnail" style="width: 200px; height:250px;"/>
                <p class="card-text text-center"><b>Justin Roiland</b></p>
            </div>
            <div class="col-sm-4">
                <img src=${danImg} class="img-thumbnail" style="width: 200px; height:250px;"/>
                <p class="card-text text-center"><b>Dan Harmon</b></p>
            </div>
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

    const card = cardBuilder("The Creators", creatorCardTemplate.innerHTML);
    cardRow.appendChild(card);
}


async function viewershipCardBuilder() {
    const viewershipData = await fetchRickAndMortyData('/javascript/json/viewership.json');
    const viewershipCard = document.getElementById("viewershipCard");
    const viewershipCardDiv = document.createElement("div");

    for (const seasonData of viewershipData["viewership"]) {
        const seasonDiv = document.createElement("div");
        seasonDiv.innerHTML = `<h4 class="text-start" style="text-shadow: 2px 2px 2px #000000;">Season ${seasonData["season"]}</h4>`

        for (const episode of Object.entries(seasonData["episodes"])) {
            const episodeInfo = document.createElement("p");
            episodeInfo.classList.add("text-start");
            episodeInfo.setAttribute("style", "text-indent: 2em;")
            const views = episode[1] * 1000000;
            episodeInfo.innerHTML = `<b>Episode:</b> ${episode[0]}, <b>Views:</b> ${views.toLocaleString('en-US')}`
            seasonDiv.appendChild(episodeInfo);
        }
        viewershipCardDiv.appendChild(seasonDiv);
    }
    const card = cardBuilder("Viewership", viewershipCardDiv.innerHTML);
    viewershipCard.appendChild(card);
}


async function accordionBuilder() {
    const accordionCard = document.getElementById("accordionCard");
    const accordionParent = document.getElementById("accordionParent");
    const accordionParentDiv = document.createElement("div");
    const accordionInfo = await fetchRickAndMortyData('/javascript/json/accordion.json');

    accordionInfo["accordionItem"].forEach(dict => {
        const accordionBody = accordionBodyBuilder(dict["info"]);
        const accordionItemTemplate = document.createElement("template");
        accordionItemTemplate.innerHTML =
            `<div class="accordion-item">
                    <h2 class="accordion-header" id="#heading${dict["number"]}">
                        <button class="accordion-button collapsed bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${dict["number"]}" aria-expanded="false" aria-controls="collapse${dict["number"]}">
                        ${dict["title"]}</button>
                    </h2>
                    <div id="collapse${dict["number"]}" class="accordion-collapse collapse" aria-labelledby="heading${dict["number"]}" data-bs-parent="#accordionParent">
                        <div id="accordionBodyText" class="accordion-body">${accordionBody.innerHTML}</div>
                    </div>
                </div>`.trim()

        accordionParent.appendChild(accordionItemTemplate.content);
    });
    accordionParentDiv.appendChild(accordionParent);
    const card = cardBuilder("Information", accordionParentDiv.innerHTML);
    accordionCard.appendChild(card);
}


function accordionBodyBuilder(accordionData) {
    if (accordionData) {
        const infoContainer = document.createElement("div");
        const infoRow = document.createElement("div");
        infoRow.classList.add("row", "justify-content-center", "mb-2");
        for (const [key, value] of Object.entries(accordionData)) {
            const infoTemplate = document.createElement("template");
            infoTemplate.innerHTML =
                `<div class="col-sm-4">
                    <a href="${value[1]}"><img src=${value[0]} class="img-thumbnail border-0" style="width: 100px; height:100px;"/></a>
                    <p class="card-text text-center"><b>${key}</b></p>
                 </div>`.trim()

            infoRow.appendChild(infoTemplate.content);
        }
        infoContainer.appendChild(infoRow);
        return infoContainer;
    }
}

accordionBuilder();
creatorCardBuilder();
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
