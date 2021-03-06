import { Todo } from "models/todo";
import { ApiConfig } from "configuration/api.config";
import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(ApiConfig)
export class TodoService {
  private httpClient: HttpClient;
  constructor(private apiConf: ApiConfig) {
    this.httpClient = new HttpClient();


    this.httpClient.configure(config => {
      config.withInterceptor({
        request: req => {
          return req;
        },
        response: (response, req) => {

          if (response.ok)
            return response;

          let actionname: string;
          switch (req?.method.toLowerCase()) {
            case "get": {
              actionname = "reading";
              break;
            }
            case "post": {
              actionname = "creating";
              break;
            }
            case "put": {
              actionname = "updating";
              break;
            }
            case "delete": {
              actionname = "deleting";
              break;
            }
            default: {
              actionname = "performing an unknown operation with";
            }
          }

          this.PublishErrorMessage("Error while " + actionname + " an item at url " + req?.url + ": " + response.status + " " + response.statusText);

          return response;
        }

      })
    })
  }

  public async getTodos(): Promise<Todo[]> {
    try {
      let res = await this.httpClient.fetch(this.apiConf.basePath, {
        method: 'get',
      });
      console.log("a");
      if (res.ok)
        return <Todo[]>(await res.json());
      else
        return Promise.reject();
    } catch (err) {
      return Promise.reject();
    }
  }
  public async getTodo(id: number) {
    try {
      let res = await this.httpClient.fetch(this.apiConf.basePath + id, {
        method: 'get',
      })
      return (await res.ok) ? res.json() : Promise.reject();
    } catch (err) {
      return Promise.reject();
    }
  }
  public async createTodo(todo: Todo): Promise<Todo> {
    try {
      let res = await this.httpClient.fetch(this.apiConf.basePath, {
        method: 'post',
        body: json(todo),
      });
      return (await res.ok) ? res.json() : Promise.reject();
    } catch (err) {
      return Promise.reject();
    }
  }
  public async updateTodo(todo: Todo): Promise<Todo> {
    try {
      let res = await this.httpClient.fetch(this.apiConf.basePath, {
        method: 'put',
        body: json(todo),
      });
      return (await res.ok) ? res.json() : Promise.reject();
    } catch (err) {
      return Promise.reject();
    }
  }
  public async deleteTodo(todo: Todo): Promise<boolean> {
    return await this.deleteTodoById(todo.id);
  }
  public async deleteTodoById(id: number): Promise<boolean> {
    try {
      let res = await this.httpClient.fetch(this.apiConf.basePath + id, {
        method: 'delete',
      })

      return await res.ok ? res.ok : Promise.reject();
    } catch (err) {
      return Promise.reject();
    }
  }



  private errormessages: { (message?: string): void; }[] = [];

  public onErrorMessage(handler: { (message?: string): void; }): void {
    this.errormessages.push(handler);
  }
  public offDataUpdated(handler: { (message?: string): void }): void {
    this.errormessages = this.errormessages.filter(h => h !== handler);
  }
  private PublishErrorMessage(message: string) {
    console.log(message);
    this.errormessages.forEach(item => item(message));
  }
}
