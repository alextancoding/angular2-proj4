import {Component} from '@angular/core';
import {NewItemComponent} from "./new-item.component";
import {ItemComponent} from "./item.component";
import {ListItem} from "../list-item";

@Component({
    selector: 'shopping-list',
    template: `
        <section>
            <new-item (itemAdded)="onItemAdded($event)"></new-item>
        </section>
        <section>
            <h3>My List</h3>
            <div class="list">
                <ul>
                    <li *ngFor="#listItem of listItems" (click)="onSelect(listItem)">{{listItem.name}} ({{listItem.amount}})</li>
                </ul>
            </div>
        </section>
        <section *ngIf="selectedItem != null">
            <edit-item [item]="selectedItem" (removed)="onRemove($event)"></edit-item>
        </section>
    `,
    directives: [NewItemComponent, ItemComponent]
})
export class ShoppingListComponent {
    listItems = new Array<{ListItem}>();
    selectedItem: ListItem;

    onItemAdded(item: ListItem) {
        this.listItems.push({name: item.name, amount: item.amount});
    }

    onSelect(item: ListItem) {
        this.selectedItem = item;
    }

    onRemove(item: ListItem) {
        this.listItems.splice(this.listItems.indexOf(item), 1);
        this.selectedItem = null;
    }
}