let erSpillAktivt = false;
let poeng = 0;

const bil = document.getElementById('bil');
const hindring = document.getElementById('hindring');
const poengElement = document.getElementById('poeng');

document.getElementById('startKnapp').addEventListener('click', startSpillet);

function startSpillet() {
    erSpillAktivt = true;
    poeng = 0;
    poengElement.textContent = poeng;
    flyttHindring();
}

function flyttHindring() {
    if (!erSpillAktivt) return;

    let hindringPosisjon = parseInt(hindring.style.top) || 0;
    hindringPosisjon += 5; // Flytt hindringen nedover

    if (hindringPosisjon > 500) {
        hindringPosisjon = 0; // Reset hindringen til toppen  
        poeng += 1; // Øk poengsummen  
        poengElement.textContent = poeng;

        // Plasser hindringen tilfeldig til venstre eller høyre, men innenfor en liten passasje  
        const passasjeBredde = 150; // Bredde på passasjen  
        const passasjeStart = (spillområde.clientWidth - passasjeBredde) / 2;
        hindring.style.left = (Math.random() * passasjeBredde + passasjeStart) + 'px'; // Start inni passasjen  
    }

    hindring.style.top = hindringPosisjon + 'px';

    // Sjekk kollisjon  
    if (sjekkKollisjon()) {
        alert('Game Over! Du fikk ' + poeng + ' poeng!');
        erSpillAktivt = false;
    }

    requestAnimationFrame(flyttHindring);
}

document.addEventListener('keydown', function(event) {
    if (!erSpillAktivt) return;

    const spillområde = document.getElementById('spillområde');
    let bilPosisjon = bil.offsetLeft;

    if (event.key === 'ArrowRight' && bilPosisjon < spillområde.clientWidth - 50) {
        bilPosisjon += 10; // Flytt bilen til høyre  
    } else if (event.key === 'ArrowLeft' && bilPosisjon > 0) {
        bilPosisjon -= 10; // Flytt bilen til venstre  
    }
    bil.style.left = bilPosisjon + 'px'; // Oppdater bilens posisjon  
});

function sjekkKollisjon() {
    const bilRect = bil.getBoundingClientRect();
    const hindringRect = hindring.getBoundingClientRect();

    return !(
        bilRect.top > hindringRect.bottom ||
        bilRect.bottom < hindringRect.top ||
        bilRect.right < hindringRect.left ||
        bilRect.left > hindringRect.right  
    );
}