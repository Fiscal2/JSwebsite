'use strict';

const button = document.querySelector('.btn');
const image = document.querySelector('img')

const pickleRick = "https://static.wikia.nocookie.net/be-like-bro/images/7/7b/Picklerick.jpg/revision/latest/top-crop/width/360/height/450?cb=20171118185327"
const mortySmith = "https://static.tvtropes.org/pmwiki/pub/images/morty_smith_2.png"

button.addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');

    const className = document.body.className;
    if(className == "light-theme") {
        this.textContent = "Dark";
    } else {
        this.textContent = "Light";
    }

    const imageSRC = image.getAttribute('src')

    if(imageSRC === pickleRick){
        image.setAttribute('src', mortySmith)
    } else{
        image.setAttribute('src', pickleRick)
    }

    console.log('current class name: ' + className);
});

const text = document.getElementById("inp").value;

function Pressed()

    if(text === "morty smith"){
        image.setAttribute('src', mortySmith)
}   else {
        image.setAttribute('src', pickleRick)
}