const locationBaseUrl = "https://rickandmortyapi.com/api/location/"

function GetAllLocations(url) {
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data)
            const cardRow = document.getElementById("cardrow");

            for (let location of data.results) {
                const columnSmall = document.createElement("div");
                columnSmall.classList.add("col-sm-4")
                const card = document.createElement("div");
                card.classList.add("card", "my-2", "bg-transparent", "text-white");
                card.innerHTML =
                    `
                    <h5 class="card-header bg-success">${location.name}</h5>
                    <div class="card-body bg-success bg-opacity-75">
                        <h5 class="card-title">${location.dimension}</h5>
                        <h6 class="card-subtitle mb-2">Type: ${location.type}</h6>
                        <p class="card-text">Number of residents: ${location.residents.length}</p>
                    </div>
                `
                columnSmall.appendChild(card);
                cardRow.appendChild(columnSmall);
            }

        })
        .catch((error) => {
            console.log(error);
        });
}

GetAllLocations(locationBaseUrl)