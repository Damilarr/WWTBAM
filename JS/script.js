let easyQuest = [];
let friendArr = [
  "“Sorry! I know nothing about this topic. I really can’t help you. You’re on your own!”",
  "“Hi, I read something about this recently and am sure the correct answer is",
  "“Wow, I always joke about you being an idiot, and now you’ve proved me right!😅 The answer is",
  "“😅 “Are you sure you read the question correctly? Because if you did, you’d know the correct answer is obviously",
];
let mediQuest = [];
let diffQuest = [];
let randArray = [];
let loaderArray = [
  "Initiallizing game resourses",
  "Setting up environment",
  "Finishing process, please wait...",
];
const easyUrl =
  "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple";
const mediUrl =
  "https://opentdb.com/api.php?amount=20&difficulty=medium&type=multiple";
const diffUrl =
  "https://opentdb.com/api.php?amount=25&difficulty=hard&type=multiple";
let choiceIndex = 0;
let questIndex = 0;
let questIndex2 = 0;
let questIndex3 = 0;
let prizeIndex = 14;
let prizeIndex2 = 14;
let utterNCE = new SpeechSynthesisUtterance();
let options = document.querySelectorAll(".optn");
const questionBox = document.getElementById("questionBox");
const questionInput = document.getElementById("questionInp");
const loadStatus = document.getElementById("loadStatus");
const optionA = document.getElementById("optA");
const optionB = document.getElementById("optB");
const optionC = document.getElementById("optC");
const optionD = document.getElementById("optD");
const modalBody = document.getElementById("d-body");
const modalTitle = document.getElementById("d-title");

let mp3 = "";
let opSound = "";
let winLose = "";
let chosenOption = "";
let progress = 0;
let timee = 60;
let currentArr = "";
let music = false;
let verified = false;
let selectedIndex,timeUpSound,tmUp, correctIndex, timerUpdate, amtWon,wrong1,wrong2,wrong3;

// let prizeInterval = setInterval(() => {
//   setPrizeValue();
// }, 1000);

function setPrizeValue() {
  document.querySelector('#grBtn').classList.remove('hidden')
  if (questIndex < 4) {
    amtWon = 0;
    modalTitle.innerHTML = "Oops";
    modalBody.innerHTML = `You  won <span id="amtWon" class="font-bold text-yellow-600">$${amtWon} 😞!!!</span>.View the game rules using the button below if you haven't!!`;
  } else if (questIndex >= 4 && questIndex < 9) {
    amtWon = 1000;
    modalTitle.innerHTML = "Almost there.";
    modalBody.innerHTML = `You  won <span id="amtWon" class="font-bold text-yellow-600">$${amtWon} 🤩🤩!!!</span>.View the game rules using the button below if you haven't!!`;
  } else if (questIndex >= 9 && questIndex < 13) {
    amtWon = 32000;
    modalTitle.innerHTML = "Impressive!!";
    modalBody.innerHTML = `You  won <span id="amtWon" class="font-bold text-yellow-600">$${amtWon} 🤩🤩!!!</span>.View the game rules using the button below if you haven't!!`;
  } else if (questIndex == 13) {
    amtWon = 1000000;
    modalTitle.innerHTML = "Woah🤯🥶.";
    modalBody.innerHTML = `You  won <span id="amtWon" class="font-bold text-yellow-600">$${amtWon} ⭐!!!</span>.View the game rules using the button below if you haven't!!`;
  }
}
function lifeLines(){
  document.querySelectorAll('#lifelines button').forEach((element,i)=>{
    element.addEventListener('click',provideLifeLine)
  }); 
}
lifeLines()
function provideLifeLine(e){
  let id = e.target.id;
  let optt = options[correctIndex].id
  if (id =='lf3') {
   let  corOpt = optt.charAt(3);
    let randNo = rand()
    modalTitle.innerHTML = "Your Friend Says";
    modalBody.innerHTML = friendArr[randNo]+" "+ `${randNo >0?corOpt:''}`;
    `${randNo?document.querySelector('#grBtn').classList.add('hidden'):''}`
    utterNCE.text = (`${modalBody.innerHTML}`)
    document.getElementById("open").click()
	  speechSynthesis.speak(utterNCE)
  }else if (id=='lf2'){
    let lf2Sound = new Audio('./audio/50.mp3')
    let pp =  []
    pp.push(...options);
    let wrongOptions = pp.filter(element => element.id != optt)
    for (let i = 0; i < wrongOptions.length - 1; i++) {
      let  wrongId = wrongOptions[i].id;
      document.getElementById(wrongId).innerHTML ='';
    }
    if (music == true) {
      mp3.pause();
      lf2Sound.play()
      setTimeout(() => {
        mp3.play()
      }, 4000);
    }else{
      lf2Sound.play()
    }
  }else if (id == 'lf1'){
    modalTitle.innerHTML = 'Based on votes by the audience';
    modalBody.innerHTML = '<canvas id="myChart" style="width:100%;max-width:600px"></canvas>'
    document.getElementById("open").click()
    makeChart();
  }
  document.getElementById(id).classList.add('usedLine')
  document.getElementById(id).setAttribute('disabled','disabled');
}

