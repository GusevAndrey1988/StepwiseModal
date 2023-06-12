document.addEventListener('DOMContentLoaded', () => {
    const backplate = new Widgets.Modal.Backplate();
    const templateRenderer = new Widgets.Modal.TemplateRenderer();

    let parameters = {
        'userName': '',
        'productId': '',
        'productName': '',
        'date': '',
        'error-message': '',
    }

    const showResult = () => {
        document.querySelector('[data-result-output]').innerHTML = `
            <table class="table">
                <tbody>
                    <tr>
                        <td>Имя</td>
                        <td>${parameters.userName}</td>
                    </tr>
                    <tr>
                        <td>Продукт</td>
                        <td>${parameters.productName} [${parameters.productId}]</td>
                    </tr>
                    <tr>
                        <td>Дата доставки</td>
                        <td>${parameters.date}</td>
                    </tr>
                </tbody>
            </table>
        `;
    };

    const createTemplate = (selector) =>
        new Widgets.Modal.Template(document.querySelector(selector).innerHTML);

    const commonOptions = {
        backplate: backplate,
        template: createTemplate('script[type="modal/template"][data-template="stepwise-template"]'),
        renderer: templateRenderer,
    };

    const isBackButtonClick = (userObject) => {
        if (typeof userObject === 'string' && userObject === 'back') {
            return true;
        }
        return false;
    };

    const backLink = (step, parent, userObject) => isBackButtonClick(userObject) ? true : false;

    const stepwiseModal = new Widgets.Modal.StepwiseModal('stepwiseModal#1', {
        useDataAttribute: true,
    });

    const userNameModal = new Widgets.Modal.Modal('modal#userName', {
        ...commonOptions,
        content: createTemplate('script[type="modal/template"][data-template="user-name"]'),
        parameters: { ...parameters, title: 'Введите ваше имя' } 
    });

    let userNameStep = stepwiseModal.createStep('user-name', userNameModal, {
        onEnter: (step, parent) => step.assignedVisible().combineParameters(parameters),
        onLeave (step, parent) {
            parameters.userName = document.querySelector('[data-stepwise] [name="userName"]').value;
            parameters['error-message'] = !parameters.userName ? 'Ну указано имя.' : '';
        },
    });
    userNameStep.link(userNameStep, (step, parent, userObject) =>
        isBackButtonClick(userObject) ? false : parameters.userName.length === 0);

    const productModal = new Widgets.Modal.Modal('modal#product', {
        ...commonOptions,
        content: createTemplate('script[type="modal/template"][data-template="product"]'),
        parameters: { ...parameters, title: 'Выберите продукт' } 
    });

    let productStep = stepwiseModal.createStep('product', productModal, {
        onEnter: (step, parent) => step.assignedVisible().combineParameters(parameters),
        onShow (step, parent) {
            if (parameters.productId) {
                document.querySelector('[data-stepwise] [name="productId"]').value = parameters.productId;
            }
        },
        onLeave (step, parent) {
            const select = document.querySelector('[data-stepwise] [name="productId"]');
            parameters.productId = select.value;
            parameters.productName = select.options[select.selectedIndex].innerText;
        },
    });
    userNameStep.link(productStep, (step, parent, userObject) => !isBackButtonClick(userObject));
    productStep.link(userNameStep, backLink);

    const dateModal = new Widgets.Modal.Modal('modal#date', {
        ...commonOptions,
        content: createTemplate('script[type="modal/template"][data-template="date"]'),
        parameters: { ...parameters, title: 'Выберите дату доставки' } 
    });

    let dateStep = stepwiseModal.createStep('date', dateModal, {
        onEnter: (step, parent) => step.assignedVisible().combineParameters(parameters),
        onLeave (step, parent) {
            parameters.date = document.querySelector('[data-stepwise] [name="date"]').value;
            parameters['error-message'] = !parameters.date ? 'Не указанна дата.' : '';
        },
    });
    dateStep.link(dateStep, (step, parent, userObject) =>
        isBackButtonClick(userObject) ? false : !parameters.date);
    productStep.link(dateStep, (step, parent, userObject) => !isBackButtonClick(userObject));
    dateStep.link(productStep, backLink);
    dateStep.link(null, showResult, 'end');

    document.querySelector('[data-start-stepwise]').addEventListener('click', () => {
        stepwiseModal.setCurrentStep('user-name');
        stepwiseModal.show();
    });
});