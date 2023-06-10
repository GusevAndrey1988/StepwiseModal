import Modal from "./Modal/Modal";
import Template from "./Modal/Template";

window.Widgets = window.Widgets || {};
window.Widgets.Modal = window.Widgets.Modal || {};

window.Widgets.Modal.Modal = Modal;
window.Widgets.Modal.Template = Template;

window.Widgets.Modal.SimpleTemplate = new Template(`
    <div class="simple-modal-template">
        <div class="simple-modal-template-header">
            <div class="simple-modal-template-title">#title#</div>
            <div class="simple-modal-template-close-btn" data-modal-close="">
                <span></span>
                <span></span>
            </div>
        </div>
        <div class="simple-modal-template-content">
            #content#
        </div>
        <div class="simple-modal-template-footer">
            #footer-content#
        </div>
    </div>
`);
