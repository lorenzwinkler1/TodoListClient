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
  activate(params, routeConfig, navigationInstruction) {
    this.loadTodos();
  }

  loadTodos() {
    this.finishedloading = false;
    this.todoService.getTodos().then((item) => {
      this.todos = item;
    }).catch(() => {
      this.finishedloading = true;
    });
  }
  editClick(item: Todo) {
    this.router.navigateToRoute('edit', { id: item.id });
  }
  async deleteClick(item: Todo) {
    if (confirm("Do you really want to delete the Item '" + item.title + "'?")) {
      try {
        await this.todoService.deleteTodo(item);
      } catch (err) {
        alert("Error while deleting Todo");
      }
      this.loadTodos();
    }
  }
}
