// awesome sauce

// variables
let timeRemaining = 64; // default time in seconds
let timerReady = true; // debounce for start button
let interval; // id for setInterval
let switchSoundsEnabled = false;
//audio
let startSound = new Audio("audio/VEX IQ countdown.mp3");
let endSound = new Audio("https://www.studentroboticseducation.com/wp-content/uploads/2022/07/Match-end-sound.mp3");
let switchSound = new Audio("https://www.studentroboticseducation.com/wp-content/uploads/2022/07/Match-driver-switch-sound.mp3");
switchSound.volume = 0.7; // volume
let shortBeep = new Audio("https://www.studentroboticseducation.com/wp-content/uploads/2022/07/Short-beep.mp3");
let lastCount = new Audio("audio/final countdown.mp3");

// functions

//Match timer
function timerCount() {
    if ((timeRemaining == 26 || timeRemaining == 36) && switchSoundsEnabled) {
        switchSound.play(); // Play switch side sounds
    }
    if (timeRemaining <= 1) { // Regular countdown
        timerStop();
        timerText.innerHTML = "TIME UP";
        timerReady = true;
    }

    timeRemaining -= 1;
    if (timeRemaining <=60) {
        if (!(timerReady)) {
            timerText.innerHTML = timeRemaining.toString() + " seconds";
        }
    }
    if (timeRemaining == 10) {
        lastCount.play(); // Play end countdown
    }
}

function timerStart() {
    if (timerReady) {
        startSound.play();
        timerReady = false;
        timerCount();
        interval = setInterval(timerCount, 1000); // Run timerCount() every second
    }
}

function timerStop() {
    if (!(timerReady)) {
        timerReady = true;
        clearInterval(interval); // stop calling timerCount
    }
}

function timerReset() {
    timerReady = true;
    clearInterval(interval);
    timeRemaining = 64;
    if (timeRemaining <= 60){
        timerText.innerHTML = timeRemaining.toString() + " seconds";
    } else if (timeRemaining >= 60){
        timerText.innerHTML = "60 seconds";
    }
}

function switchCountdown() {
    if (timerReady) {
        switchSoundsEnabled = switchSoundsEnabled ? false : true;
        if (switchSoundsEnabled) {
            countdownSwitch.innerHTML = "Disable Switch Sounds"
        } else {
            countdownSwitch.innerHTML = "Enable Switch Sounds"
        }
    }
}

function showScore() {
    timerContainer.style.display = "none";
    scoreContainer.style.display = "flex";
}

//Score calculator

function calculateScores(inputRef, type) {
    if (type == 1){ // input type is numerical
        if (inputRef) { // ensure values only within the declared min and max are inputted
            const minVal = inputRef.getAttribute("min");
            const maxVal = inputRef.getAttribute("max");
            const defVal = inputRef.getAttribute("placeholder");
    
        var minNum = parseInt(minVal);
        var maxNum = parseInt(maxVal);
            
            if (parseInt(inputRef.value) > maxNum || parseInt(inputRef.value) < minNum) {
                inputRef.value = defVal;
            }
        }
    }

	let score1 = 0;
    let score2 = 0;

	let scoreInvalid = false;
	const t1Balls = document.getElementById("t1-numBalls").value;
	const t1HighHang = document.getElementById("t1-highHang");
	const t1LowHang = document.getElementById("t1-lowHang");
	const t1Park = document.getElementById("t1-park");
    const t2Balls = document.getElementById("t2-numBalls").value;
	const t2HighHang = document.getElementById("t2-highHang");
	const t2LowHang = document.getElementById("t2-lowHang");
	const t2Park = document.getElementById("t2-park");
	const scoreKey = [1, 4, 2, 1, 1, 4, 2, 1];

	let matchData = [
        t1Balls,
        t1HighHang.checked ? 1 : 0,
        t1LowHang.checked ? 1 : 0,
        t1Park.checked ? 1 : 0,
        t2Balls,
        t2HighHang.checked ? 1 : 0,
        t2LowHang.checked ? 1 : 0,
        t2Park.checked ? 1 : 0
    ];

    console.log(matchData);

	matchData = matchData.map(function (currentElement) {
		return currentElement == "" ? 0 : parseInt(currentElement);
	});

	for(let i = 0; i < 4; i++) {
		score1 += matchData[i] * scoreKey[i];
	}

    for(let i = 3; i < 8; i++) {
		score2 += matchData[i] * scoreKey[i];
	}

		score1 = Math.max(score1, 0);
        score2 = Math.max(score2, 0);

		document.getElementById("t1Score").style.color = "black";
		document.getElementById("t1Score").innerHTML = "Score: " + score1.toString();
        document.getElementById("t2Score").style.color = "black";
		document.getElementById("t2Score").innerHTML = "Score: " + score2.toString();

}

