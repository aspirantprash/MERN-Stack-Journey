const btnOrang = document.querySelector("#orange");
const btnRed= document.querySelector("#red");
const btnPink = document.querySelector("#pink");
const btnGreen = document.querySelector("#green");
const btnBlue = document.querySelector("#blue");
const btnBrown = document.querySelector("#brown");

btnOrang.addEventListener("click", function(){
    document.body.style.backgroundColor='orange';
})

btnRed.addEventListener("click", function(){
    document.body.style.backgroundColor='red';
})

btnBlue.addEventListener("click", function(){
    document.body.style.backgroundColor='skyblue';
})

btnPink.addEventListener("click", function(){
    document.body.style.backgroundColor='pink';
})

btnGreen.addEventListener("click", function(){
    document.body.style.backgroundColor='greenyellow';
})

btnBrown.addEventListener("click", function(){
    document.body.style.backgroundColor='rgb(58, 25, 25)';
})