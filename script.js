class Student {
    constructor(firstName, lastName, birthYear, grades = []) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthYear = birthYear;
        this.grades = grades;
        this.attendance = new Array(25);
        this.attendanceIndex = 0; 
    }

    getAge() {
        return new Date().getFullYear() - this.birthYear;
    }

    getAverageGrade() {
        if (this.grades.length === 0) return 0;
        const sum = this.grades.reduce((acc, grade) => acc + grade, 0);
        return sum / this.grades.length;
    }

    present() {
        if (this.attendanceIndex < 25) {
            this.attendance[this.attendanceIndex] = true;
            this.attendanceIndex++;
        }
    }

    absent() {
        if (this.attendanceIndex < 25) {
            this.attendance[this.attendanceIndex] = false;
            this.attendanceIndex++;
        }
    }

    getAverageAttendance() {
        if (this.attendanceIndex === 0) return 0;
        let presentCount = 0;
        for (let i = 0; i < this.attendanceIndex; i++) {
            if (this.attendance[i] === true) presentCount++;
        }
        return presentCount / this.attendanceIndex;
    }

    summary() {
        const avgGrade = this.getAverageGrade();
        const avgAttendance = this.getAverageAttendance();

        if (this.attendanceIndex === 0) return "Немає даних";

        if (avgGrade > 90 && avgAttendance > 0.9) {
            return "Молодець!";
        } else if (avgGrade < 90 && avgAttendance < 0.9) {
            return "Редиска!";
        } else {
            return "Добре, але можна краще";
        }
    }
}

const student1 = new Student("Іван", "Шевченко", 2005, [95, 92, 100, 98]);
for (let i = 0; i < 20; i++) student1.present(); 

const student2 = new Student("Марія", "Коваленко", 2004, [91, 95, 99]);
for (let i = 0; i < 10; i++) student2.present();
for (let i = 0; i < 5; i++) student2.absent(); 

const student3 = new Student("Олег", "Петренко", 2006, [60, 75, 55, 70]);
for (let i = 0; i < 5; i++) student3.present();
for (let i = 0; i < 15; i++) student3.absent(); 

const students = [student1, student2, student3];

const container = document.getElementById('students-container');

students.forEach(student => {
    const summaryText = student.summary();
    
    let cardClass = 'average';
    if (summaryText === "Молодець!") cardClass = 'excellent';
    if (summaryText === "Редиска!") cardClass = 'bad';

    const attendancePercent = Math.round(student.getAverageAttendance() * 100);

    const card = document.createElement('div');
    card.className = `student-card ${cardClass}`;
    
    card.innerHTML = `
        <div class="student-name">${student.firstName} ${student.lastName}</div>
        <div class="student-info">
            <p><strong>Вік:</strong> ${student.getAge()} років</p>
            <p><strong>Середній бал:</strong> ${student.getAverageGrade().toFixed(1)}</p>
            <p><strong>Відвідуваність:</strong> ${attendancePercent}% (занять: ${student.attendanceIndex})</p>
        </div>
        <div class="summary-badge">${summaryText}</div>
    `;
    
    container.appendChild(card);
});