"use strict";

import { fetchRickAndMortyData } from "./utilities/fetch.js";
import { tableConstructor } from "./utilities/tableBuilder.js";
import { genericCardCreator } from "./utilities/genericBuilders.js";

async function creatorCardInfo() {
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

    const card = genericCardCreator("The Creators", creatorCardTemplate.innerHTML);

    cardRow.appendChild(card);
}


async function viewershipCardBuilder() {
    const viewershipData = await fetchRickAndMortyData('/javascript/viewership.json');
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

        const accordionHeading = document.createElement('div');
        accordionHeading.setAttribute("id", `collapse${key}`);
        accordionHeading.classList.add("accordion-collapse", "collapse");
        accordionHeading.setAttribute("aria-labelledby", `heading${key}`);
        accordionHeading.setAttribute("data-bs-parent", "#accordionParent");

        const accordionBody = document.createElement("div");
        accordionBody.classList.add("accordion-body");
        accordionBody.setAttribute("id", "accordionBodyText")
        accordionBody.innerHTML = "test"

        const accordionBodyTemplate = document.createElement("template");
        accordionBodyTemplate.innerHTMl =
            `
            <div class="accordion-item">
                <h2 class="accordion-header" id="#heading${key}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${key}" aria-expanded="false" aria-controls="collapse${key}">
                    ${value}</button>
                </h2>
                <div id="collapse${key}" class="accordion-collapse collapse" aria-labelledby="heading${key}" data-bs-parent="#accordionParent">
                    <div id="accordionBodyText" class="accordion-body"></div>
                </div>
            </div>
            `.trim()

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
