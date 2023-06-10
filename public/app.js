document.addEventListener('DOMContentLoaded', () => {
    const backplate = new Widgets.Modal.Backplate({
        color: '#33330088',
        classNames: ['one', 'two'],
    });

    const templateRenderer = new Widgets.Modal.TemplateRenderer();

    let modalParameters = {
        'title': 'Test Modal',
        'footer-content': (new Date()).toString(),
        'userName': 'Ivan',
    };

    const modal = new Widgets.Modal.Modal('modal#1', {
        backplate: backplate,
        template: Widgets.Modal.SimpleTemplate,
        renderer: templateRenderer,
        content: new Widgets.Modal.Template(
            document.querySelector('script[type="modal/template"]').innerHTML
        ),
        parameters: modalParameters,
        onShow (modal) {
            console.log('show', modal);

            const userNameInput = document.querySelector('input[name="userName"]');
            const userName = userNameInput?.value;

            if (!userName) {
                return false;
            }

            modal.changeParameters({ ...modalParameters, userName });
            return true;
        },
        onHide (modal) {
            console.log('hide', modal);
            return true;
        },
    });

    document.querySelectorAll('[data-show-modal]').forEach((button) => {
        button.addEventListener('click', () => modal.show());
    });
});