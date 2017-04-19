Feedback 
-submit button should go to the next question rather then have a next button after the user hits submit
-UI too bland 
-Disabling the checkboxes after the user has selected and submitted an answer might not be necessary. It kinda add an extra step
-NextQuestion() and goNext() seems unnecessary deplication.
-recommend you don't add your event listeners in your `render` function -- they will be added on every `render` invocation and start eating memory and create weird side effects.  use *event delegation* to place your listeners on root level HTML nodes on app initialization.
-maybe 