import type { InputTypeOfTuple } from "astro:schema"

type InputHandler = (e : InputEvent) => void

export class InputEvent extends Event {

    inputX : number
    inputY : number

    constructor(inputX, inputY) {
        super("InputEvent")
        this.inputX = inputX
        this.inputY = inputY
    }

    static fromMouse(e: MouseEvent) {
        return new InputEvent(e.clientX, e.clientY)
    }

    static fromTouch(e: TouchEvent) {
        if (e.touches.length > 0) {
            return new InputEvent(e.touches[0].clientX, e.touches[0].clientY)
        } else {
            return new InputEvent(0, 0)
        }
    }
}

export function handleInput(inputHandler : InputHandler) {
    return function(e : Event) {
        if (e instanceof TouchEvent) {
            inputHandler(InputEvent.fromTouch(e))
        } else if (e instanceof MouseEvent) {
            inputHandler(InputEvent.fromMouse(e))
        }   
    }
}