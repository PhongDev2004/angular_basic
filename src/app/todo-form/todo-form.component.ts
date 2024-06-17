import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TodoService } from '../todo.service';
import { v4 as uuid } from 'uuid';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent {
  todoForm!: FormGroup;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoForm = new FormGroup({
      title: new FormControl('', Validators.required),
    });
    this.todoService.listChange.subscribe((data) => {
      if (data && data.split('_')[0] === 'edit' && data.split('_')[1]) {
        const dataItem = this.todoService.todoList.find(
          (item) => item.id === data.split('_')[1]
        );
        this.todoForm.patchValue({ title: dataItem.title });
      }
    });
  }

  onSubmit() {
    if (this.todoForm.invalid) {
      this.todoForm.markAllAsTouched();
      return;
    }

    if (this.todoService.action.event === 'edit') {
      if (this.todoService.action.id) {
        this.todoService.handleEditTodo(
          this.todoService.action.id,
          this.todoForm.value.title
        );
        this.todoService.listChange.next('action_edit');
      }
    } else {
      this.todoService.handleAddTodo(uuid(), this.todoForm.value.title);
      this.todoService.listChange.next('action_add');
    }
    this.todoForm.reset();
    this.todoService.action.event = '';
    this.todoService.action.id = '';
  }
}
