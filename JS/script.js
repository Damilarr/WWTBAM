let easyQuest = [{
    "category": "Entertainment: Video Games",
    "type": "multiple",
    "difficulty": "easy",
    "question": "What ingredient is NOT used to craft a cake in Minecraft?",
    "correct_answer": "Bread",
    "incorrect_answers": [
      "Wheat",
      "Milk",
      "Egg"
    ]
  },]
let mediQuest = []
let diffQuest = []
let randArray = []
let loaderArray= ['Initiallizing game resourses','Setting up environment','Finishing process, please wait...']
const easyUrl = 'https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple';
const mediUrl = 'https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple';
const diffUrl = 'https://opentdb.com/api.php?amount=10&difficulty=hard&type=multiple';
let choiceIndex = 0
let questIndex = 0
const questionBox = document.getElementById('questionBox')
const questionInput = document.getElementById('questionInp')
const loadStatus = document.getElementById('loadStatus')
const optionA = document.getElementById('optA')
const optionB = document.getElementById('optB')
const optionC = document.getElementById('optC')
const optionD = document.getElementById('optD')
let mp3=''
let chosenOption=''
let progress = 0;
let currentArr = ''
let prizeIndex = 14

function check() {
    if (window.innerWidth > 976 ) {
        questionBox.classList.remove('quest-box')
    }else{
        questionBox.classList.add('quest-box')
    }
}
function playStartTheme(){
    mp3 = new Audio('../audio/Main Theme.mp3')
    mp3.play()
}
setInterval(() => {
    check()    
}, 100);

async function getQuestions() {
    console.log('fetchinggg');
    let easyquestion = await fetch(easyUrl)
    let midquestion = await fetch(mediUrl)
    let diffquestion = await fetch(diffUrl)
    let resp = await easyquestion.json()
    let resp2 = await midquestion.json()
    let resp3 = await diffquestion.json()
    easyQuest.push(resp.results[0])
    mediQuest.push(resp2.results[0])
    diffQuest.push(resp3.results[0])
    showQuestions(easyQuest)
}
function randNum(){
    for (var a = [0, 1, 2, 3], i = a.length; i--; ) {
        var random = a.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
        randArray.push(random)
    }
}
function showQuestions(array){
    console.log('show quest')
    questionInput.innerHTML = array[questIndex].question
    let options = document.querySelectorAll('.optn')
    randNum()
    console.log(randArray,'randArray');
    options[randArray[0]].innerHTML= array[questIndex].incorrect_answers[0]
    options[randArray[1]].innerHTML= array[questIndex].incorrect_answers[1]
    options[randArray[2]].innerHTML= array[questIndex].incorrect_answers[2]
    options[randArray[3]].innerHTML= array[questIndex].correct_answer
    console.log(randArray,'randarr2');
    randArray=''
    randArray=[]
    console.log(randArray,'randarr3');
}
// display loader and fetch questions
function sort(){
    let progressUpdate = setInterval(() => {
        if (progress < 100){
            progress +=10
            document.getElementById('progBar').style.width=`${progress}%`
            document.getElementById('progBar').innerHTML=`${progress}%`
            if(progress >= 10 && progress < 50){
                loadStatus.innerHTML = loaderArray[0]
            }else if (progress >= 50 && progress < 90){
                loadStatus.innerHTML = loaderArray[1]
            }else{
                loadStatus.innerHTML = loaderArray[2]
            }
        }else{
            clearInterval(progressUpdate)
        }
    }, 1000);
    getQuestions()
   setTimeout(() => {
    document.querySelectorAll('.mainGame').forEach(element =>{
        element.classList.remove('hidden')
    })
    document.getElementById('skeleton').classList.add('hidden')
   }, 22000);
    playStartTheme()

}
sort()
// add eventlistener to option buttons
function btnListen(){
    document.querySelectorAll('.answerDiv').forEach(element =>{
        element.addEventListener('click',function(){
            console.log(element.querySelector('.optn').innerHTML);
            chosenOption = element.querySelector('.optn').innerHTML
            console.log(chosenOption,'chosenOption');
            setTimeout(() => {
                verifyChosen()    
            }, 1000);
            
        })
    })
    
    
}
btnListen()
// verify chosenanser
function verifyChosen() {
    currentArr = easyQuest
    if (chosenOption == easyQuest[questIndex].correct_answer ) {
        alert('correct')
        currentPrize('prize')
        // currentPrize('prize2')
    }else{
        alert('wrong')
    }
}
// increment prize
function currentPrize(id){
    let currStep = document.querySelectorAll(`#${id} p`)[prizeIndex]
    currStep.classList.remove('bg-active-step','text-white')
    currStep.classList.add('text-yellowCol')
    currStep.children[1].classList.remove('text-slate')
    prizeIndex--
    document.querySelectorAll(`#${id} p`)[prizeIndex].classList.add('bg-active-step','text-white')
    document.querySelectorAll(`#${id} p`)[prizeIndex].classList.remove('text-yellowCol')
    document.querySelectorAll(`#${id} p`)[prizeIndex].children[1].classList.add('text-slate')
}
