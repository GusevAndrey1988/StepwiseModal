export default class Template {
    constructor (private template: string) { }

    public getTemplate(): string {
        return this.template;
    }
}