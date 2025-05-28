import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { TodoStore } from '../todo-store';
import { TodoItem } from '../todo-item/todo-item';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { Todo } from '../todo';

@Component({
  selector: 'app-list',
  imports: [TodoItem],
  templateUrl: './todo-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoList {
  private route = inject(ActivatedRoute);
  private todoStore = inject(TodoStore);

  protected todos = computed(() => this.todoStore.getItems(this.filter()));
  protected activeTodos = this.todoStore.activeTodos;

  protected filter = toSignal(
    this.route.queryParams.pipe(map((params) => params['filter'] || 'all'))
  );

  protected removeTodo(todo: Todo): void {
    this.todoStore.removeItem(todo);
  }

  protected toggleTodo(todo: Todo): void {
    this.todoStore.toggleItem(todo);
  }

  protected updateTodo(todo: Todo): void {
    this.todoStore.updateItem(todo);
  }

  protected toggleAll(e: Event): void {
    const input = e.target as HTMLInputElement;
    this.todoStore.toggleAll(input.checked);
  }
}
