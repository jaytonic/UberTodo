import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoAddComponent } from './todo-add/todo-add.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodosComponent } from './todos/todos.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    TodoListComponent,
    TodoAddComponent,
    TodoItemComponent,
    TodosComponent
  ],
  imports: [
    SharedModule,
    TodosRoutingModule
  ]
})
export class TodosModule { }
