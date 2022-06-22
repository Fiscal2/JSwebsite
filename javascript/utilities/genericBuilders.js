'use strict'

function genericCardCreator(cardTitleText, cardBodyData) {
    const cardTemplate = document.createElement("template");
    cardTemplate.innerHTML =
        `<div class="card bg-info bg-gradient my-3" style="width: 40rem;">
            <div class="card-body text-center text-white">
                <h2 class="card-title" style="text-shadow: 2px 2px 2px #000000;">${cardTitleText}</h2>
                ${cardBodyData}
            </div>
        </div>`.trim()
    return cardTemplate.content;
}

export {
    genericCardCreator
}