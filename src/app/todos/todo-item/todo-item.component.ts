import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input()
  todo: Todo | null = null;

  @Output()
  toggleTodo = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
  toggle() {
    this.toggleTodo.emit();
  }

}
