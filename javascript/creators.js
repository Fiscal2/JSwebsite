"use strict";

function CreatorCardInfo() {

    const justinImg = "https://static.wikia.nocookie.net/gravityfalls/images/2/2f/Justin_Roiland.jpg/revision/latest?cb=20200204214613";
    const danImg = "https://m.media-amazon.com/images/M/MV5BMjEzMDY2NzI3MF5BMl5BanBnXkFtZTcwODY5MjI3NA@@._V1_.jpg";

    const cardRow = document.getElementById("creatorCard");

    const cardBlockquote = document.createElement('blockquote');
    cardBlockquote.classList.add("blockquote");

    const cardBlockquoteParagraph = document.createElement('p');
    cardBlockquoteParagraph.classList.add("text-start");
    cardBlockquoteParagraph.setAttribute("style", "text-indent: 2em;");
    cardBlockquoteParagraph.innerHTML =
        `
        Rick and Morty is an American adult animated science fiction sitcom created by Justin
        Roiland and Dan Harmon for Cartoon Network's nighttime programming block Adult Swim.
        The series follows the misadventures of cynical mad scientist Rick Sanchez
        and his good-hearted, but fretful grandson Morty Smith,
        who split their time between domestic life and interdimensional adventures.
        `

    const cardBlockquoteCaption = document.createElement("figcaption");
    cardBlockquoteCaption.classList.add("blockquote-footer");

    const blockquoteCitation = document.createElement("cite");
    blockquoteCitation.setAttribute("title", "Source");

    const blockquoteCitationLink = document.createElement("a");
    blockquoteCitationLink.setAttribute("href", "https://en.wikipedia.org/wiki/Rick_and_Morty")
    blockquoteCitationLink.setAttribute("target", "_blank")
    blockquoteCitationLink.innerHTML = "Wikipedia";

    const cardInnerRow = document.createElement('div');
    cardInnerRow.classList.add("row", "justify-content-center", "mb-2");

    const cardInnerColDan = ImageAndColumnMaker3000("Dan Harmon", danImg);
    const cardInnerColJustin = ImageAndColumnMaker3000("Justin Roiland", justinImg);

    cardInnerRow.append(cardInnerColJustin, cardInnerColDan);
    cardBlockquote.appendChild(cardBlockquoteParagraph);
    blockquoteCitation.appendChild(blockquoteCitationLink);
    cardBlockquoteCaption.appendChild(blockquoteCitation);

    const card = GenericCardCreator("The Creators", [cardInnerRow, cardBlockquote, cardBlockquoteCaption]);

    cardRow.appendChild(card);

}


function TableConstructor() {

    const tableRatingInfo = [
        { "Season": 1, "Rotten Tomatoes": "96%", "Metacritic": "85" },
        { "Season": 2, "Rotten Tomatoes": "91%", "Metacritic": "86" },
        { "Season": 3, "Rotten Tomatoes": "96%", "Metacritic": "88" },
        { "Season": 4, "Rotten Tomatoes": "94%", "Metacritic": "84" },
        { "Season": 5, "Rotten Tomatoes": "95%", "Metacritic": "89" }
    ]

    const tableHead = document.createElement("thead");
    const tableHeaderRows = document.createElement("tr");
    const tableHeaderText = Object.keys(tableRatingInfo[1]);

    console.log(tableHeaderText);
    for (const label of tableHeaderText) {
        const mainTableHeaders = document.createElement("th");
        mainTableHeaders.setAttribute("scope", "col");
        mainTableHeaders.innerHTML = label
        tableHeaderRows.appendChild(mainTableHeaders)
    }

    for(const season of tableRatingInfo) {
        const tableBody = document.createElement("div");
        tableBody.setAttribute("scope", "row");
        tableBody.innerHTML = season;
        
        const tableData = document.createElement("div");
        tableData.innerHTML = `
            <th>${season["Season"]}</th>
            <td>${season["Rotten Tomatoes"]}</td>
            <td>${season["Metacritic"]}</td>

        `

        tableBody.appendChild(tableData);
        return tableBody;

        
    }

    const tableRow = document.getElementById("ratingCard");

    const Table = document.createElement("table");
    Table.classList.add("table", "table-success", "table-striped", "table-hover");

    const tableBody = document.createElement("tbody");
    const tableRows = document.createElement("tr");

    const tableHeaders = document.createElement("th");
    tableHeaders.setAttribute("scope", "row");

    const tableData = document.createElement("td");

    tableRows.append(tableHeaders, tableData);
    tableBody.appendChild(tableRows);
    tableHead.append(tableHeaderRows);
    Table.append(tableHead, tableBody);
    tableRow.appendChild(Table);

    const card = GenericCardCreator("Ratings", Table);

    tableRow.appendChild(card);
    // you also need to put the table inside a card...
}

TableConstructor();


function AccordionConstructor() {
    // Do the thing again
}


function ImageAndColumnMaker3000(creatorName, imageSource) {

    const imageColumn = document.createElement('div');
    imageColumn.classList.add("col-sm-4");
    const imageElement = document.createElement('img');
    imageElement.classList.add("img-thumbnail");
    const imageText = document.createElement('p');
    imageText.classList.add("card-text");
    imageText.innerHTML = creatorName;

    imageElement.setAttribute("src", imageSource);
    imageElement.setAttribute("style", "width: 200px; height:250px;");
    imageColumn.append(imageElement, imageText)
    return imageColumn;
}

function GenericCardCreator(cardTitleText, cardBodyData) {

    const card = document.createElement("div");
    card.classList.add("card", "bg-light");
    card.setAttribute("style", "width: 40rem;");

    const cardBody = document.createElement('div');
    cardBody.classList.add("card-body", "text-center");

    const cardTitle = document.createElement('h2');
    cardTitle.classList.add("card-title", "text-decoration-underline");
    cardTitle.innerHTML = cardTitleText;

    cardBody.appendChild(cardTitle);

    if (Array.isArray(cardBodyData)) {
        for (const bodyElement of cardBodyData) {
            cardBody.append(bodyElement);
        }
    } else {
        cardBody.appendChild(cardBodyData);
    }

    card.appendChild(cardBody);
    return card;
}

CreatorCardInfo();
