var state = {
    quiz: [{
        "Questions": "What genre of Comedy do you enjoy?",
        "choices": ["Satire", "Observational", "Alternative", "Anecdotal"]
    }, {
        "Questions": "Which comedian are you most fimiliar with?",
        "choices": ["Dave Chappelle", "Louis C.K", "Gabriel Iglesias", "Aziz Ansari"]
    }, {
        "Questions": "",
        "choices": []
    }, {
        "Questions": "",
        "choices": []
    }, {
        "Questions": "",
        "choices": []
    }, {
        "Questions": "",
        "choices": []
    }, {
        "Questions": "",
        "choices": []
    }, {
        "Questions": "",
        "choices": []
    }, {
        "Questions": "",
        "choices": []
    }, {
        "Questions": "",
        "choices": []
    }],
    currentQuestion: 0,
    choices: {},
    currentQuestionChoice: function () {
        return this.choices[this.currentQuestion];
    }

}

//Saves choices 
var selected = function select(choice) {
    var choiceAlreadySelected = state.currentQuestionChoice() !== undefined;
    if (choiceAlreadySelected) {
        return false;
    } else {
        state.choices[state.currentQuestion] = choice;
        state.choices = choice;
    }
}

var nextQ = function nextQuestion(state) {
    var next = state.currentQuestion + 1;
    if (state.currentQuestion !== state.quiz.length - 1) {
        return next;
    } else {
        return false;
    }
}