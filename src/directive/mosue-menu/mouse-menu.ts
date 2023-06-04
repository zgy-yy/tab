import {Directive, h, nextTick, render} from "vue";
import {MenuTag} from "../direct-type.ts";
import menuView from "./MenuView.vue";

const mouseMenu: Directive<HTMLElement, MenuTag[]> = {
    created(el: HTMLElement, binding,) {
        document.addEventListener('contextmenu', () => {
            render(null, el)
        }, true)

        let rootEl: HTMLElement;
        nextTick(() => {
            rootEl = document.querySelector('.page')
        })
        el.addEventListener("contextmenu", (e: MouseEvent) => {

            e.preventDefault() //阻止右键默认行为
            e.stopPropagation()
            const {pageX, pageY} = e
            const {left, top} = rootEl.getBoundingClientRect()
            const position = {
                x: pageX - left,
                y: pageY - top
            }
            const vMenu = h(menuView, {tags: binding.value, position: position, parEl: rootEl},)

            render(vMenu, el)
        })

        document.addEventListener('click', () => {
            render(null, el)
        })
    }

}

export default mouseMenu