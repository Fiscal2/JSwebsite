const locationBaseUrl = "https://rickandmortyapi.com/api/location/"

async function FetchAllLocations(url) {
    const locationResponseData = await fetch(url);

    if (locationResponseData.ok) {
        const locationResponseJson = await locationResponseData.json();
        return locationResponseJson
    } else {
        return alert(`HTTP-Error: ${locationResponseData.status}`);
    }
}

async function LocationCardConstructor(locationUrl) {
    const locationData = await FetchAllLocations(locationUrl);
    const cardRow = document.getElementById("cardrow");

    for (let location of locationData.results) {
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
}

LocationCardConstructor(locationBaseUrl);
