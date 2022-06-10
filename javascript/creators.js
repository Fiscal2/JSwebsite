

async function CreatorCardConstructor() {
    const justinImg = "https://static.wikia.nocookie.net/gravityfalls/images/2/2f/Justin_Roiland.jpg/revision/latest?cb=20200204214613";
    const danImg = "https://m.media-amazon.com/images/M/MV5BMjEzMDY2NzI3MF5BMl5BanBnXkFtZTcwODY5MjI3NA@@._V1_.jpg";

    const cardRow = document.getElementById("creatorCards");
    const card = document.createElement('div');
    card.classList.add("card", "bg-light");
    card.setAttribute("style", "width: 40rem;");
    const cardBody = document.createElement('div');
    const cardBlockquote = document.createElement('blockquote');
    const cardBlockquoteParagraph = document.createElement('p');
    cardBlockquoteParagraph.innerHTML =
        `Rick and Morty is an American adult animated science fiction sitcom created by Justin
    Roiland and Dan Harmon for Cartoon Network's nighttime programming block Adult Swim.
    The series follows the misadventures of cynical mad scientist Rick Sanchez
    and his good-hearted, but fretful grandson Morty Smith,
    who split their time between domestic life and interdimensional adventures.`

    cardBody.classList.add("card-body", "text-center");
    const cardTitle = document.createElement('h2');
    cardTitle.classList.add("card-title", "text-decoration-underline");
    cardTitle.innerHTML = "The Creators";
    const cardInnerRow = document.createElement('div');
    cardInnerRow.classList.add("row", "justify-content-center", "mb-2");

    const cardInnerColDan = imageAndColumnMaker3000("Dan Harmon", danImg);
    const cardInnerColJustin = imageAndColumnMaker3000("Justin Roiland", justinImg);

    cardInnerRow.append(cardInnerColJustin, cardInnerColDan);
    cardBlockquote.appendChild(cardBlockquoteParagraph);
    cardBody.append(cardTitle, cardInnerRow, cardBlockquote);
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

CreatorCardConstructor();
