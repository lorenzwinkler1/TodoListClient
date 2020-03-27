import { TodoService } from "services/todo.service";
import { inject } from 'aurelia-framework';
import { Todo } from "models/todo";
import { Router } from 'aurelia-router'

@inject(TodoService, Router)
export class Home {
  private todos: Todo[];
  private finishedloading: boolean = false;
  public constructor(private todoService: TodoService, private router: Router) {
  }
  public getColor(todo: Todo): string {
    if (todo.isDone)
      return "bg-success";

    return new Date(todo.due).getTime() < new Date().getTime() ? "bg-danger" : "";
  }
  async activate(params, routeConfig, navigationInstruction) {
    // this.todos = await this.todoService.getTodos();
    this.todos = await this.todoService.getTodos();
    this.finishedloading = true;
  }
  editClick(item: Todo) {
    this.router.navigateToRoute('edit', { id: item.id });
  }
  async deleteClick(item: Todo) {
    if (confirm("Wollen Sie das item '" + item.title + "' wirklich löschen?")) {
      await this.todoService.deleteTodo(item);
      this.todos = await this.todoService.getTodos();
    }
  }
}
