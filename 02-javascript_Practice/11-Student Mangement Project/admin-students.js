if (sessionStorage.getItem("addStudentAuthorized") !== "true") {
  document.body.style.display = "none";
  window.location.replace("login.html?next=admin-students.html");
} else {
  document.body.style.visibility = "visible";

  const tableBody = document.getElementById("student-table-body");
  const tableMessage = document.getElementById("table-message");
  const studentCount = document.getElementById("student-count");
  const searchInput = document.getElementById("student-search");
  let students;

  try {
    const savedStudents = localStorage.getItem("students");
    students = savedStudents ? JSON.parse(savedStudents) : [];
  } catch (error) {
    tableMessage.textContent = "Student records could not be read from browser storage.";
    tableMessage.className = "error-state";
  }

  if (students !== undefined && !Array.isArray(students)) {
    tableMessage.textContent = "Saved student data is invalid. No records can be displayed.";
    tableMessage.className = "error-state";
    students = [];
  }

  if (students !== undefined && tableBody && tableMessage && studentCount && searchInput) {
    studentCount.textContent = String(students.length);

    function renderStudents(searchTerm) {
      const normalizedSearch = searchTerm.trim().toLowerCase();
      const matchingStudents = students.filter(function (student) {
        return student && Object.values(student).some(function (value) {
          return String(value).toLowerCase().includes(normalizedSearch);
        });
      });

      tableBody.replaceChildren();

      matchingStudents.forEach(function (student, index) {
        const row = document.createElement("tr");
        const values = [
          String(index + 1),
          student.name,
          student.rollNumber,
          student.email,
          student.phone,
          student.gender,
          student.course,
          student.academicYear,
          student.semester,
        ];

        values.forEach(function (value) {
          const cell = document.createElement("td");
          cell.textContent = value === undefined || value === null ? "" : String(value);
          row.appendChild(cell);
        });

        tableBody.appendChild(row);
      });

      if (matchingStudents.length) {
        tableMessage.textContent = "";
      } else {
        tableMessage.textContent = normalizedSearch ? "No students match your search." : "No student records found. Add a student to see the details here.";
      }
    }

    searchInput.addEventListener("input", function () {
      renderStudents(searchInput.value);
    });

    renderStudents("");
  }
}
