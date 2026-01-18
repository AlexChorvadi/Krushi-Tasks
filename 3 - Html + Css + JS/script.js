// const resultArr = [{
//     letter: "A",
//     Position: [1, 2]
// },
// {
//     letter: "B",
//     Position: [3, 4]
//j }];
const resultArr = [];
const data = { isWaitingforAnotherCard: false, isQuerying: false, previousCard: null };
const click = new Audio("src/click_sound.mp3");
function startGame() {
    const startBtn = document.getElementById("startBtn");
    startBtn.classList.add("hidden");
    congratsMessage.classList.remove("show");
    generateCards();
}
function generateCards() {
    clear();
    const count = 12;
    const container = document.getElementById("cardContainer");
    congratsMessage.classList.remove("show");

    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"];
    const imgs = { "A": "img1.jpg", "B": "img2.jpg", "C": "img3.jpg", "D": "img4.jpg", "E": "img5.jpg", "F": "img6.jpg" };
    const animals = {
        A: "🦓",
        B: "🐐",
        C: "🦘",
        D: "🐘",
        E: "🦒",
        F: "🦉",
        G: "🐊",
        H: "🦔",
        I: "🐅",
        J: "🦥",
        K: "🦦",
        L: "🐇",
        M: "🦨",
        N: "🦡",
        O: "🐿️",
        P: "🦃",
        Q: "🦜",
        R: "🦩",
        S: "🦫"
    };

    const copied_letters = [...letters, ...letters]; // Duplicate letters for pairs

    for (let i = 1; i <= (letters.length * 2); i++) {
        const card = document.createElement("div");
        card.className = "card";
        let randomChar = copied_letters[Math.floor(Math.random() * copied_letters.length)];
        // Remove the selected character to avoid duplicates
        const index = copied_letters.indexOf(randomChar);
        copied_letters.splice(index, 1);
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    Click to Flip
                </div>
                <div class="card-back" data-position="${i}" data-letter="${randomChar}">
                    
                    ${animals[randomChar]}
                </div>
            </div>
        `;

        // Toggle flip on click
        card.addEventListener("click", () => {
            revealCards(card);
        });

        container.appendChild(card);
    }
}

function createSparks(card) {
    for (let i = 0; i < 10; i++) {
        const spark = document.createElement("span");
        spark.className = "spark";

        const angle = Math.random() * Math.PI * 2;
        const distance = 40 + Math.random() * 30;

        spark.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
        spark.style.setProperty("--y", `${Math.sin(angle) * distance}px`);

        spark.style.left = "50%";
        spark.style.top = "50%";

        card.appendChild(spark);
        // Remove spark after animation
        spark.addEventListener("animationend", () => spark.remove());
    }
}

function revealCards(card) {
    if (data.isQuerying || card.getAttribute("matched") === "true" || card.classList.contains("flipped")) {
        return;
    }
    card.classList.toggle("flipped");
    document.getElementById("moveCount").innerText = parseInt(document.getElementById("moveCount").innerText) + 1;
    const revealInterval = 1000; // milliseconds
    const cardLetter = card.querySelector(".card-back").getAttribute("data-letter");
    const cardPosition = card.querySelector(".card-back").getAttribute("data-position");
    const resultArrEntry = resultArr.filter(x => x.letter === cardLetter);
    if (resultArrEntry.length > 0) {
        click.play();
        document.getElementById("matchedCount").innerText = parseInt(document.getElementById("matchedCount").innerText) + 1;
        resultArrEntry[0].Position.push(cardPosition);
        // createSparks(data.previousCard); 
        data.previousCard.setAttribute("matched", "true");
        // createSparks(card); 
        card.setAttribute("matched", "true");
        data.isWaitingforAnotherCard = false;
        matchedResult();

    } else {
        if (data.isWaitingforAnotherCard) {
            data.isWaitingforAnotherCard = false;
            data.isQuerying = true
            const UnMatchedindex = resultArr.findIndex(x => x.Position.length === 1);
            if (UnMatchedindex !== -1) {
                resultArr.splice(UnMatchedindex, 1);
            }
            data.previousCard = null;
            setTimeout(() => {
                Array.from(document.getElementsByClassName("flipped")).filter(x => x.getAttribute("matched") !== "true").forEach(x => x.classList.remove("flipped"));
                data.isQuerying = false
            }, revealInterval);
            return;
        }
        const obj = { letter: cardLetter, Position: [cardPosition] };
        resultArr.push(obj);
        data.isWaitingforAnotherCard = true;
        data.previousCard = card;
    }
}

function matchedResult() {
    const matchedCards = resultArr.filter(x => x.Position.length > 1);
    if (matchedCards.length === 19) {
        showCongrats();
    }
}

function showCongrats() {
    const congratsMessage = document.getElementById("congratsMessage");
    congratsMessage.classList.add("show");
}

function btnShuffleClick() {
    const container = document.getElementById("cardContainer");
    const shuffleBtn = document.getElementById("shuffleBtn");

    const cards = Array.from(container.children);

    // 1️⃣ Remove transition
    cards.forEach(card => card.style.transition = "none");

    // 2️⃣ FIRST positions
    const first = cards.map(card => card.getBoundingClientRect());

    // 3️⃣ Shuffle DOM order
    shuffleArray(cards);
    cards.forEach(card => container.appendChild(card));

    // 4️⃣ LAST positions
    const last = cards.map(card => card.getBoundingClientRect());

    // 5️⃣ INVERT
    cards.forEach((card, i) => {
        const dx = first[i].left - last[i].left;
        const dy = first[i].top - last[i].top;
        card.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    // 6️⃣ Force reflow
    container.offsetHeight;

    // 7️⃣ PLAY animation
    cards.forEach(card => {
        card.style.transition = "transform 600ms ease";
        card.style.transform = "translate(0,0)";
    });
}
/* Fisher-Yates Shuffle */
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function clear() {
    const container = document.getElementById("cardContainer");
    container.innerHTML = "";
    resultArr.length = 0;
    data.isWaitingforAnotherCard = false;
    data.isQuerying = false;
    data.previousCard = null;
}