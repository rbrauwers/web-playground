import FullList from "../model/FullList";
import ListItem from "../model/ListItem";

interface DOMList {
    ul: HTMLUListElement,
    clear(): void,
    render(list: FullList): void
}

export default class ListTemplate implements DOMList {

    ul: HTMLUListElement

    static instance: ListTemplate = new ListTemplate()

    private constructor() {
        this.ul = document.getElementById("listItems") as HTMLUListElement
    }
    
    clear(): void {
        this.ul.innerHTML = ""
    }
    
    render(list: FullList): void {
        this.clear()
        list.list.forEach(item => {
            this.renderItem(item, list)
        })
    }

    private renderItem(item: ListItem, list: FullList) {
        const li = document.createElement("li") as HTMLLIElement
        li.className = "item"

        const checkbox = document.createElement("input") as HTMLInputElement
        checkbox.type = "checkbox"
        checkbox.id = item.id
        checkbox.checked = item.checked
        checkbox.addEventListener("change", () => {
            item.checked = !item.checked
            list.save()
        })
        li.append(checkbox)

        const label = document.createElement("label") as HTMLLabelElement
        label.htmlFor = item.id
        label.textContent = item.item
        li.append(label)

        const button = document.createElement("button") as HTMLButtonElement
        button.className = "button"
        button.innerHTML = "X"
        button.addEventListener("click", () => {
            list.removeItem(item.id)
            this.render(list)
        })
        li.append(button)

        this.ul.append(li)
    }

    /*
                    <li class="item">
                    <input type="checkbox" id="2">
                    <label for="2">sleep</label>
                    <button class="button">X</button>
                </li>
    */

}