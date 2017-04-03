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
        Question: "",
        choices: []
    }, {
        Question: "",
        choices: []
    }, {
        Question: "",
        choices: []
    }, {
        Question: "",
        choices: []
    }, {
        Question: "",
        choices: []
    }, {
        Question: "",
        choices: []
    }, {
        Question: "",
        choices: []
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
        state.choices = choice;
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
    return (
        '<li>' +
        '<input type="radio" name="choices" value="' + index + '" required>' +
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
    }
    if (state.currentQuestionChoice() === undefined) {
        buttons.push(submitButtonTemplate);
        console.log('hi');
    }
    if (state.currentQuestionChoice() === undefined) {
        (buttons.push(nextButtonTemplate));
        console.log('hi2');
    }
    return buttons.join("");
}

//displays choices 
function renderChoices(choices) {
    var string = choices.map(renderChoice).join("");
    $('.choices').html(string);
}

//Begins the quiz 
function beginButtonHandler() {
    render();
    $('.beginButton').hide();
};


function submitButtonHandler() {
    var choice = $('input[name=choices]:checked').val();
    select(choice);

}


function goNextHandler() {
    goNext(state);
    render();
}

render();

