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

function nextQuestion(state) {
    var next = state.currentQuestion + 1;
    if (state.currentQuestion !== state.quiz.length - 1) {
        return next;
    } else {
        return false;
    }
}

function renderChoice(choice, index) {
    return (
        '<li>' +
        '<input type="radio" name="choices" value="' + index + '" required>' +
        '<label>' + choice + '</label>' +
        '</li>'
    )
}


function render() {
    var display = state.quiz[state.currentQuestion];
    $('.questions').text(display.questions);
    renderChoices(display.choices);
}

function renderChoices(choices) {
    var string = choices.map(renderChoice).join("");
    $('.choices').html(string);
}

