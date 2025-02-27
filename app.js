let classes = {};
let equations = [
    ["(3/4)x + 2.5 = (1/2)x - 1.3", "-1.2"],
    ["(5.2x - 1/3) + (3/5 - 4.8x) = 2.4", "2.4"],
    ["(7/8)x - 3.6 = (2/9)x + 1.2", "6.1"],
    ["(4.5x + 2/7) - (1/4)x = 3.8", "0.9"],
    ["(6/11)x + 5.2 = (3/7)x - 2.9", "-2.4"],
    ["(2.3x - 1/6) + (4/5 - 3.2x) = -0.8", "1.7"],
    ["(5/12)x - 4.1 = (1/3)x + 2.7", "3.3"],
    ["(8.9x + 2/9) - (3/5)x = -1.6", "4.2"],
    ["(9/10)x + 3.4 = (1/2)x - 0.5", "2.8"],
    ["(7.5x - 2/5) + (5/6 - 6.8x) = 4.2", "3.9"],
];

function showTeacherForm() {
    document.getElementById("landing").classList.add("hidden");
    document.getElementById("teacher-form").classList.remove("hidden");
}

function showStudentForm() {
    document.getElementById("landing").classList.add("hidden");
    document.getElementById("student-form").classList.remove("hidden");

    let classList = document.getElementById("class-list");
    classList.innerHTML = "";
    for (let className in classes) {
        let option = document.createElement("option");
        option.value = className;
        option.textContent = className + " (Teacher: " + classes[className].teacher + ")";
        classList.appendChild(option);
    }
}

function startTeacher() {
    let teacher = document.getElementById("teacher-name").value;
    let className = document.getElementById("class-name").value;
    let timer = document.getElementById("enable-timer").checked;

    if (!teacher || !className) return alert("Please enter details!");

    classes[className] = { teacher, students: [], timer };
    document.getElementById("teacher-form").classList.add("hidden");
    document.getElementById("teacher-dashboard").classList.remove("hidden");
}

function startStudent() {
    let student = document.getElementById("student-name").value;
    let className = document.getElementById("class-list").value;

    if (!student || !className) return alert("Please enter details!");

    classes[className].students.push({ name: student, score: 0, time: "0:00", result: "Playing" });
    document.getElementById("student-form").classList.add("hidden");
    startGame(student, className);
}

function startGame(student, className) {
    document.getElementById("game").classList.remove("hidden");
    document.getElementById("game-title").textContent = `Welcome, ${student}!`;
    
    let grid = document.getElementById("card-grid");
    grid.innerHTML = "";

    let shuffledCards = [...equations, ...equations].sort(() => Math.random() - 0.5);
    
    shuffledCards.forEach((pair, index) => {
        let card = document.createElement("div");
        card.className = "card";
        card.textContent = "Click to flip";
        card.dataset.answer = pair[1];

        card.addEventListener("click", () => {
            card.classList.add("flipped");
            card.textContent = pair[0];
        });

        grid.appendChild(card);
    });
}
