import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todoList: any[] = [];
  listChange = new BehaviorSubject<string>('');
  action = {
    event: '',
    id: '',
  };

  constructor() {}

  handleAddTodo(id: string, title: string) {
    this.todoList.push({ id, title });
  }

  handleEditTodo(id: string, newTitle: string) {
    const olIndex = this.todoList.findIndex((item) => item.id === id);
    this.todoList[olIndex] = { id, title: newTitle };
  }

  handleDeleteTodo(id: string) {
    this.todoList = [...this.todoList.filter((item) => item.id !== id)];
  }

  toggleEdit(data: any, event: string) {
    this.action.event = event;
    this.action.id = data.id;
  }
}
