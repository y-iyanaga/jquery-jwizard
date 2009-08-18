/**
 * @name	jWizard Plugin
 * @author	Dominic Barnes
 * @desc	A wizard plugin that actually works with minimal configuration. (per jQuery's design philosophy)
 * @type	jQuery
 * @version	0.3a
 *
 * --- Features ---
 * - Minimal HTML, CSS and JS startup requirements
 * - Custom Events for end-users to hook into within their applications
 * - Stylable (via CSS Classes)
 * - Step-based Form Validation
 */
(function($){
	var jWizard = function(element, options) {
		/**
		 * --- Default Parameters ---
		 * @param hideCancelButton If set to true, this will hide the "Cancel" Button (defaults to false)
		 * @param cssClasses Assign CSS Class Names to different components of the Wizard
		 * @param onStepChange Custom Event: Fires off any time the Step changes (more specifically, when the "Next" or "Previous" button is clicked)
		 * @param onCancel Custom Event: Fires off when the user clicks the "Cancel" button
		 * @param onFinish Custom Event: Fires off when the user clicks the "Finish" button
		 */
		var defaults = {
			activeStep: 0,
			enableValidation: false,
			hideCancelButton: false,
			hideTitle: false,

			/* Button Text */
			cancelButtonText: 'Cancel',
			previousButtonText: 'Previous',
			nextButtonText: 'Next',
			finishButtonText: 'Finish',

			/* CSS Classes */
			stepDivClass: 'step',
			buttonsDivClass: 'buttons',
			titleDivClass: 'title',
			cancelButtonClass: 'wizardButton',
			previousButtonClass: 'wizardButton',
			nextButtonClass: 'wizardButton',
			finishButtonClass: 'wizardButton',

			/* Events */
			onCancel: function() { alert('Cancel Button Clicked'); },
			onStepChange: function() { return true; },
			onValidateStep: function() { return true; },
			onFinish: function() { alert('Finish Button Clicked'); }
		};

		/* Assign our Default Parameters (override with anything the end-user supplies) */
		var options = $.extend({}, defaults, options);

		var w = $(element);	// Create a reference to the wizard itself

		// Assign some strings here so we can easily call on them again (rather than running those crazy concats all the time)
		var selectors = {
			steps: 'div.' + options.stepDivClass,
			buttonsDiv: 'div.' + options.buttonsDivClass,
			titleDiv: 'div.' + options.titleDivClass,
			currentStep: 'div.' + options.stepDivClass + ':visible'
		};

		// Create our Action <button>s and <div>
		w.titleDiv = $('<div />').addClass('ui-widget-header').addClass(options.titleDivClass);
		w.buttonsDiv = $('<div />').addClass('ui-widget-content').addClass(options.buttonsDivClass);
		var cancelButton = $('<button />').attr('id', 'jw_cancel').addClass('ui-state-default').addClass(options.cancelButtonClass).html(options.cancelButtonText);
		var previousButton = $('<button />').attr('id', 'jw_previous').addClass('ui-state-default').addClass(options.previousButtonClass).html(options.previousButtonText);
		var nextButton = $('<button />').attr('id', 'jw_next').addClass('ui-state-default').addClass(options.nextButtonClass).html(options.nextButtonText);
		var finishButton = $('<button />').attr('id', 'jw_finish').addClass('ui-state-default').addClass(options.finishButtonClass).html(options.finishButtonText);
		w.buttonsDiv.append(cancelButton).append(previousButton).append(nextButton).append(finishButton);

		/**
		 * @member	"Next" Button Click Event
		 * @desc	This moves us to the next step.
		 */
		nextButton.click(function() {
			w.changeStep(w.currentStep.next(selectors.steps));
		});

		/**
		 * @member	"Previous" Button Click Event
		 * @desc	This moves us to the previous step.
		 */
		previousButton.click(function() {
			w.changeStep(w.currentStep.prev(selectors.steps));
		});

		/**
		 * @member	"Cancel" Button Click Event
		 * @desc	Call the User-Supplied onCancel method
		 */
		cancelButton.click(function() {
			w.trigger('onCancel');
		});

		/**
		 * @member	"Finish" Button Click Event
		 * @desc	Call the User-Supplied onFinish method
		 */
		finishButton.click(function() {
			w.trigger('onFinish');
		});

		/**
		 * @member changeStep
		 * @desc
		 */
		w.changeStep = function(nextStep) {
			if (!w.triggerHandler('onStepChange', [ w.currentStep, nextStep ]))	return false;	// If the trigger returns false, we return false here before the switch occurs

			w.currentStep.hide();	// Hide the current Step
			nextStep.show();
			w.titleDiv.text(nextStep.attr('title'));

			w.currentStep = w.find(selectors.currentStep);	// Update the current Step
			w.updateButtons();
		};

		/**
		 * @member	updateButtons
		 * @desc	Based on the current step, we will show and hide certain buttons.
		 */
		w.updateButtons = function() {
			var currentId = w.currentStep.attr('id');
			var firstId = w.firstStep.attr('id');
			var lastId = w.lastStep.attr('id');

			switch (currentId)
			{
				case firstId:
					previousButton.hide();
					nextButton.show();
					finishButton.hide();
					break;

				case lastId:
					previousButton.show();
					nextButton.hide();
					finishButton.show();
					break;

				default:
					previousButton.show();
					nextButton.show();
					finishButton.hide();
					break;
			}
		};

		w.goToStep = function(index) {
			w.changeStep(w.find(selectors.steps + ':eq(' + index + ')'));
		};

		w.bind('onFinish', options.onFinish);
		w.bind('onCancel', options.onCancel);
		w.bind('onStepChange', options.onStepChange);
		// w.bind('onValidateStep', options.onValidateStep); --NOT YET IMPLEMENTED

		w.children('div').addClass('ui-widget-content').addClass(options.stepDivClass);	// Add the assigned class to the Step <div>'s

		w.firstStep = w.find(selectors.steps + ':first');
		w.lastStep = w.find(selectors.steps + ':last');
		w.currentStep = w.find(selectors.steps + ':eq(' + options.activeStep + ')');

		w.prepend(w.titleDiv);
		w.append(w.buttonsDiv);

		w.find('.ui-state-default').hover(
			function() { $(this).addClass('ui-state-hover'); },
			function() { $(this).removeClass('ui-state-hover'); }
		);

		w.find(selectors.steps).hide();

		if (options.hideCancelButton)	cancelButton.hide();	// Hide the Cancel Button if the options specify to
		previousButton.hide();	// The previous button is hidden by default
		finishButton.hide();	// The finish button is hidden by default

		w.goToStep(options.activeStep);

		return w;
	};

	$.fn.jWizard = function(options) {
		return this.each(function() {
			var element = $(this);

			// Return early if this element already has a plugin instance
			if (element.data('jWizard')) return;

			// pass options to plugin constructor
			var w = new jWizard(this, options);

			// Store plugin object in this element's data
			element.data('jWizard', w);
		});
	};
})(jQuery);