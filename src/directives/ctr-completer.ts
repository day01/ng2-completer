import { Directive, EventEmitter, OnInit, Output } from "@angular/core";
// import { Observable } from "rxjs/Observable";


// import { CompleterData } from "../components/ng2-completer/services/completer-data";
import { CompleterItem } from "../components/ng2-completer/completer-item";

export interface CompleterList {
    search(term: string): void;
    clear(): void;
}

export interface CompleterDropdown {
    clear(): void;
    selectCurrent(): void;
    nextRow(): void;
    prevRow(): void;
}

@Directive({
    selector: "[ctrCompleter]",
})
export class CtrCompleter implements OnInit {
    @Output() public selected = new EventEmitter<CompleterItem>();
    @Output() public highlighted = new EventEmitter<CompleterItem>();

    private list: CompleterList;
    private dropdown: CompleterDropdown;

    constructor() { }

    public ngOnInit() {
        //
    }

    public registerList(list: CompleterList) {
        this.list = list;
    }

    public registerDropdown(dropdown: CompleterDropdown) {
        this.dropdown = dropdown;
    }

    public onHighlighted(item: CompleterItem) {
        this.highlighted.emit(item);
    }

    public onSelected(item: CompleterItem) {
        this.selected.emit(item);
        this.clear();
    }

    public search(term: string) {
        if (this.list) {
            this.list.search(term);
        }
    }

    public clear() {
        if (this.dropdown) {
            this.dropdown.clear();
        }
        if (this.list) {
            this.list.clear();
        }
    }

    public selectCurrent() {
        if (this.dropdown) {
            this.dropdown.selectCurrent();
        }
    }

    public nextRow() {
        if (this.dropdown) {
            this.dropdown.nextRow();
        }
    }

    public prevRow() {
        if (this.dropdown) {
            this.dropdown.prevRow();
        }
    }
}
