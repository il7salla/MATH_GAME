// Define initial state variables
let teacherName = '';
let className = '';
let students = [];
let studentName = '';
let studentClass = '';
let studentScore = 0;
let timeLeft = 60; // Default 1-minute timer for students

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
        // Hide student form and start timer
        document.getElementById('student-mode').classList.add('hidden');
        document.getElementById('timer').classList.remove('hidden');
        startGame();
        startTimer();
    }
});

// Start the game (this can be customized for your specific game logic)
function startGame() {
    // Your game logic goes here: For example, a series of math questions or algebraic equations
    console.log(`${studentName} is playing the game!`);
}

// Start the countdown timer for the student
function startTimer() {
    const timeDisplay = document.getElementById('time-left');
    const timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timeDisplay.textContent = 'TIME OUT';
            endGame(); // This will be called when time is out
        } else {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timeDisplay.textContent = `Time Left: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            timeLeft--;
        }
    }, 1000);
}

// End the game when time runs out
function endGame() {
    // Simulate the student's score (This would be calculated during the game)
    studentScore = Math.floor(Math.random() * 100); // Random score between 0-100 for now
    document.getElementById('student-score').textContent = `Your Score: ${studentScore}`;
    console.log(`${studentName} finished the game with a score of ${studentScore}`);
    // Show the final score to the student
}
