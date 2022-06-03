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
    console.log(locationData)
    const cardRow = document.getElementById("cardrow");
    const modalDiv = document.getElementById("modalDiv");

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
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#locationModal${location.id}">
                Residents
                </button>
            </div>
        `
        const modal = document.createElement('div')
        modal.innerHTML =
            `
            <div class="modal fade" id="locationModal${location.id}" data-bs-keyboard="false" tabindex="-1"
                aria-labelledby="locationModal" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${location.name}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">${location.residents}</div>
                    </div>
                </div>
            </div>
        `
        modalDiv.appendChild(modal)
        columnSmall.appendChild(card);
        cardRow.appendChild(columnSmall);
    }
}

LocationCardConstructor(locationBaseUrl);
