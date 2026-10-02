const myClock = document.querySelector("#time");
const btnShow = document.querySelector("#btn");
const dateBro = document.querySelector("#date");
const btnDate = document.querySelector("#btnDate");
const timeWrapper = document.querySelector("#time-wrapper");
const dateWrapper = document.querySelector("#date-wrapper");

function pad(value) {
  return String(value).padStart(2, "0");
}

function displayTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;
  myClock.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)} ${ampm}`;
}

function displayDate() {
  const now = new Date();
  const date = now.getDate();
  const month = now.toLocaleString("en-US", { month: "long" });
  const year = now.getFullYear();

  dateBro.textContent = `${date} ${month} ${year}`;
}

function showTime() {
  timeWrapper.classList.add("active");
  dateWrapper.classList.remove("active");
}

function showDate() {
  dateWrapper.classList.add("active");
  timeWrapper.classList.remove("active");
}

btnShow.addEventListener("click", showTime);
btnDate.addEventListener("click", showDate);

showTime();
displayTime();
displayDate();

setInterval(() => {
  displayTime();
}, 1000);
