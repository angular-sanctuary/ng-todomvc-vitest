import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { TodoStore } from '../todo-store';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  private route = inject(ActivatedRoute);
  private todoStore = inject(TodoStore);

  protected todos = this.todoStore.todos;
  protected activeTodos = this.todoStore.activeTodos;
  protected completedTodos = this.todoStore.completedTodos;
  
  protected filter = toSignal(
    this.route.queryParams.pipe(map((params) => params['filter'] || 'all'))
  );

  protected clearCompleted(): void {
    this.todoStore.clearCompleted();
  }
}
