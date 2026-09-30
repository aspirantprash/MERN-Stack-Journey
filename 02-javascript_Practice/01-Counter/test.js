alert('Are You Excited to Saying Sita-Ram');
let count = 0;

const btnReset = document.querySelector("#reset");
const btnIncrease = document.querySelector("#increse");
const btnDecrease = document.querySelector("#decrese");
const countElement = document.querySelector("#count");
const msgPrint = document.querySelector("#msg");

//Increase Count
btnIncrease.addEventListener("click" , function(){

    count += 1;
    countElement.textContent = count;

    // Message show
    msgPrint.textContent = " Hello, Prashant:)";

    // Animation restart
    msgPrint.classList.remove("blink");

    // Reflow - animation ko dobara start karne ke liye
    void msgPrint.offsetWidth;

    msgPrint.classList.add("blink");

});

//Decrease Count
btnDecrease.addEventListener("click" , function(){
    count -= 1
    countElement.textContent = count;
})

//Reset Count
btnReset.addEventListener("click" , function(){
    count = 0
    countElement.textContent = count;

    msgPrint.textContent = "";
    msgPrint.classList.remove("blink");
})
