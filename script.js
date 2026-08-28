class Coach {
    constructor(name, specialization, rating) {
        this.name = name;
        this.specialization = specialization;
        this.rating = rating;
    }

    displayInfo() {
        const infoString = `Coach: ${this.name}, Specialization: ${this.specialization}, Rating: ${this.rating}`;
        
        console.log(infoString);
        
        return infoString;
    }
}

const coach1 = new Coach('John Doe', 'Fitness', 4.7);
const coach2 = new Coach('Alice Smith', 'Yoga', 4.9);

const listContainer = document.getElementById('coaches-list');
const coaches = [coach1, coach2];

coaches.forEach(coach => {
    const card = document.createElement('div');
    card.className = 'coach-card';
    
    card.textContent = coach.displayInfo();
    
    listContainer.appendChild(card);
});