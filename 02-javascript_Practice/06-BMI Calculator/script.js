const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');

const calculateBtn = document.querySelector('.calculate-btn');
const resetBtn = document.querySelector('.reset-btn');

const bmiValue = document.querySelector('.bmi-value');
const bmiCategory = document.querySelector('.bmi-category');

calculateBtn.addEventListener('click' , () =>{
    let height = heightInput.value / 100;
    let weight = weightInput.value;

    let bmi = weight / (height * height);

    bmiValue.textContent = bmi.toFixed(1);

    if (bmi < 18.5) {
        bmiCategory.textContent = 'Underweight';
    } else if (bmi < 25) {
        bmiCategory.textContent = 'Normal Weight';
    } else {
        bmiCategory.textContent = 'Overweight';
    }
});

resetBtn.addEventListener("click", () => {
    heightInput.value = '';
    weightInput.value = '';
    bmiValue.textContent = '22.5';
    bmiCategory.textContent = 'Normal Weight';
});

