const jokesCategory = document.querySelector(".joke-category");
const jokesNumber = document.querySelector(".joke-number");

const jokesSetup = document.querySelector(".joke-content h2");
const jokesDeliver = document.querySelector(".joke-content p");

const jokesBtn = document.querySelector(".joke-button");
let count = 0;

jokesBtn.addEventListener("click", async () => {

    //buttton count
    count+=1;

    jokesNumber.textContent = "#" + String(count).padStart(3, "0");


    // API request
    const url = "https://v2.jokeapi.dev/joke/Programming?safe-mode";
    const jokesResponse = await fetch(url);


    //JSON conversion
    const data = await jokesResponse.json();


    //Console mein data
    if (data.type === "twopart")  {
        jokesSetup.textContent=data.setup;
        jokesDeliver.textContent = data.delivery;
    }
    else if (data.type === "single"){
        jokesSetup.textContent=data.joke;
        jokesDeliver.textContent = "";
    }
    console.log(data.joke);
});

