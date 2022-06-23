'use strict'

import { cardBuilder } from "./cardBuilder.js";


function tableHeadConstructor(tableHeaders) {
    const tableHead = document.createElement("thead");
    const tableHeaderRow = document.createElement("tr");

    for (const label of tableHeaders) {
        const tableHeaders = document.createElement("th");
        tableHeaders.setAttribute("scope", "col");
        tableHeaders.innerHTML = label
        tableHeaderRow.appendChild(tableHeaders)
    }
    tableHead.append(tableHeaderRow);
    return tableHead;
}


function tableBodyConstructor(tableBodyData) {
    const tableBody = document.createElement("tbody");

    tableBodyData.forEach(dict => {
        const bodyInfo = Object.values(dict);
        const tableDataRow = document.createElement("tr");
        tableDataRow.innerHTML =
            `<th scope="row">${bodyInfo[0]}</th>
            <td>${bodyInfo[1]}</td>
            <td>${bodyInfo[2]}</td>`.trim()
        tableBody.appendChild(tableDataRow);
    });
    return tableBody;
}


function tableConstructor(tableHeaderData, tableBodyData) {
    const tableRow = document.getElementById("ratingCard");
    const tableDiv = document.createElement("div");
    const table = document.createElement("table");
    table.classList.add("table", "table-info", "table-striped", "table-hover");

    const tableHead = tableHeadConstructor(tableHeaderData);
    const tableBody = tableBodyConstructor(tableBodyData);

    table.append(tableHead, tableBody);
    tableDiv.appendChild(table);
    const card = cardBuilder("Ratings", tableDiv.innerHTML);
    tableRow.appendChild(card);
}


export {
    tableConstructor
} 