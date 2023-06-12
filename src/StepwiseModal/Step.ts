import Visible from "../Common/Visible";
import StepLink from "./StepLink";
import StepOptions from "./StepOptions";
import StepwiseModal from "./StepwiseModal";

export type Rule = (step: Step, parent: StepwiseModal, userObject: any) => boolean;
export type EventFunction = (step: Step, parent: StepwiseModal) => void;

export default class Step {
    private links: Map<string, StepLink>;

    constructor (
        private stepName: string,
        private assignedVisibleEntity: Visible,
        private parent: StepwiseModal,
        private options: StepOptions = {}
    ) {
        this.links = new Map<string, StepLink>;

        this.prepareOptions();
    }

    private prepareOptions(): void {
        this.options.onEnter = this.options.onEnter || (() => {});
        this.options.onLeave = this.options.onLeave || (() => {});

        this.options.onShow = this.options.onShow || (() => {});
        this.options.onHide = this.options.onHide || (() => {});
    }

    public enter(): void {
        this.options.onEnter(this, this.parent);
    }

    public leave(): void {
        this.options.onLeave(this, this.parent);
    }

    public show(): void {
        this.assignedVisibleEntity.show();
        this.options.onShow(this, this.parent);
    }

    public hide(): void {
        this.assignedVisibleEntity.hide();
        this.options.onHide(this, this.parent);
    }

    public next(userObject: any = null): Step {
        for (let entry of this.links.entries()) {
            if (entry[1].rule(this, this.parent, userObject)) {
                return entry[1].step;
            }
        }
    }

    public name(): string {
        return this.stepName;
    }

    public assignedVisible(): Visible {
        return this.assignedVisibleEntity;
    }

    public link(nextStep: Step, rule: Rule, linkName: string = null) {
        let name = linkName;
        if (!name) {
            name = nextStep.name();
        }
        this.links.set(name, { rule, step: nextStep });
    }
}