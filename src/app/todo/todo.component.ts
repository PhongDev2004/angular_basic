import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoService } from '../todo.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

export interface TodoItem {
  id: string;
  title: string;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  todoList: any[] = [];
  displayedColumns: string[] = ['id', 'title', 'actions'];
  dataSource: TodoItem[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoList = this.todoService.todoList;
    this.dataSource = [...this.todoList];
    this.todoService.listChange.subscribe((res) => {
      console.log('ACTION', res);
      this.todoList = this.todoService.todoList;
      this.dataSource = [...this.todoList];
    });
  }

  handleControl(data: TodoItem, action: string) {
    if (action === 'delete') {
      this.todoService.handleDeleteTodo(data.id);
      this.todoService.listChange.next('action_delete');
    } else {
      this.todoService.toggleEdit(data, 'edit');
      this.todoService.listChange.next(`edit_${data.id}`);
    }
  }
}
