

function CreatorCardConstructor() {
    const justinImg = "https://static.wikia.nocookie.net/gravityfalls/images/2/2f/Justin_Roiland.jpg/revision/latest?cb=20200204214613";
    const danImg = "https://m.media-amazon.com/images/M/MV5BMjEzMDY2NzI3MF5BMl5BanBnXkFtZTcwODY5MjI3NA@@._V1_.jpg";

    const cardRow = document.getElementById("creatorCards");

    const card = document.createElement('div');
    card.classList.add("card", "bg-light");
    card.setAttribute("style", "width: 40rem;");

    const cardBody = document.createElement('div');
    cardBody.classList.add("card-body", "text-center");

    const cardBlockquote = document.createElement('blockquote');
    cardBlockquote.classList.add("blockquote");

    const cardBlockquoteParagraph = document.createElement('p');
    cardBlockquoteParagraph.classList.add("text-start");
    cardBlockquoteParagraph.setAttribute("style", "text-indent: 2em;");
    cardBlockquoteParagraph.innerHTML =
        `Rick and Morty is an American adult animated science fiction sitcom created by Justin
    Roiland and Dan Harmon for Cartoon Network's nighttime programming block Adult Swim.
    The series follows the misadventures of cynical mad scientist Rick Sanchez
    and his good-hearted, but fretful grandson Morty Smith,
    who split their time between domestic life and interdimensional adventures.`

    const cardBlockquoteCaption = document.createElement("figcaption");
    cardBlockquoteCaption.classList.add("blockquote-footer");

    const blockquoteCitation = document.createElement("cite");
    blockquoteCitation.setAttribute("title", "Source");

    const blockquoteCitationLink = document.createElement("a");
    blockquoteCitationLink.setAttribute("href", "https://en.wikipedia.org/wiki/Rick_and_Morty")
    blockquoteCitationLink.setAttribute("target", "_blank")
    blockquoteCitationLink.innerHTML = "Wikipedia";

    const cardTitle = document.createElement('h2');
    cardTitle.classList.add("card-title", "text-decoration-underline");
    cardTitle.innerHTML = "The Creators";

    const cardInnerRow = document.createElement('div');
    cardInnerRow.classList.add("row", "justify-content-center", "mb-2");

    const cardInnerColDan = imageAndColumnMaker3000("Dan Harmon", danImg);
    const cardInnerColJustin = imageAndColumnMaker3000("Justin Roiland", justinImg);

    cardInnerRow.append(cardInnerColJustin, cardInnerColDan);
    cardBlockquote.appendChild(cardBlockquoteParagraph);
    blockquoteCitation.appendChild(blockquoteCitationLink);
    cardBlockquoteCaption.appendChild(blockquoteCitation);
    cardBody.append(cardTitle, cardInnerRow, cardBlockquote, cardBlockquoteCaption);
    card.appendChild(cardBody);
    cardRow.appendChild(card);

}

function imageAndColumnMaker3000(creatorName, imageSource) {
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

function GenericCardCreator(cardBodyData) {

    const card = document.createElement("div");
    card.classList.add("card", "bg-light");
    card.setAttribute("style", "width: 40rem;");

    const cardBody = document.createElement('div');
    cardBody.classList.add("card-body", "text-center");

    const cardTitle = document.createElement('h2');
    cardTitle.classList.add("card-title", "text-decoration-underline");

    cardBody.appendChild(cardTitle, cardBodyData);
    card.appendChild(cardBody);
    return card
}

CreatorCardConstructor();
