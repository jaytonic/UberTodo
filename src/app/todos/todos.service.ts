import { Todo } from './todo.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AddTodoAnswer, GetTodosAnswer } from './service-response.model';
import { environment } from 'src/environments/environment';
import { UserService } from '../auth/user.service';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos$ = new BehaviorSubject<Todo[]>([]);

  constructor(private http: HttpClient, private userService: UserService) {
    this.initialize();
  }

  async initialize() {
    const response = await lastValueFrom(
      this.http.get<GetTodosAnswer>(environment.apiUrl + '/task', {
        headers: { Authorization: 'Bearer ' + this.userService.token$.value },
      })
    );
    this.todos$.next(response.data);
  }

  async addTodo(description: string) {
    const response = await lastValueFrom(
      this.http.post<AddTodoAnswer>(
        environment.apiUrl + '/task',
        {
          description,
        },
        {
          headers: { Authorization: 'Bearer ' + this.userService.token$.value },
        }
      )
    );

    if (response.success) {
      this.todos$.next([...this.todos$.value, response.data]);
    }
  }

  async toggleTodo(todo: Todo) {
    const response = await lastValueFrom(
      this.http.put<AddTodoAnswer>(
        environment.apiUrl + '/task/' + todo._id,
        {
          completed: !todo.completed,
        },
        {
          headers: { Authorization: 'Bearer ' + this.userService.token$.value },
        }
      )
    );
    if (response.success) {
      this.todos$.next(
        this.todos$.value.map((t) => (t._id === todo._id ? response.data : t))
      );
    }
  }

  async clearCompletedTodos() {
    const completedTodos = this.todos$.value.filter((t) => t.completed);
    for (let todo of completedTodos) {
      const response = await lastValueFrom(
        this.http.delete<AddTodoAnswer>(
          environment.apiUrl + '/task/' + todo._id,
          {
            headers: {
              Authorization: 'Bearer ' + this.userService.token$.value,
            },
          }
        )
      );
    }
    this.todos$.next(
      this.todos$.value.filter(
        (t) => !completedTodos.some((ct) => ct._id == t._id)
      )
    );
  }
}
