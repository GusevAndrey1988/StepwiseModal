export default class Template {
    constructor (private template: string) {
        if (!this.template.includes('#content#')) {
            throw new Error('Не установлена метка для контента.');
        }
    }

    public getTemplate(): string {
        return this.template;
    }
}