import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TodoAddComponent } from './todo-add/todo-add.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodosRoutingModule } from './todos-routing.module';
import { TodosComponent } from './todos/todos.component';

@NgModule({
  declarations: [
    TodoListComponent,
    TodoAddComponent,
    TodoItemComponent,
    TodosComponent,
  ],
  imports: [SharedModule, TodosRoutingModule, FormsModule],
})
export class TodosModule {}
