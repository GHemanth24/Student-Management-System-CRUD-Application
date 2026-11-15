
const studentForm = document.getElementById("studentForm");

const studentTableBody = document.getElementById("studentTableBody");

const searchInput = document.getElementById("searchInput");

const submitBtn = document.getElementById("submitBtn");

// Get existing students from LocalStorage
let students = JSON.parse(localStorage.getItem("students")) || [];

let editId = null;


// Save students in LocalStorage
function saveToStorage() {

    localStorage.setItem("students", JSON.stringify(students));

}


// Display students
function displayStudents(studentList = students) {

    studentTableBody.innerHTML = "";

    studentList.forEach((student) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td>${student.email}</td>
            <td>${student.department}</td>
            <td>${student.year}</td>
            <td>${student.phone}</td>

            <td>
                <button class="edit-btn"
                    onclick="editStudent(${student.id})">
                    Edit
                </button>

                <button class="delete-btn"
                    onclick="deleteStudent(${student.id})">
                    Delete
                </button>
            </td>
        `;

        studentTableBody.appendChild(row);

    });

}


// Add or Update Student
studentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const student = {

        name: document.getElementById("studentName").value.trim(),

        roll: document.getElementById("rollNumber").value.trim(),

        email: document.getElementById("email").value.trim(),

        department: document.getElementById("department").value.trim(),

        year: document.getElementById("year").value,

        phone: document.getElementById("phone").value.trim()

    };

    if (Object.values(student).some(value => !value)) {
        alert("Please fill all fields");
        return;
    }

    if (editId === null) {

        // CREATE

        student.id = Date.now();

        students.push(student);

        alert("Student added successfully!");

    } else {

        // UPDATE

        students = students.map((s) => {

            if (s.id === editId) {

                return { ...student, id: editId };

            }

            return s;

        });

        alert("Student updated successfully!");

        editId = null;

        submitBtn.textContent = "Add Student";

    }

    saveToStorage();

    displayStudents();

    studentForm.reset();

});


// Edit Student
function editStudent(id) {

    const student = students.find(s => s.id === id);

    if (!student) return;

    document.getElementById("studentName").value = student.name;

    document.getElementById("rollNumber").value = student.roll;

    document.getElementById("email").value = student.email;

    document.getElementById("department").value = student.department;

    document.getElementById("year").value = student.year;

    document.getElementById("phone").value = student.phone;

    editId = id;

    submitBtn.textContent = "Update Student";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// Delete Student
function deleteStudent(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );

    if (confirmDelete) {

        students = students.filter(s => s.id !== id);

        saveToStorage();

        displayStudents();

        alert("Student deleted successfully!");

    }

}


// Search Students
searchInput.addEventListener("input", function() {

    const searchValue = searchInput.value.toLowerCase();

    const filteredStudents = students.filter((student) => {

        return (
            student.name.toLowerCase().includes(searchValue) ||
            student.roll.toLowerCase().includes(searchValue) ||
            student.department.toLowerCase().includes(searchValue)
        );

    });

    displayStudents(filteredStudents);

});


// Initial Display
displayStudents();
