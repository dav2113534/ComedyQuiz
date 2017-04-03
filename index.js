var state = {
    quiz: [{
        Question: "What genre of Comedy do you enjoy?",
        choices: ["Satire", "Observational", "Alternative", "Anecdotal"]
    }, {
        Question: "Which comedian are you most fimiliar with?",
        choices: ["Dave Chappelle", "Louis C.K", "Gabriel Iglesias", "Aziz Ansari"]
    }, {
        Question: "Which subjects would you consider to be funny",
        choices: ["Personal Stories", "Stereotypes", "Everyday Life", "Insults"]
    }, {
        Question: "Do you enjoy crude humor?",
        choices: ["Yes", "No"]
    }, {
        Question: "Do you prefer clean or dirty comedy?",
        choices: ["Clean", "Dirty"]
    }, {
        Question: "Would you enjoy political humor?",
        choices: ["Yes", "No"]
    }, {
        Question: "How do you feel about racial sterotypes?",
        choices: ["Don't like em", "Don't mind it"]
    }, {
        Question: "Do you enjoy improv?",
        choices: ["Yes", "No"]
    }, {
        Question: "Do you enjoy both music and comedy",
        choices: ["Yes", "No"]
    }],
    currentQuestion: -1,
    choices: {},
    currentQuestionChoice: function () {
        return this.choices[this.currentQuestion];
    }

}

//Saves choices 
function select(choice) {
    var choiceAlreadySelected = state.currentQuestionChoice() !== undefined;
    if (choiceAlreadySelected) {
        return false;
    } else {
        state.choices[state.currentQuestion] = choice;
        console.log("choice saved")
    }
}


//Goes to the next question 
function nextQuestion(state) {
    var next = state.currentQuestion + 1;
    if (state.currentQuestion !== state.quiz.length - 1) {
        return next;
    } else {
        return false;
    }
}


//Goes to next question 
function goNext(state) {
    var next = nextQuestion(state);
    if (next !== false) {
        state.currentQuestion = next;
        render();
    } else {
        console.log("its done")
    }
}

//creates the check boxes for choices 
function renderChoice(choice, index) {
    var checked = '';
    if (state.currentQuestionChoice() === index.toString()) {
        checked = 'checked = checked';
    }
    var disabled = '';

    if (state.currentQuestionChoice() !== undefined) {
        disabled = 'disabled';

    }
    return (
        '<li>' +
        '<input type="radio"' + disabled + ' name="choices" ' + checked + ' value="' + index + '" required>' +
        '<label>' + choice + '</label>' +
        '</li>'
    )
}

//displays questions 
function render() {
    var display = state.quiz[state.currentQuestion];
    if (display !== undefined) {
        $('.questions').text(display.Question);
        renderChoices(display.choices);
    }
    $('.buttons').html(renderButton(state));
    $('.beginButton').click(beginButtonHandler);
    $('.submitButton').click(submitButtonHandler);
    $('.nextButton').click(goNextHandler);
}
var beginButtonTemplate = '<input class="beginButton" type="button" value="Begin">';
var submitButtonTemplate = '<input class="submitButton" type="button" value="Submit">';
var nextButtonTemplate = '<input class="nextButton" type="button" value="Next">';

function renderButton(state) {
    var buttons = [];
    //check this out 
    if (state.currentQuestion === -1) {
        buttons.push(beginButtonTemplate);
    } else if (state.currentQuestionChoice() === undefined) {
        buttons.push(submitButtonTemplate);

    } else {
        (buttons.push(nextButtonTemplate));
    }
    return buttons.join("");
}

//I need to create the last page of the quiz that 
//gives the user a recommendation

// function final(){
//     var complete = state.quiz[]
// }



//displays choices 
function renderChoices(choices) {
    var string = choices.map(renderChoice).join("");
    $('.choices').html(string);

}

//Begins the quiz 
function beginButtonHandler() {
    goNext(state);
    render();


};


function submitButtonHandler() {
    var choice = $('input[name=choices]:checked').val();
    select(choice);
    render();


}


function goNextHandler() {
    goNext(state);
    render();
}

render();