import Backplate from './Backplate';
import Modal from './Modal';
import Template from "./Template";
import TemplateRenderer from './TemplateRenderer';

export default interface ModalOptions {
    backplate: Backplate,
    template: Template,
    renderer: TemplateRenderer,
    content?: Template,
    parameters?: any,
    onShow?: (modal: Modal) => boolean,
    onHide?: (modal: Modal) => boolean,
}