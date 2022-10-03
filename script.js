const questionNumber = document.querySelector(".number")
const group1Name = document.querySelector(".group1 .groupName")
const group2Name = document.querySelector(".group2 .groupName")
const group1Item = document.querySelector(".group1 .groupItem")
const group2Item = document.querySelector(".group2 .groupItem")
const confrimButton = document.querySelector(".confrimButton")
const game = document.querySelector(".game")
const end = document.querySelector(".end")
const face = document.querySelector(".face")
const text = document.querySelector(".text")
const answer = document.querySelector(".answer")
const nextButton = document.querySelector(".nextButton")
const final = document.querySelector(".final")
const emoji = document.querySelector(".emoji")
const encouragment = document.querySelector(".encouragment")

let totalQuestion;
let current;
let choice;
let groupName;
let group1Answer;
let group1AnswerImage;
let group2Answer;
let group2AnswerImage;
let selectedBtn;
let gotRight;
let once;
let score;

var group1CurrentItem;
var group2CurrentItem;

let groups = [
    {name: "Main", 
    ingredient1Number: "1", ingredient1Image:"./img/ChickenRice.png",
    ingredient2Number: "2", ingredient2Image:"./img/Laksa.png",
    ingredient3Number: "3", ingredient3Image:"./img/NasiLemak.png"},

    {name: "Side", 
    ingredient1Number: "4", ingredient1Image:"./img/Otah.png",
    ingredient2Number: "5", ingredient2Image:"./img/ChickenFeet.png",
    ingredient3Number: "6", ingredient3Image:"./img/Satay.png"},

    {name: "Desert", 
    ingredient1Number: "7", ingredient1Image:"./img/IceCreamSandwich.png",
    ingredient2Number: "8", ingredient2Image:"./img/PandanCake.png",
    ingredient3Number: "9", ingredient3Image:"./img/IceKachang.png"},

    {name: "Kueh", 
    ingredient1Number: "10", ingredient1Image:"./img/AngKuKueh.png",
    ingredient2Number: "11", ingredient2Image:"./img/ChweeKueh.png",
    ingredient3Number: "12", ingredient3Image:"./img/HuatKueh.png"},

    {name: "Snack", 
    ingredient1Number: "13", ingredient1Image:"./img/IcedGemBiscuits.png",
    ingredient2Number: "14", ingredient2Image:"./img/HawFlakes.png",
    ingredient3Number: "15", ingredient3Image:"./img/CurryPuffs.png"}
]

Start()
Question()

