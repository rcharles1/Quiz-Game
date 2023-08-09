document.addEventListener("DOMContentLoaded", function() {
    
    const startButton = document.getElementById("start-btn")
    const nextButton = document.getElementById("next-btn")

    const questionContainerElement = document.getElementById("question-container")
    const questionElement = document.getElementById("question")
    const answerButtonsElement = document.getElementById("answer-buttons")

    let shuffledQuestions, correctQuestionIndex;
    let quizScore=0;

    startButton.addEventListener('click',startGame);

    nextButton.addEventListener('click', ()=>{
        correctQuestionIndex++;
        setNextQuestion();
    });

    function startGame(){
        startButton.classList.add('hide'); 
        shuffledQuestions=questions.sort(() =>Math.random() -0.5);
        correctQuestionIndex=0;
        questionContainerElement.classList.remove('hide');
        setNextQuestion();
        quizScore=0;
    }

    function setNextQuestion(){
        resetState();
        showQuestion(shuffledQuestions[correctQuestionIndex]);
    }

    function showQuestion(question){
        questionElement.innerText = question.question;
        question.answers.forEach((answers)=>{
            const button=document.createElement("button");
            button.innerText = answers.text;
            button.classList.add('btn');
            if (answers.correct){
                button.dataset.correct = answers.correct;
            }      
            button.addEventListener('click',selectAnswer);
            answerButtonsElement.appendChild(button);

        })
    }

    function resetState(){
        clearStatusClass(document.body);
        nextButton.classList.add("hide");
        while(answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }

    function selectAnswer(e){
        const selectedButton=e.target;
        const correct=selectedButton.dataset.correct;

        setStatusClass(document.body,correct);
        Array.from(answerButtonsElement.children).forEach((button)=>{
            setStatusClass(button, button.dataset.correct === true);
        })
        if (shuffledQuestions.length > correctQuestionIndex +1){
            nextButton.classList.remove("hide");
        }else{
            startButton.innerText = "Restart";
            startButton.classList.remove("hide");
        }
        if (selectedButton.dataset = correct){
            quizScore++ ;
        }
        document.getElementById("right-answers").innerText=quizScore;
    }

    function setStatusClass(Element, correct){
        clearStatusClass(Element);
        if (correct){
            Element.classList.add("correct");
        } else{
            Element.classList.add("wrong");
        }
    }

    function clearStatusClass(Element){
        Element.classList.remove("correct");
        Element.classList.remove("wrong");
    }

    const questions = [
        {
            question:'Which one of these is a JavaScript framework?',
            answers :[
                { text: 'Python', correct: false},
                { text: 'Django', correct: false},
                { text: 'React', correct: true},
                { text: 'Eclipse', correct: false}
            ],
        },
        {
            question:'Who is the prime minister of your Tanzania?',
            answers :[
                { text: 'Hon Mizengo Pinda', correct: false},
                { text: 'Dr.Samia Suluhu', correct: false},
                { text: 'Mahtma Gandhi', correct: false},
                { text: 'Kassim Majaliwa', correct: true}
            ],
        },
        {
            question:'What is 4*4?',
            answers :[
                { text: '4', correct: false},
                { text: '16', correct: true},
                { text: '8', correct: false},
                { text: '24', correct: false}
            ],
        },
    ]

});

