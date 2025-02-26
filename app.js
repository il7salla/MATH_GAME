document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("gameBoard");
    let selectedEquation = null;

    // Generate random algebraic expressions
    function generateEquation() {
        let a = Math.floor(Math.random() * 15) - 7;
        let b = Math.floor(Math.random() * 15) - 7;
        let c = Math.floor(Math.random() * 15) - 7;
        let d = Math.floor(Math.random() * 15) - 7;

        return {
            equation: `(${a}x + ${b}) + (${c}x + ${d})`,
            answer: `${a + c}x + ${b + d}`
        };
    }

    // Create shuffled game cards
    let equations = [];
    let cards = [];
    for (let i = 0; i < 6; i++) {
        let eq = generateEquation();
        equations.push(eq);
        cards.push({ type: "equation", value: eq.equation });
        cards.push({ type: "answer", value: eq.answer });
    }
    cards = cards.sort(() => Math.random() - 0.5);

    // Render game board
    function renderBoard() {
        gameBoard.innerHTML = "";
        cards.forEach((card, index) => {
            let div = document.createElement("div");
            div.classList.add("card");
            div.innerText = "Click to Flip";
            div.dataset.value = card.value;
            div.dataset.type = card.type;
            div.dataset.index = index;
            div.addEventListener("click", () => flipCard(div));
            gameBoard.appendChild(div);
        });
    }

    function flipCard(card) {
        if (card.classList.contains("hidden")) return;
        card.innerText = card.dataset.value;

        if (selectedEquation === null && card.dataset.type === "equation") {
            selectedEquation = card;
            document.getElementById("answerInput").focus();
        } else if (selectedEquation !== null && card.dataset.type === "answer") {
            if (card.dataset.value === selectedEquation.dataset.value) {
                selectedEquation.classList.add("hidden");
                card.classList.add("hidden");
                selectedEquation = null;
                document.getElementById("feedback").innerText = "Correct! Match found.";
            } else {
                setTimeout(() => {
                    selectedEquation.innerText = "Click to Flip";
                    card.innerText = "Click to Flip";
                    selectedEquation = null;
                }, 1000);
                document.getElementById("feedback").innerText = "Wrong match, try again!";
            }
        }
    }

    function checkAnswer() {
        let userAnswer = document.getElementById("answerInput").value.trim();
        if (!selectedEquation) {
            document.getElementById("feedback").innerText = "Click an equation card first!";
            return;
        }
        if (userAnswer === selectedEquation.dataset.value) {
            document.getElementById("feedback").innerText = "Correct! Now find the matching card.";
        } else {
            document.getElementById("feedback").innerText = "Wrong answer! Try again.";
        }
    }

    // Render the board on page load
    renderBoard();

    // Attach checkAnswer to global scope so the button works
    window.checkAnswer = checkAnswer;
});