// 
function rand(){
  return Math.trunc(Math.random() * friendArr.length)
}
function playWinOrLose(url) {
  winLose = new Audio(url);
  winLose.play();
}
function OptionSelect() {
  opSound = new Audio("./audio/final_answer.mp3");
  // opSound.volume = 1;
  opSound.play();
}
function check() {
  if (window.innerWidth > 976) {
    questionBox.classList.remove("quest-box");
  } else {
    questionBox.classList.add("quest-box");
  }
}
function playStartTheme() {
  mp3 = new Audio("./audio/Main Theme.mp3");
  mp3.currentTime = 8;
  mp3.play();
}
setInterval(() => {
  check();
}, 100);

async function getQuestions() {
  let easyquestion = await fetch(easyUrl);
  let resp = await easyquestion.json();
  easyQuest.push(...resp.results);
  showQuestions(easyQuest);
  //
  let midquestion = await fetch(mediUrl);
  let resp2 = await midquestion.json();
  mediQuest.push(...resp2.results);
  //
  let diffquestion = await fetch(diffUrl);
  let resp3 = await diffquestion.json();
  diffQuest.push(...resp3.results);
}
function randNum() {
  for (var a = [0, 1, 2, 3], i = a.length; i--; ) {
    var random = a.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
    randArray.push(random);
  }
}
function gameStartSound() {
  if (questIndex > 0 && music == false) {
    mp3 = new Audio("./audio/questions.mp3");
    // debugger
    music = true;
    mp3.play();
    mp3.loop = true;
  }
}
function showQuestions(array) {
  questionInput.innerHTML = array[questIndex].question;
  randNum();
  options[randArray[0]].innerHTML = array[questIndex].incorrect_answers[0];
  options[randArray[1]].innerHTML = array[questIndex].incorrect_answers[1];
  options[randArray[2]].innerHTML = array[questIndex].incorrect_answers[2];
  options[randArray[3]].innerHTML = array[questIndex].correct_answer;
  correctIndex = randArray[3];
  wrong1 = randArray[0];
  wrong2 = randArray[1];
  wrong3 = randArray[2];
  randArray = "";
  randArray = [];
  if (questIndex > 0) {
    if (timee < 60) {
      clearInterval(timerUpdate);
      timee = 60;
    }
    setTimer();
  }
}
// display loader and fetch questions
function sort() {
  let progressUpdate = setInterval(() => {
    if (progress < 100) {
      progress += 10;
      document.getElementById("progBar").style.width = `${progress}%`;
      document.getElementById("progBar").innerHTML = `${progress}%`;
      if (progress >= 10 && progress < 50) {
        loadStatus.innerHTML = loaderArray[0];
      } else if (progress >= 50 && progress < 90) {
        loadStatus.innerHTML = loaderArray[1];
      } else {
        loadStatus.innerHTML = loaderArray[2];
      }
    } else {
      clearInterval(progressUpdate);
    }
  }, 1000);
  getQuestions();
  setTimeout(() => {
    document.querySelectorAll(".mainGame").forEach((element) => {
      element.classList.remove("hidden");
    });
    document.getElementById("skeleton").classList.add("hidden");
  }, 22000);
}
function setTimer() {
  if (timee > 0) {
    timee--;
    document.getElementById("timeLeft").innerHTML = timee;
    timerUpdate = setTimeout(() => {
      setTimer();
    }, 1000);
  } else {
    timeUpSound  = new Audio('./audio/timeUp.mp3')
    tmUp = true;
    timeUpSound.play();
    timeUpSound.addEventListener('ended',playNext)
    setPrizeValue()
    document.getElementById("open").click();
    resetAll();
  }
}
function playNext(){
  mp3 = new Audio('./audio/applause.mp3')
  mp3.play()
  mp3.addEventListener('ended',()=>{
    mp3 = new Audio('./audio/short.mp3')
    mp3.play()
    mp3.loop = true;
  })
  
}
sort();
// add eventlistener to option buttons
function btnListen() {
  document.querySelectorAll(".answerDiv").forEach((element, i) => {
    element.addEventListener("click", function () {
      selectedIndex = i;
      chosenOption = element.querySelector(".optn").innerHTML;
      element.classList.remove("answer-btn");
      element.classList.add("answer-btn-clicked");
      if (music == true) {
        mp3.pause();
        setTimeout(() => {
          mp3.play();
        }, 4000);
      }
      OptionSelect();
      setTimeout(() => {
        // element.classList.add("answer-btn");
        verifyChosen();
      }, 4000);
    });
  });
}
btnListen();

