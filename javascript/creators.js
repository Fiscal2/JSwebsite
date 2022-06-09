

async function CreatorCardConstructor() {
    const justinImg = "https://static.wikia.nocookie.net/gravityfalls/images/2/2f/Justin_Roiland.jpg/revision/latest?cb=20200204214613";
    const danImg = "https://m.media-amazon.com/images/M/MV5BMjEzMDY2NzI3MF5BMl5BanBnXkFtZTcwODY5MjI3NA@@._V1_.jpg";


    
        const cardRow = document.getElementById("creatorCards");
        const card = document.createElement('div');
        card.classList.add("card", "bg-light");
        card.setAttribute("style", "width: 40rem;");
        const cardBody = document.createElement('div')
        cardBody.classList.add("card-body", "text-center");
        const cardTitle = document.createElement('div');
        cardTitle.classList.add("card-title", "text-decoration-underline");
        // how do I add an h4 card title? I know it would go somewhere here, but I'm missing something.
        

        const cardInnerRow = document.createElement('div');
        cardInnerRow.classList.add("row", "justify-content-center", "mb-2");
        const cardInnerColDan = document.createElement('div');
        cardInnerColDan.classList.add("col-sm-4");
        const cardInnerColJustin = document.createElement('div');
        cardInnerColJustin.classList.add("col-sm-4");
        const cardImageDan = document.createElement('img');
        cardImageDan.classList.add("img-thumbnail");
        cardImageDan.setAttribute("src", danImg);
        cardImageDan.setAttribute("style", "width: 200px; height:250px;")

        const cardImageJustin = document.createElement('img');
        cardImageJustin.classList.add("img-thumbnail");
        cardImageJustin.setAttribute("src", justinImg);
        cardImageJustin.setAttribute("style", "width: 200px; height:250px;")
        

        cardInnerColDan.appendChild(cardImageDan);
        cardInnerColJustin.appendChild(cardImageJustin);
        cardInnerRow.append(cardInnerColDan, cardInnerColJustin);
        cardBody.appendChild(cardInnerRow);
        cardBody.appendChild(cardTitle);
        card.appendChild(cardBody);
        cardRow.appendChild(card);

}

CreatorCardConstructor();
