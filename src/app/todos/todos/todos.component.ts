import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UiService } from '../../core/ui.service';
import { Todo } from '../todo.model';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  providers: [MessageService],
})
export class TodosComponent implements OnInit {
  constructor(
    public todosService: TodosService,
    private uiService: UiService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  async onNewEvent(description: string) {
    this.uiService.startBusyIndicator('Adding todo...');
    try {
      await this.todosService.addTodo(description);
      this.messageService.add({
        severity: 'success',
        summary: 'Todo added',
        closable: false,
        life: 800,
      });
    } finally {
      this.uiService.stopBusyIndicator();
    }
  }

  toggle(todo: Todo) {
    this.todosService.toggleTodo(todo);
    this.messageService.add({
      severity: 'success',
      summary: 'Todo toggled',
      closable: false,
      life: 800,
    });
  }
  async clearCompletedTodos() {
    this.uiService.startBusyIndicator('Clearing completed todos....');
    try {
      await this.todosService.clearCompletedTodos();
      this.messageService.add({
        severity: 'success',
        summary: 'Todo cleared',
        closable: false,
        life: 800,
      });
    } finally {
      this.uiService.stopBusyIndicator();
    }
  }
}
