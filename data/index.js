class BloodTest {
  testName
  testTime // in sec
  constructor(testName = "None", testTime = 0) {
    this.testName = testName
    this.testTime = testTime
  }
}

const NONE = new BloodTest("None", 0)
const DISEASE_1 = new BloodTest("MDS TEST", 1000)
const DISEASE_2 = new BloodTest("AML TEST", 2000)
const DISEASE_3 = new BloodTest("Disease 3", 62)
const DISEASE_4 = new BloodTest("Disease 4", 32)
const DISEASE_5 = new BloodTest("Disease 5", 20)
const DISEASE_6 = new BloodTest("Disease 6", 20)
const DISEASE_7 = new BloodTest("Disease 7", 20)
const DISEASE_8 = new BloodTest("Disease 8", 20)
const DISEASE_9 = new BloodTest("Disease 9", 10)

let case_1 = new BloodTest();
let case_2 = new BloodTest();
let case_3 = new BloodTest();
let case_4 = new BloodTest();
let case_5 = new BloodTest();

const ALL_TEST = [NONE, DISEASE_1, DISEASE_2, DISEASE_3, DISEASE_4, DISEASE_5,
  DISEASE_6, DISEASE_7, DISEASE_8, DISEASE_9]

const CASES = [case_1, case_2, case_3, case_4, case_5]

let selectedCase;

function openNav(caseIndex) {
  //document.getElementById("test-selector").style.display = "block";
  document.getElementById("test-selector").style.right = "0";
  document.getElementById("overlay").style.display = "block";
  selectedCase = caseIndex;
}

function closeNav() {
  //document.getElementById("test-selector").style.display = "none";
  document.getElementById("test-selector").style.right = "-80%";
  document.getElementById("overlay").style.display = "none";
}



function changeCard(testIndex) {
  let card = document.getElementById(`${selectedCase}`)
  let subtitle = document.getElementById(`${selectedCase}-subtitle`)
  let title = document.getElementById(`${selectedCase}-title`)

  CASES[selectedCase] = ALL_TEST[testIndex];
  if (testIndex == 0) {
    card.classList.remove("-active")
    subtitle.innerHTML = "CHOOSE YOUR CASE"
    title.innerHTML = `CASE ${selectedCase + 1}`

  } else {
    card.classList.add("-active")
    subtitle.innerHTML = `CASE ${selectedCase + 1}`
    title.innerHTML = ALL_TEST[testIndex].testName
  }
  closeNav();
}

let maxTime;
let objJson;

async function send(obj) {
  try {
    const response = await fetch("http://smart-pipette.local/start", {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("Request failed - check the console");
    console.error(error);
  }
}

function start() {
  maxTime = Math.max(CASES[0].testTime, CASES[1].testTime, CASES[2].testTime,
    CASES[3].testTime, CASES[4].testTime)
  console.log("Test Time", maxTime)
  console.log("CAESE", CASES)

  objJson = {
    time: maxTime,
    case_1: CASES[0].testName,
    case_2: CASES[1].testName,
    case_3: CASES[2].testName,
    case_4: CASES[3].testName,
    case_5: CASES[4].testName,
  };
  send(objJson);
  document.getElementById("testing").style.width = "100%"
  timer(maxTime);
  bar(document.getElementById("progress-bar"), maxTime);
  


}

function timer(testTime, bar) {

  var endDate = new Date();
  var startDate = new Date();
  endDate.setSeconds(endDate.getSeconds() + testTime);
  var endTime = endDate.getTime();
  document.getElementById("start").innerHTML = startDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  document.getElementById("end").innerHTML = endDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

  // Update the count down every 1 second
  var x = setInterval(function () {

    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = endTime - now;

    // Time calculations for days, hours, minutes and seconds
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    var hoursString = (hours < 10) ? "0" + hours : "" + hours;
    var minutesString = (minutes < 10) ? "0" + minutes : "" + minutes;
    var secondsString = (seconds < 10) ? "0" + seconds : "" + seconds;

    // Display the result

    document.getElementById("timer").innerHTML = hoursString + ":"
      + minutesString + ":" + secondsString;

    if (distance < 0) {
      clearInterval(x);
      document.getElementById("timer").innerHTML = "00:00:00";
      openCompleted();
    }
  }, 1000);
}

function openCompleted(){
  document.getElementById("completed").style.width = "100%"
  document.getElementById("testing").style.width = "0%"
}

function closeCompleted(){
  location.reload();

}


function bar(id, time) {
  var bar = new ProgressBar.Circle(id, {
    strokeWidth: 10,
    easing: 'easeInOut',
    duration: time*1000,
    color: '#2F80ED',
    trailColor: '#E3E7EB',
    trailWidth: 10,
    svgStyle: null
  });

  bar.animate(1);

}


