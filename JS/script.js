let easyQuest = [
  {
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "easy",
    question: "What ingredient is NOT used to craft a cake in Minecraft?",
    correct_answer: "Bread",
    incorrect_answers: ["Wheat", "Milk", "Egg"],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question: "In past times, what would a gentleman keep in his fob pocket?",
    correct_answer: "Watch",
    incorrect_answers: ["Money", "Keys", "Notebook"],
  },
  {
    category: "Entertainment: Books",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the name of the protagonist of J.D. Salinger&#039;s novel Catcher in the Rye?",
    correct_answer: "Holden Caulfield",
    incorrect_answers: ["Fletcher Christian", "Jay Gatsby", "Randall Flagg"],
  },
];
let friendArr = [
  "“Sorry! I know nothing about this topic. I really can’t help you. You’re on your own!”",
  "“Hi, I read something about this recently and am sure the correct answer is",
  "“Wow, I always joke about you being an idiot, and now you’ve proved me right!😅 The answer is",
  "“Intelligence isn’t your best feature, is it?😅 “Are you sure you read the question correctly? Because if you did, you’d know the correct answer is obviously",
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
let selectedIndex, correctIndex, timerUpdate, amtWon,wrong1,wrong2,wrong3;

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
  console.log(easyQuest[questIndex]);
  console.log(e.target);
  if (id =='lf3') {
   let  corOpt = optt.charAt(3);
    let randNo = rand()
    modalTitle.innerHTML = "Your Friend Says";
    modalBody.innerHTML = friendArr[randNo]+" "+ `${randNo >0?corOpt:''}`;
    `${randNo?document.querySelector('#grBtn').classList.add('hidden'):''}`
    document.getElementById("open").click()
  }else if (id=='lf2'){
    let pp =  []
    pp.push(...options);
    let wrongOptions = pp.filter(element => element.id != optt)
    for (let i = 0; i < wrongOptions.length - 1; i++) {
      let  wrongId = wrongOptions[i].id;
      document.getElementById(wrongId).innerHTML ='';
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
  console.log(winLose);
  winLose.play();
}
function OptionSelect() {
  opSound = new Audio("./audio/final_answer.mp3");
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
  console.log("fetchinggg");
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
  console.log(easyQuest.length, mediQuest.length, diffQuest.length, "lengths");
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
    console.log(mp3, "mp3333");
  }
}
function showQuestions(array) {
  console.log("show quest");
  questionInput.innerHTML = array[questIndex].question;
  randNum();
  console.log(randArray, "randArray");
  options[randArray[0]].innerHTML = array[questIndex].incorrect_answers[0];
  options[randArray[1]].innerHTML = array[questIndex].incorrect_answers[1];
  options[randArray[2]].innerHTML = array[questIndex].incorrect_answers[2];
  options[randArray[3]].innerHTML = array[questIndex].correct_answer;
  correctIndex = randArray[3];
  wrong1 = randArray[0];
  wrong2 = randArray[1];
  wrong3 = randArray[2];
  console.log(randArray, "randarr2");
  randArray = "";
  randArray = [];
  console.log(randArray, "randarr3");
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
  playStartTheme();
}
function setTimer() {
  if (timee > 0) {
    timee--;
    document.getElementById("timeLeft").innerHTML = timee;
    timerUpdate = setTimeout(() => {
      setTimer();
    }, 1000);
  } else {
    setPrizeValue()
    document.getElementById("open").click();
    resetAll();
  }
}
sort();
// add eventlistener to option buttons
function btnListen() {
  document.querySelectorAll(".answerDiv").forEach((element, i) => {
    element.addEventListener("click", function () {
      selectedIndex = i;
      console.log(element.querySelector(".optn").innerHTML);
      chosenOption = element.querySelector(".optn").innerHTML;
      console.log(chosenOption, "chosenOption");
      if (music == true) {
        mp3.pause();
        setTimeout(() => {
          mp3.play();
        }, 4000);
      }
      OptionSelect();
      setTimeout(() => {
        element.classList.add("answer-btn");
        verifyChosen();
      }, 4000);
    });
  });
}
btnListen();

// verify chosenanser
function verifyChosen() {
  if (questIndex < 4) {
    currentArr = easyQuest;
  } else if (questIndex >= 4 && questIndex < 10) {
    currentArr = mediQuest;
  } else if (questIndex >= 10) {
    currentArr = diffQuest;
  }
  document
    .querySelectorAll(".answerDiv")
    [correctIndex].classList.remove("answer-btn");
  document
    .querySelectorAll(".answerDiv")
    [correctIndex].classList.add("correct");
    console.log(timee);

  if (chosenOption == currentArr[questIndex].correct_answer && timee > 3) {
    // alert('correct')
    clearInterval(timerUpdate);
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
      document
        .querySelectorAll(".answerDiv")
        [selectedIndex].classList.add("answer-btn"); //create func and pass params to add and remove
      document
        .querySelectorAll(".answerDiv")
        [selectedIndex].classList.remove("correct");
      gameStartSound();
    }, 6000);
  } else {
    document
      .querySelectorAll(".answerDiv")
      [selectedIndex].classList.remove("answer-btn");
    document
      .querySelectorAll(".answerDiv")
      [selectedIndex].classList.add("wrong");
    if (music == true) {
      mp3.pause();
    }
    playWinOrLose("./audio/lose.mp3");
    setTimeout(() => {
      // document
      //   .querySelectorAll(".answerDiv")
      //   [selectedIndex].classList.add("answer-btn");
      // document
      //   .querySelectorAll(".answerDiv")
      //   [selectedIndex].classList.remove("wrong");
      // document
      //   .querySelectorAll(".answerDiv")
      //   [correctIndex].classList.add("answer-btn");
      // document
      //   .querySelectorAll(".answerDiv")
      //   [correctIndex].classList.remove("correct");
        setPrizeValue()
      document.getElementById("open").click();
      resetAll();
    }, 5000);
  }
}
// increment prize
function currentPrize(id, pIndex) {
  pIndex = pIndex - questIndex;
  console.log("starting pindex", pIndex);
  let currStep = document.querySelectorAll(`#${id} p`)[pIndex];
  currStep.classList.remove("bg-active-step", "text-white");
  currStep.classList.add("text-yellowCol");
  currStep.children[1].classList.remove("text-slate");
  console.log("b4 passing to this pindex", pIndex);
  // debugger;
  pIndex = pIndex - (0 + 1);
  console.log(pIndex, "pindex to remove");
  document
    .querySelectorAll(`#${id} p`)
    [pIndex].classList.add("bg-active-step", "text-white");
  // debugger
  document
    .querySelectorAll(`#${id} p`)
    [pIndex].classList.remove("text-yellowCol");
  document
    .querySelectorAll(`#${id} p`)
    [pIndex].children[1].classList.add("text-slate");
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
  console.log(prizeIndex);
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
  dialog.classList.add("hidden");
  overlay.classList.add("hidden");
});



//chart
function makeChart(){
//  try {
  // debugger
  // let options = document.querySelectorAll(".optn");
  console.log(options,wrong1,wrong2);
  let correcvt = (options[correctIndex].id)
  let wro1 = (options[wrong1].id)
  let wro2 = (options[wrong2].id)
  let wro3 = (options[wrong3].id)
  let op = []
  op.push(wro1.charAt('3'),wro2.charAt('3'),wro3.charAt('3'),correcvt.charAt('3'))
  console.log(op.sort());
  console.log(wro1,wro2,wro3,correcvt);
  console.log(op.indexOf(correcvt.charAt('3')));
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
      console.log(currsum,'curr');
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
