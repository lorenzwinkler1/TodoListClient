import { Todo } from "models/todo";
import { ApiConfig } from "configuration/api.config";
import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(ApiConfig)
export class TodoService {
    private httpClient: HttpClient;
    constructor(private apiConf: ApiConfig) {
        this.httpClient = new HttpClient();

    }

    public async getTodos(): Promise<Todo[]> {
        try {
            let res = await this.httpClient.fetch(this.apiConf.basePath, {
                method: 'get',
            });
            if (res.ok)
                return <Todo[]>(await res.json());
            else
                return null
        } catch (err) {
            return null;
        }
    }
    public async getTodo(id: number) {
        try {
            let res = await this.httpClient.fetch(this.apiConf.basePath, {
                method: 'get',
            });
            return (await res.ok) ? res.json() : null;
        } catch (err) {
            return null;
        }
    }
    public async createTodo(todo: Todo): Promise<Todo> {
        try {
            let res = await this.httpClient.fetch(this.apiConf.basePath, {
                method: 'post',
                body: json(todo),
            });
            return (await res.ok) ? res.json() : null;
        } catch (err) {
            return null;
        }
    }
    public async updateTodo(todo: Todo): Promise<Todo> {
        try {
            let res = await this.httpClient.fetch(this.apiConf.basePath, {
                method: 'put',
                body: json(todo),
            });
            return (await res.ok) ? res.json() : null;
        } catch (err) {
            return null;
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

            return await res.ok;
        } catch (err) {
            return false;
        }
    }
}