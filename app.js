'use strict';

const button = document.querySelector('.btn');
const image = document.querySelector('img')

const pickleRick = "https://static.wikia.nocookie.net/be-like-bro/images/7/7b/Picklerick.jpg/revision/latest/top-crop/width/360/height/450?cb=20171118185327"
const mortySmith = "https://static.tvtropes.org/pmwiki/pub/images/morty_smith_2.png"

button.addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');

    const className = document.body.className;

    const imageSRC = image.getAttribute('src')

    if(className == "light-theme") {
        this.textContent = "Dark";
    } else {
        this.textContent = "Light";
    }

    if(imageSRC === pickleRick){
        image.setAttribute('src', mortySmith)
    } else{
        image.setAttribute('src', pickleRick)
    }
});

function Pressed(){
    const text = document.getElementById("inp").value.toLowerCase();
    const mortyText = "morty smith"
    const pickleRickText = "pickle rick"

    if(text.length > 3 && mortyText.includes(text)){
        image.setAttribute('src', mortySmith)
    }else if(pickleRickText.includes(text)) {
        image.setAttribute('src', pickleRick)
    }else{
        console.log(text)
    }
}