# Introduction #
As of version 0.3a, the plugin has been made a bit more object-oriented. (as much as Javascript will allow, since it is prototype-oriented) As such, there are now some internal methods that will be exposed to the user in order to make more flexible implementations of the Wizard.

# How to call upon these methods #
After instantiating jWizard
```
$([wizard_selector]).jWizard([options]);
```

To call an individual method:
```
$([wizard_selector]).data('jWizard').changeStep(3);
```

You can also store the jWizard object into a variable to make multiple references:
```
var jWizard = $([wizard_selector]).data('jWizard');
jWizard.changeStep(3);
jWizard.changeStep(jWizard.itemCount - 1);
jWizard.changeStep($([step_selector]));
```

# The Methods #
| Method Name | Parameters | Description | Returns |
|:------------|:-----------|:------------|:--------|
| changeStep() | (jQuery/int) nextStep **required** | Programmatically set the current step of the Wizard (with either a jQuery object or an index) | void    |