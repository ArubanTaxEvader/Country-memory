//hier maakt het een array voor al de images die in de map img zitten
var imagesflags = [
    "img/China.png",
    "img/France.png",
    "img/Germany.png",
    "img/Russia.png",
    "img/India.png",
    "img/Usa.png",
    "img/Canada.png",
    "img/Italy.png",
    "img/Spain.png",
    "img/Japan.png",
    "img/Australia.png",
    "img/Brazil.png",
    "img/South Africa.png",
    "img/South Korea.png",
    "img/Mexico.png",
    "img/Poland.png",
    "img/Indonesia.png",
    "img/Egypt.png"
];

// hier maakt het een functie aan die de array shuffelt
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// hier maakt het een array aan die de imagesflags array 2 keer dupliceert
var imagesflagstwice = imagesflags.concat(imagesflags);

//het maakt het een functie aan die de array shuffelt
shuffleArray(imagesflagstwice);

//het maakt het een functie aan die de images in de array zet
var flippedImages = []; 


//hier wordt een functie aangemaakt die de onlick event aan en uit zet
//het selecteerd alle images met de id exampleImage
//het krijgt de id van de image
//het haalt de index uit de id
//het null zorgt ervoor dat de onclick event uitgezet wordt

function enableImageClick(enabled) { 
    var images = document.querySelectorAll("img[id^='exampleImage']"); 
    images.forEach(function(img) { 
        img.onclick = enabled ? function() { 
            var id = this.id; 
            var index = parseInt(id.replace("exampleImage", "")) - 1; 
            handleImageClick(id, index); 
        } : null; 
    });
}


function handleImageClick(id, index) {
    // Controleer of minder dan 2 afbeeldingen zijn omgedraaid
    if (flippedImages.length < 2) {
        //het pakt het afbeelding van het id
        var img = document.getElementById(id);
        // Controleer of de afbeelding nog niet is omgedraaid
        if (!flippedImages.includes(id)) {
            // Stel de bron van de afbeelding in
            img.src = imagesflagstwice[index];
            // het geklikte beeld toe aan het flippedImages-array
            flippedImages.push(id);

            // Controleer of twee afbeeldingen zijn omgedraaid
            if (flippedImages.length === 2) {
                // zorgt ervoor dat je geen andere afbeeldingen mag klikken
                enableImageClick(false);
                // Haal de IDs en indexen van de omgedraaide afbeeldingen op
                var id1 = flippedImages[0];
                var id2 = flippedImages[1];
                var index1 = parseInt(id1.replace("exampleImage", "")) - 1; 
                var index2 = parseInt(id2.replace("exampleImage", "")) - 1;

                // Controleer of de afbeeldingen overeenkomen
                if (imagesflagstwice[index1] !== imagesflagstwice[index2]) {
                    //als de afbeeldingen niet op elkaar lijkt, dan draait het de afbeeldingen terug
                    setTimeout(function () {
                        document.getElementById(id1).src = "img/Globe.png";
                        document.getElementById(id2).src = "img/Globe.png";
                        // Verwijder omgedraaide afbeeldingen uit het flippedImages-array
                        flippedImages = [];
                        //zorgt ervoor dat je weer op andere afbeeldingen mag klikken
                        enableImageClick(true);
                    }, 1000); // Pas de vertragingstijd aan indien nodig
                } else {
                    // Als de afbeeldingen overeenkomen, verwijder ze uit het flippedImages-array
                    flippedImages = [];
                    //zorgt ervoor dat je weer op andere afbeeldingen mag klikken
                    enableImageClick(true);
                }
            }
        }
    }
}
enableImageClick(true); // hier wordt de functie aangeroept die de onclick event aan zet

function resetGame() {
    // zet alle afbeeldingen terug naar de globe
    for (var i = 1; i <= 36; i++) {
        var imgId = "exampleImage" + i;
        document.getElementById(imgId).src = "img/Globe.png";
    }
    // shuffelt de array
    shuffleArray(imagesflagstwice);
    // verwijderd alles in het flippedImages array
    flippedImages = [];
    // zorgt ervoor dat je weer op andere afbeeldingen mag klikken
    enableImageClick(true);
}