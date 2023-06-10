import BackplateOptions from "./BackplateOptions";

export default class Backplate {
    private element: HTMLElement = null;

    constructor(private options: BackplateOptions = {}) {
        this.prepareOptions();
        this.element = document.createElement('div');
        this.element.classList.add(...this.options.classNames);
        this.setBackplateStyles(this.element);
        document.body.append(this.element);
    }

    private prepareOptions() {
        if (!this.options.color) {
            this.options.color = "#00000088";
        }

        if (!this.options.classNames) {
            this.options.classNames = ['modals-backplate'];
        }
    }

    private setBackplateStyles(element: HTMLElement) {
        element.style.cssText = `
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            display: none;
            background-color: ${this.options.color};
        `;
    }

    public attach(element: HTMLElement) {
        this.element.innerHTML = '';
        this.element.append(element);
    }

    public show(): void {
        this.element.style.display = 'block';
    }

    public hide(): void {
        this.element.style.display = 'none';
    }
}