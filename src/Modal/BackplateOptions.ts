import Backplate from "./Backplate";

export default interface BackplateOptions {
    color?: string;
    classNames?: Array<string>;
    onClick?: (backplate: Backplate, event: Event) => void;
}