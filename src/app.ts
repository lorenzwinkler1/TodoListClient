import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';

export class App {
  public router: Router;

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
