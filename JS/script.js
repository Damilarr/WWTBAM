let easyQuest = []
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
let progress = 0;

function check() {
    if (window.innerWidth > 976 ) {
        questionBox.classList.remove('quest-box')
    }else{
        questionBox.classList.add('quest-box')
    }
}
function playStartTheme(){
    mp3 = new Audio('/audio/Main Theme.mp3')
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
    mediQuest.push(resp2.results)
    diffQuest.push(resp3.results)
    showQuestions()
}
function randNum(){
    let randNo = Math.trunc(Math.random()*4)
    if (!randArray.includes(randNo)) {
        randArray.push(randNo)
        console.log('random num',randNo);
        return randNo;
    }else{
        randNum()
    }
}
function showQuestions(){
    console.log('show quest')
    questionInput.innerHTML = easyQuest[questIndex].question
    let options = document.querySelectorAll('.optn')
    console.log(options[1].innerHTML);
    options[randNum()].innerHTML= easyQuest[questIndex].incorrect_answers[0]
    options[randNum()].innerHTML= easyQuest[questIndex].incorrect_answers[1]
    options[randNum()].innerHTML= easyQuest[questIndex].incorrect_answers[2]
    options[randNum()].innerHTML= easyQuest[questIndex].correct_answer
   
        // debugger
        // console.log(element[2].innerHTML)
}
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
   }, 2000);
    playStartTheme()

}
sort()
