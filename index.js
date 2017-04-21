//Saves choices 
function select(choice) {
    var choiceAlreadySelected = state.currentQuestionChoice() !== undefined;
    if (choiceAlreadySelected) {
        return false;
    } else {
        state.choices[state.currentQuestion] = parseInt(choice);
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
        //this needs to display the recommendations
        //after the quiz is complete
        // TODO: Make sure that current question is not set to last question
        //Change the state and not the UI 

        console.log("are you working")
        state.recommend = bestMatch(state.choices);
        //not displaying recommendations 
        state.recommend;
        renderRecommendations(state);
        console.log("hi")
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
    } else if (state.hasRecommendations()) {
        $('.recommendation').text(renderRecommendations(state));
    }

    $('.buttons').html(renderButton(state));
    $('.beginButton').click(beginButtonHandler);
    $('.submitButton').click(submitButtonHandler);
    $('.nextButton').click(goNextHandler);
    $('.finishButton').click(recommendHandler)


}
var beginButtonTemplate = '<input class="beginButton" type="button" value="Begin">';
var submitButtonTemplate = '<input class="submitButton" type="button" value="Submit">';
var nextButtonTemplate = '<input class="nextButton" type="button" value="Next">';
var finishButtonTemplate = '<input class="finishButton" type="button" value="Finish">';

function renderButton(state) {
    var buttons = [];

    if (state.currentQuestion === -1) {
        buttons.push(beginButtonTemplate);
    } else if (state.currentQuestionChoice() === undefined) {
        buttons.push(submitButtonTemplate);

    } else if (state.hasRecommendations()) {
        buttons.push(finishButtonTemplate)
    } else {
        (buttons.push(nextButtonTemplate));
    }
    return buttons.join("");
}



var recommendation = [{
    name: "Louis C.K",
    choices: [1, 1, 2, 0, 1, 0, 1, 1, 1],
}, {
    name: "Dave Chapelle",
    choices: [0, 0, 1, 0, 1, 0, 1, 1, 1]
}, {
    name: "Jim Gaffigan",
    choices: [1, 2, 2, 1, 0, 1, 0, 0, 0]
}, {
    name: "Robin Williams",
    choices: [3, 3, 1, 0, 1, 0, 1, 0, 1]
}];

//compares choices array to recommendation array
function match(recommendation, choices) {
    return recommendation.choices.reduce(function (acc, val, index) {
        if (val === choices[index]) {
            return acc += 1;
        }
        return acc;
    }, 0)
}

// recommendation is a array object
function bestMatch(choices) {
    var matchChoices = function (arr) {
        return match(arr, choices);
    };
    var matches = recommendation.map(matchChoices);

    var clone = JSON.parse(JSON.stringify(matches));
    var max = clone.sort(function (a, b) {
        return b - a;
    })[0]
    var index = matches.indexOf(max);
    return recommendation[index];
}




function renderRecommendations(state, choices) {
    return $('.recommendation').text(state.recommend.name + " is someone you should check out!");

}



// var youtubeUrl = "https://www.googleapis.com/youtube/v3/search";

// function getDataFromApi(query, callback) {
//     var getJson = {
//         part: "snippet",
//         key: "AIzaSyCxu-HaWg7nUN9KkUD3ozKgOQdZHU3Pyy0",
//         q: ""
//     }
//     $.getJSON(youtubeUrl, getJson, callback)
// }


// displays choices

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
    if (choice !== undefined) {
        select(choice);
    }
    render();


}

function recommendHandler() {
    // bestMatch();
    render();

}


function goNextHandler() {
    goNext(state);
    render();
}

render();