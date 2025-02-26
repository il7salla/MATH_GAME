// Define initial state variables
let teacherName = '';
let className = '';
let students = [];

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

document.getElementById('start-student').addEventListener('click', () => {
    const studentName = document.getElementById('student-name').value;
    const selectedClass = document.getElementById('select-class').value;

    if (studentName && selectedClass) {
        // Hide student form and start timer
        document.getElementById('student-mode').classList.add('hidden');
        startTimer();
    }
});

function startTimer() {
    let timeLeft = 60; // 1 minute timer
    const timeDisplay = document.getElementById('time-left');
    const timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timeDisplay.textContent = 'TIME OUT';
        } else {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timeDisplay.textContent = `Time Left: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            timeLeft--;
        }
    }, 1000);
}
