

async function CreatorCardConstructor() {
    const justinImg = "https://static.wikia.nocookie.net/gravityfalls/images/2/2f/Justin_Roiland.jpg/revision/latest?cb=20200204214613";
    const danImg = "https://m.media-amazon.com/images/M/MV5BMjEzMDY2NzI3MF5BMl5BanBnXkFtZTcwODY5MjI3NA@@._V1_.jpg";

    const cardRow = document.getElementById("creatorCards");
    const card = document.createElement('div');
    card.classList.add("card", "bg-light");
    card.setAttribute("style", "width: 40rem;");
    const cardBody = document.createElement('div')
    cardBody.classList.add("card-body", "text-center");
    const cardTitle = document.createElement('h2');
    cardTitle.classList.add("card-title", "text-decoration-underline");
    cardTitle.innerHTML = "The Creators";
    const cardInnerRow = document.createElement('div');
    cardInnerRow.classList.add("row", "justify-content-center", "mb-2");

    const cardInnerColDan = imageAndColumnMaker3000(danImg);
    const cardInnerColJustin = imageAndColumnMaker3000(justinImg);

    cardInnerRow.append(cardInnerColDan, cardInnerColJustin);
    cardBody.append(cardTitle, cardInnerRow);
    card.appendChild(cardBody);
    cardRow.appendChild(card);

}

function imageAndColumnMaker3000(imageSource) {
    const imageColumn = document.createElement('div');
    imageColumn.classList.add("col-sm-4");
    const imageElement = document.createElement('img');
    imageElement.classList.add("img-thumbnail");

    imageElement.setAttribute("src", imageSource);
    imageElement.setAttribute("style", "width: 200px; height:250px;");
    imageColumn.appendChild(imageElement)
    return imageColumn;
}

CreatorCardConstructor();
