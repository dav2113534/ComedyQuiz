var state = {
    quiz: [{
        "Question": "What genre of Comedy do you enjoy?",
        "choices": ["Satire", "Observational", "Alternative", "Anecdotal"]
    }, {
        "Question": "Which comedian are you most fimiliar with?",
        "choices": ["Dave Chappelle", "Louis C.K", "Gabriel Iglesias", "Aziz Ansari"]
    }, {
        "Question": "",
        "choices": []
    }, {
        "Question": "",
        "choices": []
    }, {
        "Question": "",
        "choices": []
    }, {
        "Question": "",
        "choices": []
    }, {
        "Question": "",
        "choices": []
    }, {
        "Question": "",
        "choices": []
    }, {
        "Question": "",
        "choices": []
    }, {
        "Question": "",
        "choices": []
    }],
    currentQuestion: 0,
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
    $('.questions').text(display.question);
    renderChoices(display.choices);
}

//displays choices 
function renderChoices(choices) {
    var string = choices.map(renderChoice).join("");
    $('.choices').html(string);
}

$('.beginButton').click(function (x) {
    render();
})

//respond to the user choice selection
$('.submitButton').click(function (x) {
    var choice = $('input[name=choices]:checked').val();
    select(choice);
})