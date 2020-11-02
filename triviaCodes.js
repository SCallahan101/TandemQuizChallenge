
// Basic items
let score = 0;
let currentQuestion = 1;
let set = 0;

const setOfQuestions = JSON.parse(questions);
console.log(setOfQuestions);
const setOfTenQuestions = Shuffle(setOfQuestions);

// Start the Quiz
function startTheQuiz(){
    $("#startButton").click(function(){
        console.log('clicked');
        quizSetup();
    });
}
function quizSetup(){
    let firstTen = setOfTenQuestions.slice(0, 11);
    console.log("The set of 10 questions: " + JSON.stringify(firstTen));
    const part1 = firstTen[set].incorrect;
    const part2 = firstTen[set].correct;
    const part3 = part1.concat(part2);
    console.log(part3);
    let newPart = Shuffle(part3);
    console.log("new result: " + newPart);
    $("#startButton").hide();
    $(".quiz").html(`
    <form>
        <fieldset>
            <legend>${firstTen[set].question}</legend>
            <input type="radio" class="choice" name="selection" value="${newPart[0]}">
            <label for="choice">${newPart[0]}</label>
            <input type="radio" class="choice" name="selection" value="${newPart[1]}">
            <label for="choice">${newPart[1]}</label>
            <input type="radio" class="choice" name="selection" value="${newPart[2]}">
            <label for="choice">${newPart[2]}</label>
            <input type="radio" class="choice" name="selection" value="${newPart[3]}">
            <label for="choice">${newPart[3]}</label>
        </fieldset>
        <input type="submit" class="choiceSubmit" value="Submit my answer"></input>
    </form>
    <button id="nextButton">Next Question</button>
    <p id="result"></p>
    `);
    $('#nextButton').hide();
    $('#result').hide();
    $(".score").html(`
    <p>Your Score: ${score}</p>
    <p>Question number: ${currentQuestion} out of 10</p>
    `)
}

function Shuffle(questionData) {
    for(var j, x, i = questionData.length; i; j = parseInt(Math.random() * i), x = questionData[--i], questionData[i] = questionData[j], questionData[j] = x);
    return questionData;
};

// Quiz procedure
function submitTheAnswer(){
    $(".container").on('click', '.choiceSubmit', function(e){
        e.preventDefault();
        if($('form input[name=selection]').is(':checked')) {
            console.log('Selected choice has been submitted!');
            let val = $("form input[name=selection]:checked").val();
            console.log(val);
            rightOrWrongAnswers(val);
        $("#nextButton").show();
        } else{
            console.log('You have not picked any choice');
        }
    });
}
function rightOrWrongAnswers(choice){
    console.log('Choice: ' + choice + ' and the correct answer: ' + setOfTenQuestions[set].correct);
    if(choice === setOfTenQuestions[set].correct){
        $("#nextButton").show();
        score++;
        window.alert(`Congratulation, you got it right! The answer is ${setOfTenQuestions[set].correct}`);
    } else {
        $("#nextButton").show();
        window.alert(`Sorry, you got this one wrong! The correct answer is ${setOfTenQuestions[set].correct}`);
    }
}
function moveToNextQuestion(){
    $(".quiz").on('click', '#nextButton', function(e){
        e.preventDefault();
        console.log("Next button clicked");
        currentQuestion++
        let num = set++;
        console.log(num);
        let setOfQuestions = JSON.parse(questions);
        let nextQuestion = setOfQuestions[num];
        console.log("Next clicked and next batch of question worked" + nextQuestion);
        quizSetup();
        finalScore(currentQuestion);
    });
}
// Final Score
function finalScore(num){
    if(num === 11){
        console.log('quiz is done');
        let percentage = score * 10;
        $('.container').html(`
            <div class="endScore box">
                <p>Congratulation with finish the quiz</p>
                <p>${percentage}%</p>
                <button id="newQuizButton">Start a New Quiz</button>
            </div>
        `);
    } else{
        console.log('Not finish yet');
    };
}
function startNewQuiz(){
    $(".container").on('click', "#newQuizButton", function(e){
        e.preventDefault();
        console.log("restart clicked");
        location.reload(true);
    });
}


// functions
startTheQuiz();
submitTheAnswer();
moveToNextQuestion();
startNewQuiz();