// verify chosenanser
function verifyChosen() {
  clearInterval(timerUpdate);
  if (questIndex < 4) {
    currentArr = easyQuest;
  } else if (questIndex >= 4 && questIndex < 10) {
    currentArr = mediQuest;
  } else if (questIndex >= 10) {
    currentArr = diffQuest;
  }
  let corrAns= document.querySelectorAll(".answerDiv")[correctIndex]
  if (corrAns.classList.contains('answer-btn')) {
    corrAns.classList.remove("answer-btn");
  }else if(corrAns.classList.contains('answer-btn-clicked')){
    corrAns.classList.remove("answer-btn-clicked");
  }
  corrAns.classList.add('correct');
  
  if (chosenOption == currentArr[questIndex].correct_answer && timee > 3) {
    // alert('correct')
   
    if (music == true) {
      mp3.pause();
      setTimeout(() => {
        mp3.play();
      }, 6000);
    }
    playWinOrLose("./audio/win.mp3");
    currentPrize("prize", prizeIndex);
    currentPrize("prize2", prizeIndex2);
    setTimeout(() => {
      questIndex++;
      //next quest in array
      if (questIndex < 4) {
        showQuestions(easyQuest);
      } else if (questIndex >= 4 && questIndex < 10) {
        showQuestions(mediQuest);
      } else if (questIndex >= 10) {
        showQuestions(diffQuest);
      }
      document.querySelectorAll(".answerDiv")[selectedIndex].classList.remove("correct");
      document.querySelectorAll(".answerDiv")[selectedIndex].classList.add("answer-btn"); //create func and pass params to add and remove
      gameStartSound();
    }, 6000);
  } else {
    document.querySelectorAll(".answerDiv")[selectedIndex].classList.remove("answer-btn-clicked");
    document.querySelectorAll(".answerDiv")[selectedIndex].classList.add("wrong");
    if (music == true) {
      mp3.pause();
    }
    playWinOrLose("./audio/lose.mp3");
    setTimeout(() => {
        setPrizeValue()
      document.getElementById("open").click();
      resetAll();
    }, 5000);
  }
}
// increment prize
function currentPrize(id, pIndex) {
  pIndex = pIndex - questIndex;
  let currStep = document.querySelectorAll(`#${id} p`)[pIndex];
  currStep.classList.remove("bg-active-step", "text-white");
  currStep.classList.add("text-yellowCol");
  currStep.children[1].classList.remove("text-slate");
  pIndex = pIndex - (0 + 1);
  let newCurrStep = document.querySelectorAll(`#${id} p`)[pIndex]
  newCurrStep.classList.add("bg-active-step", "text-white",'font-bold');
  // debugger
  newCurrStep.classList.remove("text-yellowCol");
  newCurrStep.children[1].classList.add("text-slate");
  if (id == 'prize2') {
    newCurrStep.scrollIntoView();
  }
}
// reset everything to new
function resetAll() {
  resetPrize("prize");
  resetPrize("prize2");
  currentArr = "";
  easyQuest.length = 0;
  mediQuest.length = 0;
  diffQuest.length = 0;
  randArray.length = 0;
  timee = 60
  music = false;
  questIndex = 0;
  prizeIndex = 14;
  prizeIndex2 = 14;
  correctIndex = '';
  selectedIndex = '';
  timeUpSound =''
  wrong1='';
  wrong2='';
  wrong3='';
  document.querySelectorAll(".answerDiv").forEach(element =>{
    element.classList.remove('wrong')
    element.classList.remove('correct')   
    element.classList.add('answer-btn')   
  })
  getQuestions();
  document.querySelectorAll('#lifelines button').forEach((element,i)=>{
    document.getElementById(`${element.id}`).classList.remove('usedLine')
    document.getElementById(`${element.id}`).removeAttribute('disabled')
  });
}
function resetPrize(id) {
  mp3.pause();
  mp3.currentTime = 0;
  document
    .querySelectorAll(`#${id} p`)
    [prizeIndex - questIndex].classList.remove("bg-active-step", "text-white");
  document
    .querySelectorAll(`#${id} p`)
    [prizeIndex - questIndex].classList.add("text-yellowCol");
  document
    .querySelectorAll(`#${id} p`)
    [prizeIndex - questIndex].children[1].classList.remove("text-slate");
  document
    .querySelectorAll(`#${id} p`)[14]
    .classList.add("bg-active-step", "text-white");
  document.querySelectorAll(`#${id} p`)[14].classList.remove("text-yellowCol");
  document
    .querySelectorAll(`#${id} p`)[14]
    .children[1].classList.add("text-slate");
}

