import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Todo } from "models/todo";
import { TodoService } from "services/todo.service";

@inject(TodoService, Router)
export class Edit {
  private isloading: boolean = false;
  private errormsg: string = "";
  private todo: Todo;
  constructor(private todoService: TodoService, private router: Router) {

  }
  async activate(params, routeConfig, navigationInstruction) {
    try {
      this.todo = await this.todoService.getTodo(params.id);
    } catch (error) {
      alert("Todo with the given id could not be found");
      this.router.navigateToRoute("home");
    }
  }

  async editClick() {

    this.isloading = true;
    this.errormsg = "";
    this.todo.due = new Date(this.todo.due).toISOString();
    try {
      await this.todoService.updateTodo(this.todo);
      this.router.navigateToRoute("home");
    } catch (err) {
      this.isloading = false;
      this.errormsg = "Error while creating Todo";
    }
  }
}
