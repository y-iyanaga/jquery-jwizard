# Javascript Definition of Default Values #
```
var defaults = {
	startStep: 0,
	enableThemeRoller: false,
	hideTitle: false,

	counter: {
		enable: false,
		type: 'count',
		excludeStart: false,
		hideStart: false,
		excludeFinish: false,
		hideFinish: false
	},

	/* Button Rules */
	hideCancelButton: false,
	finishButtonType: 'button',
	buttonText: {
		cancel: 'Cancel',
		previous: 'Previous',
		next: 'Next',
		finish: 'Finish'
	},

	/* Menu Rules */
	enableMenu: false,
	menuWidth: '10em',

	/* CSS Classes */
	cssClasses: {
		title: 'title',
		menu: {
			div: 'menu',
			active: 'active',
			current: 'current',
			inactive: 'inactive'
		},
		steps: {
			wrapper: 'stepwrapper',
			all: 'step'
		},
		counter: 'counter',
		buttons: {
			div: 'buttons',
			cancel: 'wizardButton',
			previous: 'wizardButton',
			next: 'wizardButton',
			finish: 'wizardButton'
		}
	},

	/* Events */
	events: {
		onCancel: function(e) { return true; },
		onFinish: function(e) { return true; }
	}
};
```


---


# Configuration Options #
## General ##
| **Parameter Name** | **Type** | **Description** | **Default Value** |
|:-------------------|:---------|:----------------|:------------------|
| startStep          | integer  | Determines which step the wizard will display first | 0                 |
| enableThemeRoller  | boolean  | Determines whether or not to apply jQuery UI ThemeRoller Classes to the wizard | false             |
| hideTitle          | boolean  | Determines whether or not to show the title of the current wizard step. | false             |

## Counter-Related ##
| counter.enable | boolean | Determines whether or not to add the counter to the wizard | false |
|:---------------|:--------|:-----------------------------------------------------------|:------|
| counter.type   | string ('count' OR 'percentage') | Determines the Step Counter Type (count or percent)        | 'count' |
| counter.excludeStart | boolean | Determines whether or not to exclude the first step from the counter | false |
| counter.hideStart | boolean | Determines whether or not to display the counter on the first step of the wizard | false |
| counter.excludeFinish | boolean | Determines whether or not to exclude the last step from the counter | false |
| counter.hideFinish | boolean | Determines whether or not to display the counter on the last step of the wizard | false |

## Button-Related ##
| hideCancelButton | boolean | Determines whether or not to show the Cancel `<button>` at all | false |
|:-----------------|:--------|:---------------------------------------------------------------|:------|
| finishButtonType | string  | Determines the value of the "type" attribute of the Finish Button. (using 'submit' allows jWizard to integrate seamlessly with HTML Forms) | 'button' |
| buttonText.cancel | string  | Determines the text displayed on the Cancel Button             | 'Cancel' |
| buttonText.previous | string  | Determines the text displayed on the Previous Button           | 'Previous' |
| buttonText.next  | string  | Determines the text displayed on the Next Button               | 'Next' |
| buttonText.finish | string  | Determines the text displayed on the Cancel Button             | 'Finish' |

## Menu-Related ##
| **Parameter Name** | **Type** | **Description** | **Default Value** |
|:-------------------|:---------|:----------------|:------------------|
| enableMenu         | boolean  | Determines whether or not to add the sidebar menu to the wizard | false             |
| menuWidth          | string   | Put in a valid CSS 'width' property value, and this will be the width set to the menu | '10em'            |

## CSS Classes ##
| **Parameter Name** | **Description** | **Default Value** |
|:-------------------|:----------------|:------------------|
| cssClasses.title   | Applies to the `<div>` surrounding the title. | title             |
| cssClasses.menu.div | Applies to the `<div>` surrounding the menu. | menu              |
| cssClasses.menu.active | Applies to the `<li>` surrounding the `<a>` navigation link for the steps prior to the current step. | active            |
| cssClasses.menu.current | Applies to the `<li>` surrounding the `<a>` navigation link for the current step. | current           |
| cssClasses.menu.inactive | Applies to the `<li>` surrounding the `<a>` navigation link for the steps after the current step. | inactive          |
| cssClasses.step.wrapper | Applies to the `<div>` surrounding all of the steps in the wizard. | wrapper           |
| cssClasses.step.all | Applies to each step (ie. `<div>`) of the wizard. | step              |
| cssClasses.counter | Applies to the `<span>` surrounding the counter | counter           |
| cssClasses.buttons.div | Applies to the `<div>` surrounding the buttons. | buttons           |
| cssClasses.buttons.cancel | Applies to the Cancel `<button>`. | wizardButton      |
| cssClasses.buttons.previous | Applies to the Previous `<button>`. | wizardButton      |
| cssClasses.buttons.next | Applies to the Next `<button>`. | wizardButton      |
| cssClasses.buttons.finish | Applies to the Finish `<button>`. | wizardButton      |

## Custom Events ##
| **Parameter Name** | **Description** | **Default Value** |
|:-------------------|:----------------|:------------------|
| events.onCancel    | Fired off when the Cancel `<button>` is clicked. | function(e) { return true; } |
| events.onFinish    | Fired off when the Finish `<button>` is clicked. | function(e) { return true; } |