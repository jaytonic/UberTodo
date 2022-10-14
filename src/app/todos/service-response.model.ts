import { Todo } from './todo.model';
export interface GetTodosAnswer {
    count: number;
    data: Todo[];
  }
  
  export interface AddTodoAnswer {
    success: boolean;
    data: Todo
  }