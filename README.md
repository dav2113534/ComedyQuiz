Feedback 
-submit button should go to the next question rather then have a next button after the user hits submit
-UI too bland 
-Disabling the checkboxes after the user has selected and submitted an answer might not be necessary. It kinda add an extra step
-NextQuestion() and goNext() seems unnecessary deplication.
-recommend you don't add your event listeners in your `render` function -- they will be added on every `render` invocation and start eating memory and create weird side effects.  use *event delegation* to place your listeners on root level HTML nodes on app initialization.
-Your radios do not appear to have `<label>`s. Remember that the expected behavior when a user clicks on a label is for the corresponding radio to be selected
-Consider reducing the number of clicks it takes to go from question to question. Right now it takes one click to select an answer, another to submit, and another to move on. Those final clicks could probably be condensed into one action.
 Lock conversation


4-24-2017 
-Add something playful for the buttons to bring it to life.
-Make responsive for mobile 
-Add api to display recommendation videos from youtube
-Need to video to fill screen


