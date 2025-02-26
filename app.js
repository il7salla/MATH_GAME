document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("gameBoard");
    const roleSelection = document.getElementById("roleSelection");
    const teacherSetup = document.getElementById("teacherSetup");
    const studentSetup = document.getElementById("studentSetup");
    const gameArea = document.getElementById("gameArea");
    const classList = document.getElementById("classList");
    const resultsDiv = document.getElementById("results");

    let selectedEquation = null;
    let currentStudent = null;
    let currentClass = null;

    let classes = JSON.parse(localStorage.getItem("classes")) || {}; 

    function selectRole(role) {
        roleSelection.classList.add("hidden");
        if (role === "teacher") teacherSetup.classList.remove("hidden");
        else {
            studentSetup.classList.remove("hidden");
            loadClasses();
        }
    }

    function createClass() {
        let teacherName = document.getElementById("teacherName").value.trim();
        let className = document.getElementById("className").value.trim();

        if (teacherName === "" || className === "") {
            alert("Please enter a name and class name.");
            return;
        }

        if (!classes[className]) {
            classes[className] = { teacher: teacherName, students: [] };
            localStorage.setItem("classes", JSON.stringify(classes));
        }

        alert(`Class ${className} created by ${teacherName}!`);
        teacherSetup.classList.add("hidden");
        roleSelection.classList.remove("hidden");
    }

    function loadClasses() {
        classList.innerHTML = "";
        Object.keys(classes).forEach(className => {
            let option = document.createElement("option");
            option.value = className;
            option.innerText = className;
            classList.appendChild(option);
        });
    }

    function joinClass() {
        let studentName = document.getElementById("studentName").value.trim();
        let selectedClass = classList.value;

        if (studentName === "") {
            alert("Please enter your name.");
            return;
        }

        currentStudent = studentName;
        currentClass = selectedClass;

        classes[selectedClass].students.push({ name: studentName, correct: 0, wrong: 0 });
        localStorage.setItem("classes", JSON.stringify(classes));

        studentSetup.classList.add("hidden");
        startGame();
    }

    function startGame() {
        gameArea.classList.remove("hidden");
        document.getElementById("gameInfo").innerText = `Welcome, ${currentStudent}! Playing in class: ${currentClass}`;

        let equations = [];
        let cards = [];
        for (let i = 0; i < 6; i++) {
            let eq = generateEquation();
            equations.push(eq);
            cards.push({ type: "equation", value: eq.equation });
            cards.push({ type: "answer", value: eq.answer });
        }
        cards = cards.sort(() => Math.random() - 0.5);

        renderBoard(cards);
    }

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

    function renderBoard(cards) {
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
        card.innerText = card.dataset.value;
        selectedEquation = card;
    }

    function checkAnswer() {
        let userAnswer = document.getElementById("answerInput").value.trim();
        if (userAnswer === selectedEquation.dataset.value) {
            updateScore(true);
        } else {
            updateScore(false);
        }
    }

    function updateScore(correct) {
        let student = classes[currentClass].students.find(s => s.name === currentStudent);
        correct ? student.correct++ : student.wrong++;
        localStorage.setItem("classes", JSON.stringify(classes));
        displayResults();
    }

    function displayResults() {
        resultsDiv.innerHTML = JSON.stringify(classes, null, 2);
    }

    window.selectRole = selectRole;
    window.createClass = createClass;
    window.joinClass = joinClass;
    window.checkAnswer = checkAnswer;
});
