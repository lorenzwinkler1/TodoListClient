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

    async activate(params, routeConfig, navigationInstruction) {
        // this.todos = await this.todoService.getTodos();
        this.todos = await this.todoService.getTodos();
        console.log(this.todos);
        this.finishedloading = true;
    }
    editClick(item: Todo) {
        console.log(item);
        this.router.navigateToRoute('edit', { id: item.id });
    }
}