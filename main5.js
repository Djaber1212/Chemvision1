let Quizdata=[
{
question:" What is the active ingredient in Iodine Solution?  " ,
options: ["Ethanol " , "  Potassium iodide", "Iodine", "  Purified water"],
correct:"Iodine",
},

{
    question:"What is the primary purpose of Zinc Oxide in Diaper Rash Cream?",
    options: [" Thickening agent ","Skin protectant"," Moisturizer ","   Solvent"],
    correct:" Skin protectant",
    },

    {
        question:"Which component in Glycerolated Starch Gel acts as the keratolytic agent?  ",
        options: ["Salicylic acid","  Starch","Glycerin ","Distilled water " ],
        correct:"Salicylic acid",
        },

        {
            question:"What role does Potassium iodide play in Iodine Solution?",
            options: ["Antiseptic"," Stabilizer/Solubilizer","  Thickener  "," Diluent  "],
            correct:" Stabilizer/Solubilizer",
            },

            {
                question:"What is the main use of Dakin's Solution?  ",
                options: ["  Treating warts  ","Wound cleansing and infection prevention  "," Treating diaper rash ","Keratitis treatment  "],
                correct:"Wound cleansing and infection prevention  ",
                },

                {
                    question:"In the Haloform reaction, which functional group is necessary for the reaction to occur? ",
                    options: [" CH₃CO group"," OH group ", "NH₂ group ", "C=O group"],
                    correct:"CH₃CO group",
                    },

                    {
                        question:"During Iodoform synthesis, which chemical acts as the carbonyl source? ",
                        options: [" Potassium iodide  ","Acetone  "," Bleach "," Distilled water " ],                      
                        correct: "Acetone ",
                        },

                        {
                            question:"What is the solvent used in the preparation of Dakin's Solution? ",
                            options: ["Ethanol ","Distilled water","Sodium carbonate  "," Bleach"],
                            correct:"Distilled water",
                            },

                            {
                                question:"In Diaper Rash Cream, why is Glycerin added? ",
                                options: [" Provides hydration and moisture "," Acts as a pH stabilizer ","Protects the skin "," Works as a thickener"  ],
                                correct:" Provides hydration and moisture ",
                                },

                                
                                    {
                                        question:"What is the function of Bleach in Dakin's Solution? ",
                                        options: [" Antimicrobial agent", "Oxidizing agent","Thickening agent"," Solvent" ],
                                        correct: "Antimicrobial agent ",
                                        },

                                        {
                                            question:"In Iodoform synthesis, what is the role of KI?",
                                            options:["Oxidizing agent","Catalyst for the reaction ", "Provides iodine for the reaction " ," Solvent for the reaction"],
                                            correct: "Provides iodine for the reaction ",
                                        },

                                      
                                            
];

const contquiz = document.querySelector(".contquiz");
const question = document.querySelector(" .contquiz .question") ;
const options = document.querySelector(".contquiz .options");
const nextbtn = document.querySelector(" .contquiz .nxt-btn");
const quizresult = document.querySelector(".Qres");
const strtbtncontainer = document.querySelector(".strt-btn-cont");
const strtbtn = document.querySelector(".strt-btn-cont .strt-btn");

let QuestionNumber=0;
let score =0;
const maxquestions=11;
let timerInterval;


const shuffleArray= (array) =>{
    return array.slice().sort(()=>Math.random()-0.5);

};


Quizdata=shuffleArray(Quizdata);

const resetLocalStorage = () => {
    for (i = 0; i <= maxquestions; i++) {
      localStorage.removeItem(`userAnswer_${i}`);
    }
  };

  resetLocalStorage();

const checkAnswer = (e) => {
  let userAnswer = e.target.textContent;
  if (userAnswer === Quizdata[QuestionNumber].correct) {
    score++;
    e.target.classList.add("correct");
  } else {
    e.target.classList.add("wrong");
  }

  localStorage.setItem(`userAnswer_${QuestionNumber}`, userAnswer);

  let allOptions = document.querySelectorAll(" .contquiz .option");
  allOptions.forEach((o) => {
    o.classList.add("disabled");
  });
};





const createquestion = () => {

    clearInterval(timerInterval);

    let secondsLeft = 30;

    const timerDisplay = document.querySelector(".contquiz  .timer");
    timerDisplay.classList.remove("danger");
  
    timerDisplay.textContent = `Time Left: 30 seconds`;
  
    timerInterval = setInterval(() => {
      timerDisplay.textContent = `Time Left: ${secondsLeft
        .toString()
        .padStart(2, "0")} seconds`;
      secondsLeft--;
  
      if (secondsLeft < 5) {
        timerDisplay.classList.add("danger");
      }
  
      if (secondsLeft < 0) {
        clearInterval(timerInterval);
        displayNextQuestion();
      }
    }, 1000);




    options.innerHTML= "";
   question.innerHTML =  `<span class='question-number'>${
    QuestionNumber+1
  }/${maxquestions}</span>${Quizdata[QuestionNumber].question}`;
 

const shuffledOptions = shuffleArray(Quizdata[QuestionNumber].options);


    shuffledOptions.forEach((o)=>{
     const option =document.createElement("button") ;
     option.classList.add("option") ;
     option.innerHTML=o;
     option.addEventListener("click" ,(e) =>{ checkAnswer (e);});
     options.appendChild(option) ;
    });
};

const retakeQuiz = () => {
    QuestionNumber = 0;
    score = 0;
    Quizdata = shuffleArray(Quizdata);
    resetLocalStorage();
  
    createquestion();
    quizresult.style.display = "none";
    contquiz.style.display = "block";
  };


const displayQuizResult =()=>{
    quizresult.style.display ="flex";
    contquiz.style.display="none";
    quizresult.innerHTML="";

    const resultHeading = document.createElement("h2");
  resultHeading.innerHTML = `You have scored ${score} out of ${maxquestions}.`;
  quizresult.appendChild(resultHeading);

  for (let i = 0; i < maxquestions; i++) {
    const resultItem = document.createElement("div");
    resultItem.classList.add("question-container");

    const userAnswer = localStorage.getItem(`userAnswer_${i}`);
    const correctAnswer = Quizdata[i].correct;

    let answeredCorrectly = userAnswer === correctAnswer;

    if (!answeredCorrectly) {
      resultItem.classList.add("wrong");
    }

    resultItem.innerHTML = `<div class="question">Question ${i + 1}: ${
      Quizdata[i].question
    }</div>
    <div class="user-answer">Your answer: ${userAnswer || "Not Answered"}</div>
    <div class="correct-answer">Correct answer: ${correctAnswer}</div>`;

    quizresult.appendChild(resultItem);
  }

  const retakeBtn = document.createElement("button");
  retakeBtn.classList.add("retake-btn");
  retakeBtn.innerHTML = "Retake Quiz";
  retakeBtn.addEventListener("click", retakeQuiz);
  quizresult.appendChild(retakeBtn);
};





const displayNextQuestion =()=>{
    if(QuestionNumber>=maxquestions-1){
        displayQuizResult();
        return;
    }

    QuestionNumber++;
    createquestion() ;

};
nextbtn.addEventListener("click" , displayNextQuestion);

strtbtn.addEventListener("click", () => {
    strtbtncontainer.style.display = "none";
    contquiz.style.display = "block";
    createquestion();
  });