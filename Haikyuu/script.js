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
	const t1HighHang1 = document.getElementById("t1-highHang1");
	const t1LowHang1 = document.getElementById("t1-lowHang1");
	const t1Park1 = document.getElementById("t1-park1");
    const t1HighHang2 = document.getElementById("t1-highHang2");
	const t1LowHang2 = document.getElementById("t1-lowHang2");
	const t1Park2 = document.getElementById("t1-park2");
    const t2Balls = document.getElementById("t2-numBalls").value;
	const t2HighHang1 = document.getElementById("t2-highHang1");
	const t2LowHang1 = document.getElementById("t2-lowHang1");
	const t2Park1 = document.getElementById("t2-park1");
	const t2HighHang2 = document.getElementById("t2-highHang2");
	const t2LowHang2 = document.getElementById("t2-lowHang2");
	const t2Park2 = document.getElementById("t2-park2");
	const scoreKey = [1, 4, 2, 1, 4, 2, 1, 1, 4, 2, 1, 4, 2, 1];

	let matchData = [
        t1Balls,
        t1HighHang1.checked ? 1 : 0,
        t1LowHang1.checked ? 1 : 0,
        t1Park1.checked ? 1 : 0,
        t1HighHang2.checked ? 1 : 0,
        t1LowHang2.checked ? 1 : 0,
        t1Park2.checked ? 1 : 0,
        t2Balls,
        t2HighHang1.checked ? 1 : 0,
        t2LowHang1.checked ? 1 : 0,
        t2Park1.checked ? 1 : 0,
        t2HighHang2.checked ? 1 : 0,
        t2LowHang2.checked ? 1 : 0,
        t2Park2.checked ? 1 : 0
    ];


	matchData = matchData.map(function (currentElement) {
		return currentElement == "" ? 0 : parseInt(currentElement);
	});

	for(let i = 0; i < 7; i++) {
		score1 += matchData[i] * scoreKey[i];
	}

    for(let i = 6; i < 14; i++) {
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
	document.getElementById("t1-highHang1").checked = false;
	document.getElementById("t1-lowHang1").checked = false;
	document.getElementById("t1-park1").checked = false;
    document.getElementById("t1-highHang2").checked = false;
	document.getElementById("t1-lowHang2").checked = false;
	document.getElementById("t1-park2").checked = false;
	document.getElementById("t2-numBalls").value = "";
	document.getElementById("t2-highHang1").checked = false;
	document.getElementById("t2-lowHang1").checked = false;
	document.getElementById("t2-park1").checked = false;
    document.getElementById("t2-highHang2").checked = false;
	document.getElementById("t2-lowHang2").checked = false;
	document.getElementById("t2-park2").checked = false;
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
	const t1HighHang1 = document.getElementById("t1-highHang1");
	const t1LowHang1 = document.getElementById("t1-lowHang1");
	const t1Park1 = document.getElementById("t1-park1");
    const t1HighHang2 = document.getElementById("t1-highHang2");
	const t1LowHang2 = document.getElementById("t1-lowHang2");
	const t1Park2 = document.getElementById("t1-park2");
    const t2Balls = document.getElementById("t2-numBalls");
	const t2HighHang1 = document.getElementById("t2-highHang1");
	const t2LowHang1 = document.getElementById("t2-lowHang1");
	const t2Park1 = document.getElementById("t2-park1");
	const t2HighHang2 = document.getElementById("t2-highHang2");
	const t2LowHang2 = document.getElementById("t2-lowHang2");
	const t2Park2 = document.getElementById("t2-park2");

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

        t1HighHang1.addEventListener("change", () => calculateScores(t1HighHang1, 2));

        t1LowHang1.addEventListener("change", () => calculateScores(t1LowHang1, 2));

        t1Park1.addEventListener("change", () => calculateScores(t1Park1, 2));

        t1HighHang2.addEventListener("change", () => calculateScores(t1HighHang2, 2));

        t1LowHang2.addEventListener("change", () => calculateScores(t1LowHang2, 2));

        t1Park2.addEventListener("change", () => calculateScores(t1Park2, 2));

        t2Balls.addEventListener("keyup", () => calculateScores(t2Balls, 1));
        t2Balls.addEventListener("change", () => calculateScores(t2Balls, 1));

        t2HighHang1.addEventListener("change", () => calculateScores(t2HighHang1, 2));

        t2LowHang1.addEventListener("change", () => calculateScores(t2LowHang1, 2));

        t2Park1.addEventListener("change", () => calculateScores(t2Park1, 2));

        t2HighHang2.addEventListener("change", () => calculateScores(t2HighHang2, 2));

        t2LowHang2.addEventListener("change", () => calculateScores(t2LowHang2, 2));

        t2Park2.addEventListener("change", () => calculateScores(t2Park2, 2));

        //score buttons
        clearBtn.addEventListener("click", clearFields);
        timerSwitch.addEventListener("click", showTimer);
    }   
});

function check(input, className){
    
    var checkboxes = document.getElementsByClassName(className);
    
    // uncheck previosuly check button
    if(input.checked == false){
        input.checked = false;
    }
    else{   
        for(var i = 0; i < checkboxes.length; i++)
        {
            //uncheck all
            if(checkboxes[i].checked == true)
            {
                checkboxes[i].checked = false;
            }
        }

        input.checked = true;
    }	

}
