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

/* I need to create the last page of the quiz that 
gives the user a recommendation 
Your goal is to complete getting youtube results first 
without the interface(message me when done). 
And then put the interface on top of function is going 
to get this information.
*/

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
function match(arr) {
    return arr.reduce(function (acc, val, index) {
        if (val === state.choices[index]) {
            return acc += 1;
        }
        return acc;
    }, 0)
}

// recommendation is a array object
function bestMatch() {
    var recs = recommendation[0].choices;
    var matches = recommendation.map(function (recs) {
        return match(recs)
    })
    var clone = JSON.parse(JSON.stringify(state.choices));
    var max = clone.sort(function (a, b) {
        return a - b;
    })[0]
    var index = matches.indexOf(max);
    return recs[index];
}



// function bestMatch(){
//   var matches = variants.map(function(variant) { return calculateMatch(variant);

//   })

//   var clone = JSON.parse(JSON.stringify(example));
//   var max =  clone.sort(function(a,b) { return b - a;})[0]

//   var index = matches.indexOf(max);
//   return variants[index];

// }

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
    select(choice);
    render();


}


function goNextHandler() {
    goNext(state);
    render();
}

render();