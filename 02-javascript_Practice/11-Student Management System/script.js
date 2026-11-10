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

//  Total Student
const totalStudents = document.querySelectorAll("#total-students");

// Course-wise student element
const bcaStudents = document.querySelectorAll(".bca-students");
const btechStudents = document.querySelectorAll("#btech-students");
const bscStudents = document.querySelectorAll("#bsc-students");
const mcaStudents = document.querySelectorAll("#mca-students");
const mtechStudents = document.querySelectorAll("#mtech-students");

// Max student of all course
const maxStudents = document.querySelectorAll("#max-stud");


// Course ke dono elements count updated
function dashboardComplete(){
  bcaStudents.forEach(function (element) {
    element.textContent = 250;
  });

  btechStudents.forEach(function (element) {
    element.textContent = 650;
  });

  bscStudents.forEach(function (element) {
    element.textContent = 450;
  });

  mcaStudents.forEach(function (element) {
    element.textContent = 440;
  });

  mtechStudents.forEach(function (element) {
    element.textContent = 458;
  });

  // Har course ki current value read karo
  const bcaCount = Number(bcaStudents[0].textContent);
  const btechCount = Number(btechStudents[0].textContent);
  const bscCount = Number(bscStudents[0].textContent);
  const mcaCount = Number(mcaStudents[0].textContent);
  const mtechCount = Number(mtechStudents[0].textContent);

  // Total calculate karo
  const totalStudent = bcaCount + btechCount + bscCount + mcaCount + mtechCount;

  totalStudents.forEach(function (element) {
    element.textContent = totalStudent;
  });

  // Bca Progress bar broh
  const bcaprogress = Math.trunc(bcaCount / Number(maxStudents[0].textContent) * 100);
  const bccaStats = document.querySelector(".purple-progress")
  bccaStats.style.width = bcaprogress + "%";

  // Btech Progress bar broh
  const btechprogress = Math.trunc(btechCount / Number(maxStudents[0].textContent) * 100);
  const btechStats = document.querySelector(".orange-progress")
  btechStats.style.width = btechprogress + "%";

  // Bsc Progress bar broh
  const bscprogress = Math.trunc(bscCount / Number(maxStudents[0].textContent) * 100);
  const bscStats = document.querySelector(".green-progress")
  bscStats.style.width = bscprogress + "%";

  // Mca Progress bar broh
  const mcaprogress = Math.trunc(mcaCount / Number(maxStudents[0].textContent) * 100);
  const mcaStats = document.querySelector(".blue-progress")
  mcaStats.style.width = mcaprogress + "%";

  // Mtech Progress bar broh
  const mtechprogress = Math.trunc(mtechCount / Number(maxStudents[0].textContent) * 100);
  const mtechStats = document.querySelector(".pink-progress")
  mtechStats.style.width = mtechprogress + "%";





};
dashboardComplete();


// View course BTNS



const btechBtn = document.getElementById("btechbtn");
btechBtn.addEventListener('click', function() {
    window.location.href = 'course-details.html?course=B.Tech';
});
const bscBtn = document.getElementById("bscBtn");
bscBtn.addEventListener('click', function() {
    window.location.href = 'course-details.html?course=B.Sc IT';
});

const mcaBtn = document.getElementById("mcaBtn");
mcaBtn.addEventListener('click', function() {
    window.location.href = 'course-details.html?course=MCA';
});

const mtechBtn = document.getElementById("mtechBtn");
mtechBtn.addEventListener('click', function() {
    window.location.href = 'course-details.html?course=M.Tech';
});




//Bca course detail page

const bcaBtn = document.getElementById("bcabtnn");
bcaBtn.addEventListener('click', function() {
    window.location.href = 'bcadetail.html';
});

// const enrolledStudents = document.querySelector("#enrolled");
const availableSeats = document.querySelector("#available");

availableSeats.textContent = Number(maxStudents[0].textContent) - bcaCount;
enrolledStudents.textContent = bcaCount;