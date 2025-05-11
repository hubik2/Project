const startBtn = document.getElementById("start-button");
const min = document.getElementById("minuts");
const sec = document.getElementById("seconds");
const rightCircle = document.querySelector('.right-side.circle');
const leftCircle = document.querySelector('.left-side.circle');
const restBtn = document.getElementById("rest");
const pauseBtn = document.getElementById("pause");

let isRunning = false;
let myInterval;
let totalSecInitial;
let totalSec; 

const appTimer = () => {
    if (!isRunning) {
        isRunning = true;
        if (totalSec === undefined || totalSec <= 0) {
            let sessionAmount = Number.parseInt(min.textContent);
            totalSecInitial = sessionAmount * 60;
            totalSec = totalSecInitial;
        }

        const updateSec = () => {
            totalSec--;
            
            let minLeft = Math.floor(totalSec / 60);
            let secLeft = totalSec % 60;

            min.textContent = minLeft < 10 ? `0${minLeft}` : minLeft;
            sec.textContent = secLeft < 10 ? `0${secLeft}` : secLeft;

            const progress = ((totalSecInitial - totalSec) / totalSecInitial) * 100;
            const angle = progress * 3.6;

            if (angle <= 180) {
                rightCircle.style.transform = `rotate(${angle}deg)`;
                leftCircle.style.transform = 'rotate(0deg)';
            } else {
                rightCircle.style.transform = 'rotate(180deg)';
                leftCircle.style.transform = `rotate(${angle - 180}deg)`;
            }

            if (totalSec <= 0) {
                clearInterval(myInterval);
                isRunning = false;
                totalSec = 0;
                min.textContent = "25";
                sec.textContent = "00";
                rightCircle.style.transform = 'rotate(0deg)';
                leftCircle.style.transform = 'rotate(0deg)';
                alert("Time is end!");
            }
        };

        myInterval = setInterval(updateSec, 1000);
    } else {
        alert("Session has already started!");
    }
};

pauseBtn.addEventListener("click", () => {
    if (isRunning) {
        clearInterval(myInterval);
        isRunning = false;
        alert("You pause the timer!");
    } else if (totalSec > 0) {
        appTimer();
    }
});

restBtn.addEventListener("click", () => {
    clearInterval(myInterval);
    isRunning = false;
    totalSec = 0;
    min.textContent = "25";
    sec.textContent = "00";
    rightCircle.style.transform = 'rotate(0deg)';
    leftCircle.style.transform = 'rotate(0deg)';
    alert("You reset the timer!")
});

startBtn.addEventListener("click", () => {
    appTimer();
});
