const flowers = ["🌸", "🌺", "🌷"];
let isFalling = false;
let flowerInterval = null;
let activeFlowers = 0;

// Detect mobile / small screen
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 600;

// Settings
const MAX_FLOWERS = isMobile ? 200 : 350;
const MIN_FLOWERS_PER_TICK = isMobile ? 1 : 2;
const MAX_FLOWERS_PER_TICK = isMobile ? 2 : 4;
const INTERVAL_MS = isMobile ? 800 : 600;

// SPAWN SINGLE FLOWER
function spawnFlower() {
    activeFlowers++;

    const flower = document.createElement('div');
    flower.classList.add('emoji-flower');

    flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];

    // Horizontal position
    flower.style.left = 5 + Math.random() * 85 + "vw";

    // Start above the page
    flower.style.top = "-50px";
    flower.style.bottom = "auto";

    // Random size
    const size = 1.5 + Math.random() * 3;
    flower.style.fontSize = size + "rem";

    // Slower, natural duration
    const duration = 20 + (3 / size) * 2 + Math.random() * 4; // slower than before
    flower.style.setProperty("--duration", duration + "s");

    // Full page height
    const pageHeight = document.documentElement.scrollHeight + 100;
    flower.style.setProperty("--fall-distance", pageHeight + "px");

    // Random drift and rotation
    flower.style.setProperty("--drift-x1", (Math.random() * 40 - 20) + "px");
    flower.style.setProperty("--drift-x2", (Math.random() * 40 - 20) + "px");
    flower.style.setProperty("--drift-x3", (Math.random() * 40 - 20) + "px");
    flower.style.setProperty("--rotate1", (Math.random() * 60 - 30) + "deg");
    flower.style.setProperty("--rotate2", (Math.random() * 60 - 30) + "deg");
    flower.style.setProperty("--rotate3", (Math.random() * 60 - 30) + "deg");

    document.body.appendChild(flower);

    // Remove flower after animation
    setTimeout(() => {
        flower.remove();
        activeFlowers--;
    }, duration * 1000);
}

// CONTINUOUS RAIN
function startContinuousRain() {
    flowerInterval = setInterval(() => {
        const maxToSpawn = Math.min(MAX_FLOWERS_PER_TICK + Math.floor(Math.random() * (MAX_FLOWERS_PER_TICK - MIN_FLOWERS_PER_TICK + 1)), MAX_FLOWERS - activeFlowers);
        for (let i = 0; i < maxToSpawn; i++) {
            if (activeFlowers < MAX_FLOWERS) spawnFlower();
        }
    }, INTERVAL_MS);
}

// TOGGLE FLOWERS
function toggleFlowers() {
    const button = document.getElementById("flowerButton");
    const title = document.querySelector("h1"); // your h1 element

    if (!isFalling) {
        isFalling = true;
        button.textContent = "Pause";
        startContinuousRain(); // start slow continuous rain
        title.classList.add("rainbow-text"); // start rainbow effect
    } else {
        isFalling = false;
        button.textContent = "Hit It!";
        clearInterval(flowerInterval);
        title.classList.remove("rainbow-text"); // stop rainbow effect
    }
}

// ADD EVENT TO CALENDAR (same as before)
function addToCalendar() {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//My Birthday Website//EN
BEGIN:VEVENT
UID:${Date.now()}@birthdaysite.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:20251218T190000Z
DTEND:20251218T220000Z
SUMMARY:Vogue Fashion Show Exhibition
LOCATION:Aviva Studios
DESCRIPTION:Excited to go with you! x
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Vogue_Fashion_Show.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Small feedback flower
    const flower = document.createElement('div');
    flower.classList.add('emoji-flower');
    flower.textContent = "🌸";
    flower.style.left = 5 + Math.random() * 85 + "vw";
    flower.style.top = "-50px";
    flower.style.bottom = "auto";
    flower.style.fontSize = "2.5rem";

    const pageHeight = document.documentElement.scrollHeight + 100;
    flower.style.setProperty("--fall-distance", pageHeight + "px");
    flower.style.setProperty("--duration", "6s");
    flower.style.setProperty("--drift-x1", (Math.random() * 40 - 20) + "px");
    flower.style.setProperty("--drift-x2", (Math.random() * 40 - 20) + "px");
    flower.style.setProperty("--drift-x3", (Math.random() * 40 - 20) + "px");
    flower.style.setProperty("--rotate1", (Math.random() * 60 - 30) + "deg");
    flower.style.setProperty("--rotate2", (Math.random() * 60 - 30) + "deg");
    flower.style.setProperty("--rotate3", (Math.random() * 60 - 30) + "deg");

    document.body.appendChild(flower);
    setTimeout(() => flower.remove(), 6000);
}
