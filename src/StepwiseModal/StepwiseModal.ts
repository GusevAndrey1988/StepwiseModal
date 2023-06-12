import Visible from "../Common/Visible";
import Modal from "../Modal/Modal";
import Step from "./Step";
import StepOptions from "./StepOptions";
import StepwiseModalOptions from "./StepwiseModalOptions";

export default class StepwiseModal implements Visible {
    private steps: Map<string, Step>;
    private currentStep: Step = null;

    constructor (
        private name: string,
        private options: StepwiseModalOptions = {}
    ) {
        this.steps = new Map<string, Step>;

        this.prepareOptions();
        this.bindEvents();
    }

    private prepareOptions(): void {
        if (this.options.useDataAttribute === undefined) {
            this.options.useDataAttribute = false;
        }
    }

    private bindEvents(): void {
        if (this.options.useDataAttribute) {
            document.body.addEventListener('click', ((event: Event) => {
                const element = (<HTMLElement> event.target).closest(`[data-next-for="${this.name}"]`);
                if (!element) {
                    return;
                }

                let userObject = null;
                if (element.hasAttribute('data-user-object')) {
                    userObject = element.getAttribute('data-user-object');
                }
                this.nextStep(userObject);
            }).bind(this));
        }
    }

    public createStep(name: string, modal: Modal, options: StepOptions = {}): Step {
        let newStep = new Step(name, modal, this, options);
        this.steps.set(name, newStep);

        if (!this.currentStep) {
            this.setCurrentStep(name);
        }
        return newStep;
    }

    public nextStep(userObject: any = null): void {
        if (!this.currentStep) {
            return;
        }

        this.currentStep.leave();
        this.currentStep.hide();

        this.currentStep = this.currentStep.next(userObject);
        if (!this.currentStep) {
            return;
        }
        this.currentStep.enter();
        this.currentStep.show();
    }

    public setCurrentStep(stepName: string): boolean {
        for (let entry of this.steps.entries()) {
            if (entry[0] === stepName) {
                this.currentStep = entry[1];
                this.currentStep.enter();
            }
            return true;
        }

        return false;
    }

    public show(): void {
        if (!this.currentStep) {
            return;
        }

        this.currentStep.assignedVisible().show();
    }

    public hide(): void {
        if (!this.currentStep) {
            return;
        }

        this.currentStep.assignedVisible().hide();
    }
}