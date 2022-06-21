"use strict";

function CreatorCardInfo() {
    const justinImg = "https://static.wikia.nocookie.net/gravityfalls/images/2/2f/Justin_Roiland.jpg/revision/latest?cb=20200204214613";
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

    const card = GenericCardCreator("The Creators", creatorCardTemplate.innerHTML);

    cardRow.appendChild(card);
}


function imageAndColumnBuilder(creatorName, imageSource) {
    const creatorImageColumn = document.createElement("template");
    creatorImageColumn.innerHTML =
        `<div class="col-sm-4">
            <img src=${imageSource} class="img-thumbnail" style="width: 200px; height:250px;"/>
            <p class="card-text text-center">${creatorName}</p>
        </div>`.trim()
    return creatorImageColumn;
}


function TableHeadConstructor() {
    const tableHeaderText = ["Season", "Rotten Tomatoes", "Metacritic"];
    const tableHead = document.createElement("thead");
    const tableHeaderRow = document.createElement("tr");

    for (const label of tableHeaderText) {
        const tableHeaders = document.createElement("th");
        tableHeaders.setAttribute("scope", "col");
        tableHeaders.innerHTML = label
        tableHeaderRow.appendChild(tableHeaders)
    }

    tableHead.append(tableHeaderRow);
    return tableHead;
}


function TableBodyConstructor() {
    const ratingInfo = [
        { "Season": 1, "Rotten Tomatoes": "96%", "Metacritic": "85" },
        { "Season": 2, "Rotten Tomatoes": "91%", "Metacritic": "86" },
        { "Season": 3, "Rotten Tomatoes": "96%", "Metacritic": "88" },
        { "Season": 4, "Rotten Tomatoes": "94%", "Metacritic": "84" },
        { "Season": 5, "Rotten Tomatoes": "95%", "Metacritic": "89" }
    ]

    const tableBody = document.createElement("tbody");

    for (const rating of ratingInfo) {
        const tableDataRow = document.createElement("tr");
        tableDataRow.innerHTML =
            `
            <th scope="row">${rating["Season"]}</th>
            <td>${rating["Rotten Tomatoes"]}</td>
            <td>${rating["Metacritic"]}</td>
            `
        tableBody.appendChild(tableDataRow);
    }

    return tableBody;
}


function TableConstructor() {
    const tableRow = document.getElementById("ratingCard");
    const tableDiv = document.createElement("div");
    const table = document.createElement("table");
    table.classList.add("table", "table-success", "table-striped", "table-hover");

    const tableHead = TableHeadConstructor();
    const tableBody = TableBodyConstructor();

    table.append(tableHead, tableBody);
    tableDiv.appendChild(table)
    const card = GenericCardCreator("Ratings", tableDiv.innerHTML);
    tableRow.appendChild(card);
}


function AccordionConstructor() {
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


function GenericCardCreator(cardTitleText, cardBodyData) {
    const cardTemplate = document.createElement("template");
    cardTemplate.innerHTML =
        `<div class="card bg-light" style="width: 40rem;">
            <div class="card-body text-center">
                <h2 class="card-title">${cardTitleText}</h2>
                ${cardBodyData}
            </div>
        </div>`.trim()
    return cardTemplate.content;
}

AccordionConstructor();
CreatorCardInfo();
TableConstructor();