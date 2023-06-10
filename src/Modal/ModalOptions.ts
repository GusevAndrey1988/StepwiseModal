import Modal from "./Modal";
import Template from "./Template";

export default interface ModalOptions {
    template: Template,
    parameters: object,
    onShow: (modal: Modal) => void,
    onHide: (modal: Modal) => void,
}