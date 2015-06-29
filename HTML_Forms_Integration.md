# HTML Forms Integration #
Requirements:
  * Set the configuration option 'finishButtonType' to 'submit' (this will change the 'type' attribute on the `<button>` tag and causes it to behave like a submit button.
  * Nest your Wizard `<div>` inside your `<form>` tags. (See example below)

## HTML ##
```
<form method="post" action="test.php">

<div id="jWizard">
   <div id="step1" title="Test Step #1"></div>
   <div id="step2" title="Test Step #2"></div>
   <div id="step3" title="Test Step #3"></div>
   <div id="step4" title="Test Step #4"></div>
   <div id="finalStep" title="Test Final Step"></div>
</div>

</form>
```

## JS ##
```
$('#jWizard').jWizard({
   finishButtonType: 'submit'
});
```