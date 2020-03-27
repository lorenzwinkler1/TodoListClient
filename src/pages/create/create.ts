import { Todo } from "models/todo";
import { TodoService } from "services/todo.service";
import { Router } from 'aurelia-router';
import { inject } from 'aurelia-framework';

@inject(TodoService, Router)
export class Create {
  private todo: Todo;
  constructor(private todoService: TodoService, private router: Router) {

  }
  activate(params, routeConfig, navigationInstruction) {
    this.todo = {
      id: 0,
      title: "",
      due: null,
      created: (<any>new Date()).addHours(1),
      isDone: false,
    }
  }
  private async createClick() {
    this.todo.due = new Date(this.todo.due).toISOString();
    await this.todoService.createTodo(this.todo);
    this.router.navigateToRoute("home");
  }
}
