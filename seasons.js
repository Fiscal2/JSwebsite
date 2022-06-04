async function FetchRickAndMortyData(url) {
    const responseData = await fetch(url);

    if (responseData.ok) {
        return await responseData.json();
    } else {
        return alert(`HTTP-Error: ${responseData.status}`);
    }
}

async function EpisodeCardConstructor() {
    const episodeBaseUrl = "https://rickandmortyapi.com/api/episode"
}


