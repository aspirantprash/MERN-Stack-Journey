const navLinks = document.querySelectorAll(".nav-link");
const pageSections = document.querySelectorAll("main section.page-section");

if (navLinks.length && pageSections.length) {
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      navLinks.forEach(function (navLink) {
        navLink.classList.remove("active");
      });

      link.classList.add("active");

      const targetId = link.getAttribute("href");

      pageSections.forEach(function (section) {
        section.classList.remove("active");
      });

      if (targetId) {
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          targetSection.classList.add("active");

          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      }
    });
  });
}

const defaultCourses = [
  { name: "BCA", students: 250, maxStudents: 750 },
  { name: "B.Tech", students: 650, maxStudents: 750 },
  { name: "B.Sc IT", students: 450, maxStudents: 750 },
  { name: "MCA", students: 440, maxStudents: 750 },
  { name: "M.Tech", students: 458, maxStudents: 750 },
];

function readCourses() {
  try {
    const savedCourses = localStorage.getItem("courses");

    if (!savedCourses) {
      localStorage.setItem("courses", JSON.stringify(defaultCourses));
      return [...defaultCourses];
    }

    const parsedCourses = JSON.parse(savedCourses);

    if (Array.isArray(parsedCourses) && parsedCourses.length) {
      return parsedCourses;
    }

    localStorage.setItem("courses", JSON.stringify(defaultCourses));
    return [...defaultCourses];
  } catch (error) {
    localStorage.setItem("courses", JSON.stringify(defaultCourses));
    return [...defaultCourses];
  }
}

let courses = readCourses();

function updateCourseDashboard() {
  const totalStudents = document.querySelectorAll("#total-students");
  const courseMap = {
    BCA: { elements: document.querySelectorAll(".bca-students"), progress: document.querySelector(".purple-progress") },
    "B.Tech": { elements: document.querySelectorAll("#btech-students"), progress: document.querySelector(".orange-progress") },
    "B.Sc IT": { elements: document.querySelectorAll("#bsc-students"), progress: document.querySelector(".green-progress") },
    MCA: { elements: document.querySelectorAll("#mca-students"), progress: document.querySelector(".blue-progress") },
    "M.Tech": { elements: document.querySelectorAll("#mtech-students"), progress: document.querySelector(".pink-progress") },
  };

  const totalCount = courses.reduce(function (sum, course) {
    return sum + (Number(course.students) || 0);
  }, 0);

  totalStudents.forEach(function (element) {
    element.textContent = totalCount;
  });

  Object.keys(courseMap).forEach(function (courseName) {
    const course = courses.find(function (item) {
      return item.name === courseName;
    });

    if (!course) {
      return;
    }

    const details = courseMap[courseName];

    details.elements.forEach(function (element) {
      element.textContent = course.students;
    });

    if (details.progress) {
      const progress = Math.min(100, Math.max(0, Math.trunc((course.students / course.maxStudents) * 100 || 0)));
      details.progress.style.width = progress + "%";
    }
  });
}

updateCourseDashboard();

if (document.querySelectorAll(".course-action").length) {
  document.querySelectorAll(".course-action").forEach(function (button) {
    button.addEventListener("click", function () {
      const courseName = this.getAttribute("data-course");

      if (courseName) {
        window.location.href = "course-details.html?course=" + encodeURIComponent(courseName);
      }
    });
  });
}

if (document.querySelectorAll(".add-student-btn").length) {
  document.querySelectorAll(".add-student-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      const courseName = this.getAttribute("data-course");

      if (courseName) {
        const destination = "add-student.html?course=" + encodeURIComponent(courseName);
        window.location.href = "login.html?next=" + encodeURIComponent(destination);
      }
    });
  });
}

const addStudentForm = document.getElementById("student-form");

if (addStudentForm) {
  addStudentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const studentName = document.getElementById("student-name");
    const studentRoll = document.getElementById("roll-number");
    const studentEmail = document.getElementById("email");
    const studentPhone = document.getElementById("phone");
    const studentGender = document.getElementById("gender");
    const courseSelect = document.querySelector('select[name="course"]');
    const studentYear = document.querySelector('select[name="academicYear"]');
    const studentSemester = document.querySelector('select[name="semester"]');

    if (!studentName || !studentRoll || !studentEmail || !studentPhone || !studentGender || !courseSelect || !studentYear || !studentSemester) {
      return;
    }

    const studentCourse = courseSelect.value;
    const newStudentData = {
      name: studentName.value.trim(),
      rollNumber: studentRoll.value.trim(),
      email: studentEmail.value.trim(),
      phone: studentPhone.value.trim(),
      gender: studentGender.value,
      course: studentCourse,
      academicYear: studentYear.value,
      semester: studentSemester.value,
    };

    if (!newStudentData.name || !newStudentData.rollNumber || !newStudentData.email || !newStudentData.phone || !newStudentData.course || !newStudentData.academicYear || !newStudentData.semester) {
      return;
    }

    const existingStudents = JSON.parse(localStorage.getItem("students") || "[]");
    existingStudents.push(newStudentData);
    localStorage.setItem("students", JSON.stringify(existingStudents));

    const courseToUpdate = courses.find(function (course) {
      return course.name === newStudentData.course;
    });

    if (courseToUpdate) {
      courseToUpdate.students = Number(courseToUpdate.students || 0) + 1;
      localStorage.setItem("courses", JSON.stringify(courses));
      updateCourseDashboard();
    }

    addStudentForm.reset();

    const messageArea = document.getElementById("form-message");
    if (messageArea) {
      messageArea.textContent = "Student added successfully!";
      messageArea.className = "message-area success";
    }

    window.setTimeout(function () {
      window.location.href = "index.html";
    }, 1200);
  });
}