function Start(){
    current = score = 0
    gotRight = once = false
    totalQuestion = Math.floor(Math.random() * 5) + 1;
    for(let i = 1; i < 5; i++){
        let btnclass = "btn" + i
        let currentButton = document.querySelector(`.${btnclass}`)

        currentButton.addEventListener("click", () => {
            data = currentButton.getAttribute("data")
            if(currentButton.classList.contains("done")){
                return
            }
            if(choice == data){
                choice = null
                selectedBtn = null
                currentButton.style.border = "" 
                return
            }
            else{
                if(selectedBtn != null){
                    selectedBtn.style.border =""
                }
                selectedBtn = currentButton
                choice = data
                console.log(selectedBtn, data)
                currentButton.style.border = "solid 5px black"
            }
        })
    }

    for(let i = 1; i < 3; i++){
        let groupclass = "group" + i
        let currentButton = document.querySelector(`.game .${groupclass}`)

        currentButton.addEventListener("click", () => { 
            if(i == 1){
                space = group1CurrentItem
                var pos = 1
            }
            if(i == 2){
                space = group2CurrentItem
                var pos = 3
            }

            let currentSpace
            if(space == 2 || selectedBtn == null){
                return
            }
            else{
            currentSpace = document.querySelector(`.${"choice" + (space + pos)}`)  
            currentSpace.src = selectedBtn.src
            currentSpace.setAttribute("data", selectedBtn.getAttribute("data"))
            selectedBtn.src = "./img/empty.png"
            selectedBtn.classList.add("done")
            selectedBtn.style.border = ""
            selectedBtn = null
            }
            if(i == 1)
            group1CurrentItem +=1
            if(i == 2)
            group2CurrentItem +=1
            group1Item.innerHTML = `${group1CurrentItem}/2`
            group2Item.innerHTML = `${group2CurrentItem}/2`
            Check()
        })
    }
}
function Question(){
    if(current == totalQuestion){
        game.classList.add("hide")
        final.classList.remove("hide");
        let pass = totalQuestion/2
        if(score == totalQuestion){
            emoji.src = "./img/foodMaster.png"
            encouragment.innerHTML = "You can become a food master."
        }
        else if(score >= pass){
            emoji.src = "./img/food.png"
            encouragment.innerHTML = "You know your foods."
        }
        else{
            emoji.src = "./img/tryAgain.png" 
            encouragment.innerHTML = "Try Again!"
        }
        return
    }

    current += 1;
    group1CurrentItem = group2CurrentItem = 0
    questionNumber.innerHTML = current + "/" + totalQuestion;
    
    group1Index = Math.floor(Math.random() * groups.length);
    group2Index = Math.floor(Math.random() * groups.length);

    selected1Index = Math.floor(Math.random() * 2) +1;
    selected2Index = Math.floor(Math.random() * 2) +1;

    for(let i = 0; i < 20; i++){
        if(group1Index == group2Index){
            group1Index = Math.floor(Math.random() * groups.length);
        }
        if(selected1Index == selected2Index){
            selected1Index = Math.floor(Math.random() * 3) + 1;
        }
    }

    selectedImage1 = "ingredient"+ selected1Index + "Image"
    selectedImage2 = "ingredient"+ selected2Index + "Image"

    selectedAnswer1 = "ingredient"+ selected1Index + "Number"
    selectedAnswer2 = "ingredient"+ selected2Index + "Number"

    group1Name.innerHTML = `${groups[group1Index].name}`
    group2Name.innerHTML = `${groups[group2Index].name}`
    group1Item.innerHTML = `${group1CurrentItem}/2`
    group2Item.innerHTML = `${group2CurrentItem}/2`

    groupName = [groups[group1Index].name, groups[group2Index].name]

    allGroupAnswerImage = [groups[group1Index][selectedImage1], groups[group1Index][selectedImage2],
                        groups[group2Index][selectedImage1], groups[group2Index][selectedImage2]]

    allGroupAnswer = [groups[group1Index][selectedAnswer1], groups[group1Index][selectedAnswer2],
                        groups[group2Index][selectedAnswer1], groups[group2Index][selectedAnswer2]]

    for(let o = 1; o < 3; o++){
        for(let y = 1; y < 3; y++){
        
        let currentGroup = window["group" + o +"Index"]
        let currentSelect = "selected" + y + "Index"
        let selectedImage = "ingredient" + window[currentSelect] + "Image"
        let selectedAnswer = "ingredient" + window[currentSelect] + "Number"

        let value = (Math.floor(Math.random() * 4) + 1)

        let btn = "btn" + value
        
        let optionButton = document.querySelector(`.${btn}`)
        if(optionButton.classList.contains("choice")){
            y--
        }
        if(!optionButton.classList.contains("choice")){
            optionButton.classList.add("choice")
            optionButton.setAttribute("data", groups[currentGroup][selectedAnswer])
            optionButton.src =  groups[currentGroup][selectedImage]
        }
        }
    }
}

function Check(){
    let check = document.querySelectorAll(".done")
    if(check.length == 4){
        confrimButton.classList.remove("hide")
    } 
}

confrimButton.addEventListener("click", () => { 
    for(let a=1; a<5;a++){
        let current = "choice" + a
            let optionButton = document.querySelector(`.${current}`)
            
            let answer = optionButton.getAttribute("data")
            if(a <3){
                if(answer == allGroupAnswer[0] || answer == allGroupAnswer[1]){
                    optionButton.classList.add("correct")
                }
            }
            if(a > 2){
                if(answer == allGroupAnswer[2] || answer == allGroupAnswer[3]){
                    optionButton.classList.add("correct")
                }
            }
    }
    end.classList.remove("hide")
    game.classList.add("hide")
    let result = document.querySelectorAll(".correct")
    if(result.length == 4){
        face.src="./img/happy.png"
        text.innerHTML="Correct!"
        answer.innerHTML = "Your answer:"
        score +=1
    }
    else{
        face.src="./img/angry.png"
        text.innerHTML="Try Again!"
        answer.innerHTML = "Right answer:"
    }
    let done = document.querySelectorAll(".done")
    done.forEach(function(item){
        item.classList.remove("correct")
        item.classList.remove("done")
        item.classList.remove("choice")
    })

    group1EndName = document.querySelector(".end .group1 .groupName")
    group2EndName = document.querySelector(".end .group2 .groupName")
    
    group1EndName.innerHTML = groupName[0]
    group2EndName.innerHTML =  groupName[1]

   for(let k =0; k<4; k++){
    let currentClass = "choice" + (k + 1)
    let currentAnswer = document.querySelector(`.end .${currentClass}`)
    currentAnswer.src = allGroupAnswerImage[k]

    let removeGameAnswer = document.querySelector(`.game .${currentClass}`)
    removeGameAnswer.src = "./img/empty.png"
   }
})

nextButton.addEventListener("click", () => { 
    end.classList.add("hide")
    game.classList.remove("hide")
    confrimButton.classList.add("hide")
    Question()
})