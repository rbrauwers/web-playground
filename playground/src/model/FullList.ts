import ListItem from "./ListItem";

interface List {
    list: ListItem[],
    load(): void,
    save(): void,
    clearList(): void,
    addItem(item: ListItem): void
    removeItem(id: string): void
}

export default class FullList implements List {

    static instance: FullList = new FullList()

    private constructor(private _list: ListItem[] = []) {
    }

    private listKey: string = "myList"

    get list(): ListItem[] {
        return this._list
    }

    load(): void {
        const storedList: string | null = localStorage.getItem(this.listKey)
        
        if (storedList == null) {
            return
        }
        
        const parsedList: { _id: string, _item: string, _checked: boolean }[]
            = JSON.parse(storedList)    

        parsedList.forEach(item => {
            const newItem = new ListItem(item._id, item._item, item._checked)
            this._list.push(newItem)
        })
    }
    
    save(): void {
        localStorage.setItem(this.listKey, JSON.stringify(this._list))
    }
    
    clearList(): void {
        this._list = [];
        this.save()
    }
    
    addItem(item: ListItem): void {
        this._list.push(item)
        this.save()
    }
    
    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id != id)
        this.save()
    }
    
}