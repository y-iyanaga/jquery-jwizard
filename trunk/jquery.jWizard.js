/**
 * @name	jWizard Plugin
 * @author	Dominic Barnes
 * @desc	A wizard plugin that actually works with minimal configuration. (per jQuery's design philosophy)
 * @type	jQuery
 *
 * --- Features ---
 * - Minimal HTML, CSS and JS startup requirements
 * - Custom Events for end-users to hook into within their applications
 * - Stylable (via CSS Classes)
 * - Step-based Form Validation
 */
(function($) {
    $.fn.extend({
        jWizard: function(settings, validation) {
			/**
			 * --- Default Parameters ---
			 * @param hideCancelButton If set to true, this will hide the "Cancel" Button (defaults to false)
			 * @param cssClasses Assign CSS Class Names to different components of the Wizard
			 * @param onStepChange Custom Event: Fires off any time the Step changes (more specifically, when the "Next" or "Previous" button is clicked)
			 * @param onCancel Custom Event: Fires off when the user clicks the "Cancel" button
			 * @param onFinish Custom Event: Fires off when the user clicks the "Finish" button
			 */
			var defaults = {
				enableValidation: false,
				hideCancelButton: false,
				hideTitle: false,
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
			settings = $.extend({}, defaults, settings);

			return this.each(function() {
				var w = $(this);	// Create a reference to the wizard

				w.find('div').addClass(settings.stepDivClass);	// Add the assigned class to the Step <div>'s
				w.selectors = {
					steps: 'div.' + settings.stepDivClass,
					buttonsDiv: 'div.' + settings.buttonsDivClass,
					titleDiv: 'div.' + settings.titleDivClass,
					currentStep: 'div.' + settings.stepDivClass + ':visible'
				};

				// Create our Action <button>s and <div>
				w.append('<div class="' + settings.buttonsDivClass + '"></div>');
				w.find(w.selectors.buttonsDiv).html('<button id="jw_cancel">Cancel</button><button id="jw_previous">Previous</button><button id="jw_next">Next</button><button id="jw_finish">Finish</button>');
				w.prepend('<div class="' + settings.titleDivClass + '"></div>');

				/* Identify our newly created <button>s */
				w.cancelButton = w.find('button#jw_cancel');
				w.nextButton = w.find('button#jw_next');
				w.previousButton = w.find('button#jw_previous');
				w.finishButton = w.find('button#jw_finish');

				/* Add the assigned classes to our <button>s */
				w.cancelButton.addClass(settings.cancelButtonClass);
				w.previousButton.addClass(settings.previousButtonClass);
				w.nextButton.addClass(settings.nextButtonClass);
				w.finishButton.addClass(settings.finishButtonClass);

				if (settings.hideCancelButton)	w.cancelButton.hide();	// Hide the Cancel Button if the settings specify to

				w.find(w.selectors.steps + ':not(:first)').hide();	// Hide every step except the first one
				w.previousButton.hide();	// The previous button is hidden by default
				w.finishButton.hide();	// The finish button is hidden by default

				/* Identify what step is what */
				w.allSteps = w.find(w.selectors.steps);
				w.firstStep = w.find(w.selectors.steps + ':first');
				w.lastStep = w.find(w.selectors.steps + ':last');
				w.currentStep = w.firstStep;

				w.title = w.find(w.selectors.titleDiv).text(w.firstStep.attr('title'));


				/**
				 * @member	"Next" Button Click Event
				 * @desc	This moves us to the next step.
				 */
				w.nextButton.click(function() {
					if (settings.enableValidation) {
						w.bind('onValidateStep', settings.onValidateStep);
						if (!w.triggerHandler('onValidateStep'))
							return false;
					}

					if (w.currentStep.attr('id') != w.lastStep.attr('id'))
					{
						var nextStep = w.currentStep.next(w.selectors.steps);
						w.changeStep(nextStep);
						w.changeButtons();
					}
				});

				/**
				 * @member	"Previous" Button Click Event
				 * @desc	This moves us to the previous step.
				 */
				w.previousButton.click(function() {
					if (settings.enableValidation) {
						w.bind('onValidateStep', settings.onValidateStep);
						if (!w.trigger('onValidateStep'))
							return false;
					}

					if (w.currentStep.attr('id') != w.firstStep.attr('id'))
					{
						var previousStep = w.currentStep.prev(w.selectors.steps);
						w.changeStep(previousStep);
						w.changeButtons();
					}
				});

				/**
				 * @member	"Cancel" Button Click Event
				 * @desc	Call the User-Supplied onCancel method
				 */
				w.cancelButton.click(function() {
					w.bind('onCancel', settings.onCancel);
					w.trigger('onCancel');
				});

				/**
				 * @member	"Finish" Button Click Event
				 * @desc	Call the User-Supplied onFinish method
				 */
				w.finishButton.click(function() {
					w.bind('onFinish', settings.onFinish);
					w.trigger('onFinish');
				});

				/**
				 * @member changeStep
				 * @desc
				 */
				w.changeStep = function(nextStep)
				{
					w.bind('onStepChange', { currentStep: w.currentStep, nextStep: nextStep }, settings.onStepChange);
					if (!w.triggerHandler('onStepChange'))	return false;	// If the trigger returns false, we return false here before the switch occurs

					w.currentStep.hide();	// Hide the current Step
					nextStep.show();
					w.title.text(nextStep.attr('title'));

					w.currentStep = $(w.selectors.currentStep);	// Update the current Step
				};

				/**
				 * @member	checkButtons
				 * @desc	Based on the current step, we will show and hide certain buttons.
				 */
				w.changeButtons = function() {
					var currentId = w.currentStep.attr('id');
					var firstId = w.firstStep.attr('id');
					var lastId = w.lastStep.attr('id');

					switch (currentId)
					{
						case firstId:
							w.previousButton.hide();
							w.nextButton.show();
							w.finishButton.hide();
							break;

						case lastId:
							w.previousButton.show();
							w.nextButton.hide();
							w.finishButton.show();
							break;

						default:
							w.previousButton.show();
							w.nextButton.show();
							w.finishButton.hide();
							break;
					}
				};

				return w;
            });
        }
    });
})(jQuery);
