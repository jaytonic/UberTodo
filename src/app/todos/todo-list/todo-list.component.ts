import { trigger, transition, style, animate } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('0.2s ease-out', style({ height: 30, opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: 30, opacity: 1 }),
        animate('0.2s ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
})
export class TodoListComponent {
  @Input()
  todos: Todo[] | null = null;

  @Output()
  toggleTodoEvent = new EventEmitter<Todo>();

  @Output()
  clearCompletedTodos = new EventEmitter();

  filteredTodos: Todo[] = [];
  pagedFilteredTodos: Todo[] = [];

  displayIncomplete = true;
  displayComplete = false;
  pageSize = 15;
  firstRowToDisplay = 0;

  ngOnChanges(changes: any): void {
    this.updateFilter();
  }

  toggleTodo(todo: Todo) {
    this.toggleTodoEvent.emit(todo);
  }
  updateFilter() {
    if (this.todos) {
      this.filteredTodos = this.todos.filter(
        (todo) =>
          (todo.completed && this.displayComplete) ||
          (!todo.completed && this.displayIncomplete)
      );
      if (this.firstRowToDisplay >= this.filteredTodos.length) {
        this.firstRowToDisplay = 0;
      }
      this.pagedFilteredTodos = this.filteredTodos.slice(
        this.firstRowToDisplay,
        this.firstRowToDisplay + this.pageSize
      );
    } else {
      this.filteredTodos = [];
      this.pagedFilteredTodos = this.filteredTodos;
    }
  }
  onPageChange(event: any) {
    this.firstRowToDisplay = event.first;
    this.updateFilter();
  }

  clearCompleted() {
    this.clearCompletedTodos.emit();
  }
}
