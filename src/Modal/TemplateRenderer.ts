import Template from "./Template";

export default class TemplateRenderer {
    constructor() {
    }

    public render(template: Template, parameters: any): string {
        return template.getTemplate()
            .replace(/\{\{(?<property>.+)\}\}/g, (match, parameter) => {
                return parameter in parameters
                    ? parameters[parameter]
                    : '';
            });
    }
}