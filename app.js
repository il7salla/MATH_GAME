// Define initial state variables
let teacherName = '';
let className = '';
let students = [];
let studentName = '';
let studentClass = '';
let studentScore = 0;
let timeLeft = 60; // Default 1-minute timer for students
let questionIndex = 0;
let totalQuestions = 5; // Number of questions the student will be asked

let equations = [
    { equation: "(5x + 1) + (-8x - 2)", answer: -1 }, 
    { equation: "(-4x + 7) + (13x - 5)", answer: 9 },
    { equation: "(-2x + 6) + (5x - 9)", answer: 4 },
    { equation: "(7x - 8) + (-4x + 10)", answer: 3 },
    { equation: "(-9x + 12) + (6x - 15)", answer: -3 }
];

// Show user type selection (Teacher or Student)
document.getElementById('teacher-button').addEventListener('click', () => {
    document.getElementById('user-selection').classList.add('hidden');
    document.getElementById('teacher-mode').classList.remove('hidden');
});

document.getElementById('student-button').addEventListener('click', () => {
    document.getElementById('user-selection').classList.add('hidden');
    document.getElementById('student-mode').classList.remove('hidden');
});

// Teacher Mode: Set up teacher's dashboard
document.getElementById('start-teacher').addEventListener('click', () => {
    teacherName = document.getElementById('teacher-name').value;
    className = document.getElementById('class-name').value;

    if (teacherName && className) {
        // Show student list and populate it
        document.getElementById('teacher-dashboard').classList.remove('hidden');
        document.getElementById('teacher-mode').classList.add('hidden');

        // Simulate a list of students (can be replaced with actual data)
        students = [
            { name: 'Alice', score: 90, time: '00:30', result: 'Passed' },
            { name: 'Bob', score: 80, time: '00:45', result: 'Passed' },
            { name: 'Charlie', score: 70, time: '01:00', result: 'Failed' }
        ];

        // Display student results
        const studentList = document.getElementById('student-list');
        students.forEach(student => {
            const studentItem = document.createElement('li');
            studentItem.textContent = `${student.name} - Score: ${student.score}, Time: ${student.time}, Result: ${student.result}`;
            studentList.appendChild(studentItem);
        });

        // Show timer for the teacher
        document.getElementById('timer').classList.remove('hidden');
    }
});

// Student Mode: Set up student's game screen
document.getElementById('start-student').addEventListener('click', () => {
    studentName = document.getElementById('student-name').value;
    studentClass = document.getElementById('select-class').value;

    if (studentName && studentClass) {
        // Hide student form and start the game
        document.getElementById('student-mode').classList.add('hidden');
        document.getElementById('timer').classList.remove('hidden');
        startGame();
        startTimer();
    }
});

// Start the game: Show question and check answer
function startGame() {
    // Show the first equation
    showNextQuestion();
}

// Function to display the next question
function showNextQuestion() {
    if (questionIndex < totalQuestions) {
        const question = equations[questionIndex];
        const questionElement = document.createElement('p');
        questionElement.textContent = `Solve: ${question.equation}`;
        
        const answerInput = document.createElement('input');
        answerInput.type = 'number';
        answerInput.placeholder = 'Enter your answer';

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit Answer';
        
        submitButton.addEventListener('click', () => {
            checkAnswer(parseInt(answerInput.value), question.answer);
        });

        const questionContainer = document.getElementById('question-container');
        questionContainer.innerHTML = ''; // Clear any previous question
        questionContainer.appendChild(questionElement);
        questionContainer.appendChild(answerInput);
        questionContainer.appendChild(submitButton);
    } else {
        // End the game when questions are over
        endGame();
    }
}

// Check if the answer is correct
function checkAnswer(studentAnswer, correctAnswer) {
    if (studentAnswer === correctAnswer) {
        studentScore += 10; // Add points for a correct answer
        alert("Correct!");
    } else {
        alert("Incorrect!");
    }
    questionIndex++;
    showNextQuestion(); // Show next question
}

// Timer for student game
function startTimer() {
    const timeDisplay = document.getElementById('time-left');
    const timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timeDisplay.textContent = 'TIME OUT';
            endGame(); // End the game when time runs out
        } else {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timeDisplay.textContent = `Time Left: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            timeLeft--;
        }
    }, 1000);
}

// End the game when time runs out or all questions are answered
function endGame() {
    // Display the final score
    const scoreDisplay = document.getElementById('student-score');
    scoreDisplay.textContent = `Your Final Score: ${studentScore}`;
    console.log(`${studentName} finished the game with a score of ${studentScore}`);
}
