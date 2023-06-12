import { EventFunction } from "./Step";

export default interface StepOptions {
    onEnter?: EventFunction,
    onLeave?: EventFunction,

    onShow?: EventFunction,
    onHide?: EventFunction,
}