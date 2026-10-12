const num = Math.floor(Math.random() * 100) + 1;
console.log(num);


const guess = document.querySelector("#guess");
const guessBtn = document.querySelector(".guess-btn");

const correctMsg = document.querySelector("#message");
const attempts = document.querySelector("#attempts");

const hint = document.querySelector("#hint");
const resetBtn = document.querySelector("#reset-btn");

guessBtn.addEventListener("click", function () {
  const userGuess = Number(guess.value);

  if (userGuess > num) {
    hint.textContent = "📈Too high, Try Again";
    attempts.textContent++;
  } else if (userGuess < num) {
    hint.textContent = "📉Too low, Try Again";
    attempts.textContent++;
  } else if (userGuess === num) {
    correctMsg.textContent =
      `Congrats🎉 Buddy! You won the Game`;
    hint.textContent="__";
    attempts.textContent++;
  }
});

resetBtn.addEventListener("click", () => {
    attempts.textContent="0";
    hint.textContent="__";
    correctMsg.textContent="💡 Your adventure starts here!";
    guess.value="";

});
