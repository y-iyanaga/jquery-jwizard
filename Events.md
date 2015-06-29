# jWizard Events #
jQuery has the awesome capability of binding custom events to page elements. This capability has already been extended to end-users via the options "onFinish" and "onCancel". Now, each step can have an "onActivate" and "onDeactivate" event binded to them, allowing you to intercept step changes.

## Short Descriptions of all the custom events fired in jWizard ##
| **Event Type** | **Applies to** | **How to Initialize** | **Triggered by** |
|:---------------|:---------------|:----------------------|:-----------------|
| onFinish       | jWizard itself | This is initialized at the same time as jWizard (see configuration options) | Once the user has clicked the "Finish" button at the end of the wizard. |
| onCancel       | jWizard itself | This is initialized at the same time as jWizard (see configuration options) | Once the user has clicked the "Cancel" button at any point during the wizard. |
| onStepChange _(DEPRECATED)_ | N/A            | N/A                   | N/A              |
| onActivate     | Steps within jWizard | Using jQuery's "bind" method (see example below) | Immediately after the step is displayed to the user. (After clicking either the "Previous" or "Next" buttons) |
| onDeactivate   | Steps within jWizard | Using jQuery's "bind" method (see example below) | Immediately before the step is hidden from the user. (After clicking either the "Previous" or "Next" buttons) |

## Binding "onActivate" and "onDeactivate" to jWizard Steps ##
Refer to jQuery's [documentation on events](http://docs.jquery.com/Events) for further information beyond the scope of this brief explanation.
To bind an "onActivate" or "onDeactivate" event to a step, simply call jQuery's bind method on the appropriate step. For example:
```
$('#step1').bind('onDeactivate', function(e) {
	alert('Step 1 Deactivated');
});
$('#step3').bind('onActivate', function(e) {
	alert('Step 3 Activated');
});
```