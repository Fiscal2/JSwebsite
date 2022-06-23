'use strict';

async function fetchRickAndMortyData(url) {
    const responseData = await fetch(url);

    if (responseData.ok) {
        return await responseData.json();
    } else {
        return alert(`HTTP-Error: ${responseData.status}`);
    }
}


async function paginatedFetchEndpoint({ endpoint, pageCount, grouped = false, groupSize = 0 }) {
    const responseArray = [];
    let baseUrl = `https://rickandmortyapi.com/api/${endpoint}/`;

    for (let i = 1; i <= pageCount; i++) {
        const pageData = await fetchRickAndMortyData(baseUrl);
        responseArray.push(pageData.results);
        baseUrl = pageData.info.next;
    }
    if (grouped) {
        return await fetchGroupBuilder(responseArray.flat(1), groupSize);
    }

    return responseArray.flat(1);
}


async function fetchGroupBuilder(allData, groupSize) {
    const groupedData = [];
    for (let i = 0; i < allData.length; i += groupSize) {
        groupedData.push(allData.slice(i, i + groupSize));
    }
    return groupedData;
}

export {
    fetchRickAndMortyData,
    paginatedFetchEndpoint
}