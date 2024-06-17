import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { title } from 'process';
import { v4 as uuid } from 'uuid';
import { ProductsComponent } from './products/products.component';
import { ProductsFormComponent } from './products-form/products-form.component';
import { TodoComponent } from './todo/todo.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TableBasicExample } from './table/table.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ProductsComponent,
    ProductsFormComponent,
    TodoComponent,
    TodoFormComponent,
    TableBasicExample,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  store = {
    isAction: '',
    data: null,
  };
  items: any[] = [];
  editItem: string = '';
  editItemId: string = '';

  addItem(newItem: { id?: string; title?: string }) {
    if (this.store.isAction === 'edit' && newItem.id) {
      const olIndex = this.items.findIndex((item) => item.id === newItem.id);
      this.items[olIndex].title = newItem.title;
    } else {
      this.items.push({ id: uuid(), title: newItem.title });
    }
    this.store.isAction = '';
    this.store.data = null;
    this.editItem = '';
    this.editItemId = '';
  }

  handleControl(data: any) {
    this.store.isAction = data.action;
    this.store.data = data.itemId;
    if (data.action === 'delete') {
      this.items = this.items.filter((item) => item.id !== data.itemId);
    }
    if (data.action === 'edit') {
      const item = this.items.find((item) => item.id === data.itemId);
      this.editItem = item ? item.title : '';
      this.editItemId = data.itemId;
    }
  }
}
