var state = {
    quiz: [{
        Question: "What genre of Comedy do you enjoy?",
        choices: ["Satire", "Observational", "Alternative", "Improvisational "]
    }, {
        Question: "Which comedian are you most fimiliar with?",
        choices: ["Dave Chappelle", "Louis C.K", "Jim Gaffigan", "Robin Williams"]
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
    }],
    currentQuestion: -1,
    choices: [],
    recommend: undefined,
    currentQuestionChoice: function () {
        return this.choices[this.currentQuestion];
    },
    //created function to check if recommend is undefined
    hasRecommendations: function () {
        return this.recommend !== undefined;
    }
}