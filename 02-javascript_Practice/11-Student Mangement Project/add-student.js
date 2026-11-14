const defaultCourses = [
  { name: "BCA", students: 250, maxStudents: 750 },
  { name: "B.Tech", students: 650, maxStudents: 750 },
  { name: "B.Sc IT", students: 450, maxStudents: 750 },
  { name: "MCA", students: 440, maxStudents: 750 },
  { name: "M.Tech", students: 458, maxStudents: 750 },
];

if (sessionStorage.getItem("addStudentAuthorized") !== "true") {
  document.body.style.display = "none";
  const currentPage = window.location.pathname.split("/").pop() + window.location.search;
  window.location.replace("login.html?next=" + encodeURIComponent(currentPage));
} else {
  document.body.style.visibility = "visible";

const params = new URLSearchParams(window.location.search);
const requestedCourse = params.get("course");
const courseSelect = document.getElementById("course");
const studentForm = document.getElementById("student-form");
const messageArea = document.getElementById("form-message");

function showFormMessage(message, type) {
  if (messageArea) {
    messageArea.textContent = message;
    messageArea.className = "message-area " + type;
  }
}

if (courseSelect && requestedCourse) {
  const courseExists = Array.from(courseSelect.options).some(function (option) {
    return option.value === requestedCourse;
  });

  if (courseExists) {
    courseSelect.value = requestedCourse;
  }
}

if (studentForm && courseSelect) {
  studentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const studentName = document.getElementById("student-name");
    const studentRoll = document.getElementById("roll-number");
    const studentEmail = document.getElementById("email");
    const studentPhone = document.getElementById("phone");
    const studentGender = document.getElementById("gender");
    const studentYear = document.getElementById("academic-year");
    const studentSemester = document.getElementById("semester");

    if (!studentName || !studentRoll || !studentEmail || !studentPhone || !studentGender || !studentYear || !studentSemester) {
      showFormMessage("The form is incomplete. Please reload the page and try again.", "error");
      return;
    }

    const newStudent = {
      name: studentName.value.trim(),
      rollNumber: studentRoll.value.trim(),
      email: studentEmail.value.trim(),
      phone: studentPhone.value.trim(),
      gender: studentGender.value,
      course: courseSelect.value,
      academicYear: studentYear.value,
      semester: studentSemester.value,
    };

    if (!newStudent.name || !newStudent.rollNumber || !newStudent.email || !newStudent.phone || !newStudent.gender || !newStudent.course || !newStudent.academicYear || !newStudent.semester) {
      showFormMessage("Please fill in all details.", "error");
      return;
    }

    let existingStudents;
    let courses;

    try {
      const savedStudents = localStorage.getItem("students");
      const savedCourses = localStorage.getItem("courses");
      existingStudents = savedStudents ? JSON.parse(savedStudents) : [];
      courses = savedCourses ? JSON.parse(savedCourses) : [...defaultCourses];
    } catch (error) {
      showFormMessage("Saved student data could not be read. Please check browser storage and try again.", "error");
      return;
    }

    if (!Array.isArray(existingStudents) || !Array.isArray(courses)) {
      showFormMessage("Saved student data is invalid. Please check browser storage before adding a student.", "error");
      return;
    }

    const normalizedRollNumber = newStudent.rollNumber.toLowerCase();
    const duplicateStudent = existingStudents.some(function (student) {
      return student && typeof student.rollNumber === "string" &&
        student.rollNumber.trim().toLowerCase() === normalizedRollNumber;
    });

    if (duplicateStudent) {
      showFormMessage("This roll number is already registered. Please enter a unique roll number.", "error");
      studentRoll.focus();
      return;
    }

    const courseToUpdate = courses.find(function (course) {
      return course && course.name === newStudent.course;
    });

    if (!courseToUpdate) {
      showFormMessage("The selected course was not found. Please reload the page and try again.", "error");
      return;
    }

    const currentCount = Number(courseToUpdate.students);
    const capacity = Number(courseToUpdate.maxStudents);

    if (!Number.isFinite(currentCount) || !Number.isFinite(capacity)) {
      showFormMessage("The selected course enrollment data is invalid.", "error");
      return;
    }

    if (currentCount >= capacity) {
      showFormMessage("This course is full and has no remaining seats.", "error");
      return;
    }

    courseToUpdate.students = currentCount + 1;
    existingStudents.push(newStudent);

    try {
      localStorage.setItem("courses", JSON.stringify(courses));
      localStorage.setItem("students", JSON.stringify(existingStudents));
    } catch (error) {
      showFormMessage("The student could not be saved. Please check available browser storage and try again.", "error");
      return;
    }

    showFormMessage("Student added successfully!", "success");
    studentForm.reset();

    if (requestedCourse && Array.from(courseSelect.options).some(function (option) {
      return option.value === requestedCourse;
    })) {
      courseSelect.value = requestedCourse;
    }

    window.setTimeout(function () {
      window.location.href = "index.html";
    }, 1200);
  });
}
}
