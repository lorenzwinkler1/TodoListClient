import { bindable, customElement } from 'aurelia-framework';
import {Todo} from '../../models/todo';

@customElement("app-editable-todo")
export class EditableTodoComponent {
    @bindable todo: Todo = null;
}