function clearFields() {
	document.getElementById("t1-numBalls").value = "";
	document.getElementById("t1-highHang").checked = false;
	document.getElementById("t1-lowHang").checked = false;
	document.getElementById("t1-park").checked = false;
	document.getElementById("t2-numBalls").value = "";
	document.getElementById("t2-highHang").checked = false;
	document.getElementById("t2-lowHang").checked = false;
	document.getElementById("t2-park").checked = false;
	calculateScores();
}

function showTimer() {
    scoreContainer.style.display = "none";
    timerContainer.style.display = "flex";
}

// button events
window.addEventListener("DOMContentLoaded", function() {
    // timer variables
    const timerContainer = document.getElementById("timerContainer");
    const scoreContainer = this.document.getElementById("scoreContainer");
    const startBtn = document.getElementById("startBtn");
    const stopBtn = document.getElementById("stopBtn");
    const resetBtn = document.getElementById("resetBtn");
    const countdownSwitch = document.getElementById("countdownSwitch");
    const scoreSwitch = document.getElementById("scoreSwitch");
    const timerText = this.document.getElementById("timerText");
    // score variables
	const t1Balls = document.getElementById("t1-numBalls");
	const t1HighHang = document.getElementById("t1-highHang");
	const t1LowHang = document.getElementById("t1-lowHang");
	const t1Park = document.getElementById("t1-park");
    const t2Balls = document.getElementById("t2-numBalls");
	const t2HighHang = document.getElementById("t2-highHang");
	const t2LowHang = document.getElementById("t2-lowHang");
	const t2Park = document.getElementById("t2-park");

    const clearBtn = document.getElementById("clearBtn");
    const timerSwitch = document.getElementById("timerSwitch");

    if (startBtn) { // Check if buttons loaded on browser
        // timer events
        startBtn.addEventListener("click", timerStart)
        stopBtn.addEventListener("click", timerStop)
        resetBtn.addEventListener("click", timerReset)
        countdownSwitch.addEventListener("click", switchCountdown)
        scoreSwitch.addEventListener("click", showScore)
        // score events
        //input buttons
        t1Balls.addEventListener("keyup", () => calculateScores(t1Balls, 1));
        t1Balls.addEventListener("change", () => calculateScores(t1Balls, 1));

        t1HighHang.addEventListener("change", () => calculateScores(t1HighHang, 2));

        t1LowHang.addEventListener("change", () => calculateScores(t1LowHang, 2));

        t1Park.addEventListener("change", () => calculateScores(t1Park, 2));

        t2Balls.addEventListener("keyup", () => calculateScores(t2Balls, 1));
        t2Balls.addEventListener("change", () => calculateScores(t2Balls, 1));

        t2HighHang.addEventListener("change", () => calculateScores(t2HighHang, 2));

        t2LowHang.addEventListener("change", () => calculateScores(t2LowHang, 2));

        t2Park.addEventListener("change", () => calculateScores(t2Park, 2));

        //score buttons
        clearBtn.addEventListener("click", clearFields);
        timerSwitch.addEventListener("click", showTimer);
    }   
});

function check(input, className)
{
    
    var checkboxes = document.getElementsByClassName(className);
    
    for(var i = 0; i < checkboxes.length; i++)
    {
        //uncheck all
        if(checkboxes[i].checked == true)
        {
            checkboxes[i].checked = false;
        }
    }
    
    //set checked of clicked object
    if(input.checked == true)
    {
        input.checked = false;
    }
    else
    {
        input.checked = true;
    }	
}