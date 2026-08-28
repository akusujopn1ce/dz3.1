const container = document.getElementById('table-container');

const table = document.createElement('table');

for (let i = 1; i <= 10; i++) {
    const row = document.createElement('tr');

    for (let j = 1; j <= 10; j++) {
        const isHeader = (i === 1 || j === 1);
        
        const cell = document.createElement(isHeader ? 'th' : 'td');
        
        cell.textContent = i * j;

        row.appendChild(cell);
    }
    
    table.appendChild(row);
}

container.appendChild(table);