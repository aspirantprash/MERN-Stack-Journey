const navLinks = document.querySelectorAll(".nav-link");
const pageSections = document.querySelectorAll("main section.page-section");

navLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    // Sabhi navigation links se active remove karo
    navLinks.forEach(function (navLink) {
      navLink.classList.remove("active");
    });

    // Click kiye gaye link ko active karo
    link.classList.add("active");

    // Target section ki ID lo
    const targetId = link.getAttribute("href");

    // Sabhi sections hide karo
    pageSections.forEach(function (section) {
      section.classList.remove("active");
    });

    // Click kiya hua section show karo
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.classList.add("active");

      // Page ko top par scroll karo
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });
});

const defaultCourses = [
  { name: "BCA", students: 250, maxStudents: 750 },
  { name: "B.Tech", students: 650, maxStudents: 750 },
  { name: "B.Sc IT", students: 450, maxStudents: 750 },
  { name: "MCA", students: 440, maxStudents: 750 },
  { name: "M.Tech", students: 458, maxStudents: 750 }
];

const savedCourses = localStorage.getItem("courses");

let courses = savedCourses
  ? JSON.parse(savedCourses)
  : defaultCourses;

if (!savedCourses) {
  localStorage.setItem("courses", JSON.stringify(courses));
}


//  Total Student
const totalStudents = document.querySelectorAll("#total-students");

// Course-wise student elements
const bcaStudents = document.querySelectorAll(".bca-students");
const btechStudents = document.querySelectorAll("#btech-students");
const bscStudents = document.querySelectorAll("#bsc-students");
const mcaStudents = document.querySelectorAll("#mca-students");
const mtechStudents = document.querySelectorAll("#mtech-students");

// Total Calculate
let totalCount = 0;

courses.forEach(function(course) {
    totalCount += course.students;
});

console.log("Total Students:", totalCount);

// Update total student elements
totalStudents.forEach(function(element) {
    element.textContent = totalCount;
});

// Update course wise students
courses.forEach(function(course) {

    if (course.name === "BCA") {
        bcaStudents.forEach(function(element) {
           element.textContent = course.students;
        });
    }
    else if (course.name === "B.Tech") {
        btechStudents.forEach(function(element) {
            element.textContent = course.students;
        });
    }
    else if (course.name === "B.Sc IT") {
        bscStudents.forEach(function(element) {
            element.textContent = course.students;
        });
    }
    else if (course.name === "MCA") {
        mcaStudents.forEach(function(element) {
            element.textContent = course.students;
        });
    }
    else if (course.name === "M.Tech") {
        mtechStudents.forEach(function(element) {
            element.textContent = course.students;
        });
    }

});

// Progress Bar update code

courses.forEach(function(course) {
    if (course.name === "BCA"){
      bcaStudents.forEach(function(element) {
            let bcaProgress = Math.trunc(course.students / course.maxStudents * 100);
            console.log(bcaProgress)
            const bccaStats = document.querySelector(".purple-progress")
            bccaStats.style.width = bcaProgress + "%";
        });
      }
    else if(course.name==="B.Tech"){
      btechStudents.forEach(function(element) {
            let btechProgress = Math.trunc(course.students / course.maxStudents * 100);
            console.log(btechProgress)
            const btechStats = document.querySelector(".orange-progress")
            btechStats.style.width = btechProgress + "%";
        });
    }
    else if(course.name==="B.Sc IT"){
      bscStudents.forEach(function(element) {
            let bscProgress = Math.trunc(course.students / course.maxStudents * 100);
            console.log(bscProgress)
            const bscStats = document.querySelector(".green-progress")
            bscStats.style.width = bscProgress + "%";
        });
    }
    else if(course.name==="MCA"){
      mcaStudents.forEach(function(element) {
            let mcaProgress = Math.trunc(course.students / course.maxStudents * 100);
            console.log(mcaProgress)
            const mcaStats = document.querySelector(".blue-progress")
            mcaStats.style.width = mcaProgress + "%";
        });
    }
    else if(course.name==="M.Tech"){
      mtechStudents.forEach(function(element) {
            let mtechProgress = Math.trunc(course.students / course.maxStudents * 100);
            console.log(mtechProgress)
            const mtechStats = document.querySelector(".pink-progress")
            mtechStats.style.width = mtechProgress + "%";
        });
      }
});

//  View Button of Course


// view-btn All code
document.querySelectorAll(".course-action").forEach(button => {

  button.addEventListener("click", function() {

    // Btn click == give it's data-course
    
    const courseName = this.getAttribute("data-course");

    window.location.href = `course-details.html?course=${courseName}`;

    // Get course name from URL

      const params = new URLSearchParams(window.location.search);

      const coursesName = params.get("course");

      console.log(coursesName);



  });
});