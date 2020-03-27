import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Todo } from "models/todo";
import { TodoService } from "services/todo.service";

@inject(TodoService, Router)
export class Edit {

  private todo: Todo;
  constructor(private todoService: TodoService, private router: Router) {

  }
  async activate(params, routeConfig, navigationInstruction) {
    this.todo = await this.todoService.getTodo(params.id);
    console.log(this.todo);
    console.log(params);
  }

  async editClick(){
    await this.todoService.updateTodo(this.todo);
    this.router.navigateToRoute("home");
  }
}
