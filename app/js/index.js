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


//Determines the next question and returns false if not
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
    } else {
        state.done = true;
       
    }
    render();
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
        '<ul>' + '<label>' +
        '<input type="radio"' + disabled + ' name="choices" ' + checked + ' value="' + index + '" required>' +
        choice + '</label>' +
        '</ul>'
    )
}

//displays questions 
function render() {
    var display = state.quiz[state.currentQuestion];
    if (display !== undefined) {
        $('.questions').text(display.Question);
        renderChoices(display.choices);
    }

    if (state.done && !state.hasRecommendations()) {
        state.recommend = bestMatch(state.choices);
        render();
    } else if (state.hasRecommendations()) {
        renderRecommendations(state);
        $('.questions').hide();
        $('.choices').hide();
    }

    $('.buttons').html(renderButton(state));
    $('.beginButton').click(beginButtonHandler);
    $('.submitButton').click(submitButtonHandler);
    $('.finishButton').click(finishHandler);


}
var beginButtonTemplate = '<input class="beginButton" type="button" value="Begin">';
var submitButtonTemplate = '<input class="submitButton" type="button" value="Submit">';
var finishButtonTemplate = '<input class="finishButton" type="button" value="Finish">';

function renderButton(state) {
    var buttons = [];

    if (state.currentQuestion === -1) {
        buttons.push(beginButtonTemplate);
    } else if (state.currentQuestionChoice() === undefined) {
        buttons.push(submitButtonTemplate);

    } else if (state.hasRecommendations()) {
        buttons.push(finishButtonTemplate)
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




function renderRecommendations(state) {
    return $('.recommendation').text(state.recommend.name + " is someone you should check out!");

}



// displays choices

function renderChoices(choices) {
    var string = choices.map(renderChoice).join("");
    $('.choices').html(string);

}

//Begins the quiz 
function beginButtonHandler() {
    $('header').hide();
    $('.intro').hide();
    goNext(state);
    render();



};


function submitButtonHandler() {
    var choice = $('input[name=choices]:checked').val();
    if (choice !== undefined) {
        select(choice);
        goNext(state);


    }
    render();


}

function finishHandler() {
    getDataFromApi(displayData);

}

function recommendHandler() {
    render();

}

render();

/* Test Functions */
function setChoicesForLouiseCK() {
    state.choices = recommendation[0].choices;
    state.currentQuestion = state.quiz.length - 1;
    state.done = true;
    render();
}

//will gather videos from youtube that the user would enjoy
//based on their answer from quiz

var youtubeUrl = "https://www.googleapis.com/youtube/v3/search";

function getDataFromApi(callback) {
    var comedian = state.recommend.name;
    var getJson = {
        part: 'snippet',
        key: 'AIzaSyCxu-HaWg7nUN9KkUD3ozKgOQdZHU3Pyy0',
        q: comedian,
        type: "video"
    }
    $.getJSON(youtubeUrl, getJson, callback)
}


function displayData(data) {


    if (data.items) {
        var result = data.items.map(function (item) {

            var video = item.id.videoId;
            return '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + video + '" frameborder="0" allowfullscreen></iframe>' +
                item.snippet.title;
        }).join('');
    } else {
        result += '<p> No Results</p>';
    }
    $('.recommendation').html(result);
}