//modal
let openButton = document.getElementById("open");
let dialog = document.getElementById("dialog");
let closeButton = document.getElementById("close");
let overlay = document.getElementById("overlay");

// show the overlay and the dialog
openButton.addEventListener("click", function () {
  dialog.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

// hide the overlay and the dialog
closeButton.addEventListener("click", function () {
  if (tmUp == true) {
    tmUp=''
    mp3.pause()
    mp3.currentTime = 0
  }
  dialog.classList.add("hidden");
  overlay.classList.add("hidden");
});



//chart
function makeChart(){
//  try {
  // debugger
  // let options = document.querySelectorAll(".optn");
  let correcvt = (options[correctIndex].id)
  let wro1 = (options[wrong1].id)
  let wro2 = (options[wrong2].id)
  let wro3 = (options[wrong3].id)
  let op = []
  op.push(wro1.charAt('3'),wro2.charAt('3'),wro3.charAt('3'),correcvt.charAt('3'))
  let xValues = ["A", "B", "C", "D",];
  let yValues = [...generate(100,4)];
  let barColors = ["red", "green","blue","orange",];

  new Chart("myChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      legend: {display: false},
      title: {
        display: true,
        text: "Votes by Audience"
      }
    }
  });
//  } catch (error) {
  // alert(error)
//  }
}

// chart digits
function generate(max, thecount) {
  let r = [];
  let currsum = 0;
  let maxx;
  for(let i=0; i<thecount; i++) {
      r.push(Math.random());
      currsum += r[i];
  }
  for(let i=0; i<r.length; i++) {
      r[i] = Math.round(r[i] / currsum * max);
  }
  maxx = Math.max(...r);
  let correcvt = (options[correctIndex].id)
  let wro1 = (options[wrong1].id)
  let wro2 = (options[wrong2].id)
  let wro3 = (options[wrong3].id)
  let op = []
  op.push(wro1.charAt('3'),wro2.charAt('3'),wro3.charAt('3'),correcvt.charAt('3'))
  op.sort();
  let optId= op.indexOf(correcvt.charAt('3'));
  r.splice(r.indexOf(maxx),1);
  r.splice(optId,0,maxx)
  return r;

}
function starrt(){
  document.getElementById('playStart').click()
}
starrt()