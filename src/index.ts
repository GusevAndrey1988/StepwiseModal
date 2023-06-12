import Backplate from "./Modal/Backplate";
import Modal from "./Modal/Modal";
import Template from "./Modal/Template";
import TemplateRenderer from "./Modal/TemplateRenderer";

import StepwiseModal from "./StepwiseModal/StepwiseModal";

window.Widgets = window.Widgets || {};
window.Widgets.Modal = window.Widgets.Modal || {};

window.Widgets.Modal.Backplate = Backplate;
window.Widgets.Modal.Template = Template;
window.Widgets.Modal.TemplateRenderer = TemplateRenderer;
window.Widgets.Modal.Modal = Modal;

window.Widgets.Modal.StepwiseModal = StepwiseModal;

window.Widgets.Modal.SimpleTemplate = new Template(`
    <div class="simple-modal-template">
        <div class="simple-modal-template-header">
            <div class="simple-modal-template-title">{{title}}</div>
            <div class="simple-modal-template-close-btn" data-modal-close="">
                <span></span>
                <span></span>
            </div>
        </div>
        <div class="simple-modal-template-content">
            {{content}}
        </div>
        <div class="simple-modal-template-footer">
            {{footer-content}}
        </div>
    </div>
`);
