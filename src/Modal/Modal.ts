import ModalOptions from "./ModalOptions";

export default class Modal {
    public static readonly CLOSE_BUTTON_SELECTOR = '[data-modal-close]';

    private modified: boolean = true;
    private element: HTMLElement = null;

    private contentBuffer: string = '';
    private templateBuffer: string = '';

    constructor (
        private name: string,
        private options: ModalOptions,
    ) {
        this.prepareOptions();
        this.setupCommonParameters();
        this.createElement();
    }

    private prepareOptions(): void {
        this.options.parameters = this.options.parameters || {};
        this.options.onShow = this.options.onShow || (() => true);
        this.options.onHide = this.options.onHide || (() => true);
    }

    private setupCommonParameters(): void {
        this.options.parameters['-modal-name'] = this.name;
    }

    private createElement(): void {
        this.element = document.createElement('div');
        this.element.dataset.modalName = this.name;

        this.attachEventHandlers();
    }
    
    private attachEventHandlers(): void {
        this.element.addEventListener('click', ((event: Event) => {
            if (!(<HTMLElement> event.target).closest(Modal.CLOSE_BUTTON_SELECTOR)) {
                return;
            }
            this.hide();
        }).bind(this));
    }

    public show(): void {
        if (!this.options.onShow(this)) {
            return;
        }
        if (this.modified) {
            this.renderContentToBuffer();
            this.renderTemplateToBuffer(this.contentBuffer);
            
            this.element.innerHTML = this.templateBuffer;
            this.options.backplate.attach(this.element);
        }
        this.options.backplate.show();
        this.modified = false;
    }

    private renderContentToBuffer(): void {
        this.contentBuffer = this.options.content
            ? this.options.renderer.render(
                    this.options.content,
                    this.options.parameters
                )
            : '';
    }

    private renderTemplateToBuffer(content: string): void {
        this.templateBuffer = this.options
            .renderer.render(
                this.options.template,
                { ...this.options.parameters, content }
            );
    }

    public hide(): void {
        if (!this.options.onHide(this)) {
            return;
        }
        this.options.backplate.hide();
    }

    public changeParameters(parameters: any): void {
        this.options.parameters = parameters;
        this.setupCommonParameters();
        this.modified = true;
    }
}