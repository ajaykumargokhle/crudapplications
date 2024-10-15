// Retrieve employees from LocalStorage
function getEmployees() {
    const employees = localStorage.getItem('employees');
    return employees ? JSON.parse(employees) : [];
}

// Save employees to LocalStorage
function saveEmployees(employees) {
    localStorage.setItem('employees', JSON.stringify(employees));
}

// Render the employees on the table
function renderEmployees() {
    const employees = getEmployees();
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    employees.forEach((employee, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.age}</td>
            <td>${employee.salary}</td>
            <td>${employee.address}</td>
            <td class="actions">
                <button class="edit" onclick="editEmployee(${index})">Edit</button>
                <button class="delete" onclick="deleteEmployee(${index})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Add or update an employee
document.getElementById('employeeForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const salary = document.getElementById('salary').value;
    const address = document.getElementById('address').value;
    const editIndex = document.getElementById('editIndex').value;

    let employees = getEmployees();

    if (editIndex) {
        // Update employee
        employees[editIndex] = { name, age, salary, address };
        document.getElementById('submitButton').textContent = 'Add Employee';
    } else {
        // Add new employee
        employees.push({ name, age, salary, address });
    }

    saveEmployees(employees);
    renderEmployees();

    // Clear form
    document.getElementById('employeeForm').reset();
    document.getElementById('editIndex').value = '';
});

// Edit an employee
function editEmployee(index) {
    const employees = getEmployees();
    const employee = employees[index];

    document.getElementById('name').value = employee.name;
    document.getElementById('age').value = employee.age;
    document.getElementById('salary').value = employee.salary;
    document.getElementById('address').value = employee.address;
    document.getElementById('editIndex').value = index;
    document.getElementById('submitButton').textContent = 'Update Employee';
}

// Delete an employee
function deleteEmployee(index) {
    let employees = getEmployees();
    employees.splice(index, 1);
    saveEmployees(employees);
    renderEmployees();
}

// Initial render
renderEmployees();
