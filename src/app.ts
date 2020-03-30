import { TodoService } from 'services/todo.service';
import { inject } from 'aurelia-framework';
import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';

@inject(TodoService)
export class App {
  public router: Router;

  public errors: string[] = [];
  public errorsexpanded = false;

  constructor(private todoService: TodoService) {
    todoService.onErrorMessage((message) => {

      this.errors.push(message);
      let temp = this.errors;
      this.errors = [];
      this.errors = temp;

      // setTimeout(() => {
      //   this.errors = this.errors.filter((item) => item != message);
      // }, 5000);
    })
  }

  toggleerrorlist(){
    this.errorsexpanded=!this.errorsexpanded;
  }

  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.title = 'Title';
    config.map([
      { route: ['', 'home'], name: 'home', moduleId: PLATFORM.moduleName('pages/home/home'), nav: true, title: 'Home' },
      { route: 'create', name: 'create', moduleId: PLATFORM.moduleName('pages/create/create'), nav: true, title: 'Create' },
      { route: 'edit', name: 'edit', moduleId: PLATFORM.moduleName('pages/edit/edit'), title: 'Edit' },

    ]);


    (<any>Date.prototype).addHours = function (h) {
      this.setHours(this.getHours() + h);
      return this;
    }
  }
}
