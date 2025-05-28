import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoStore } from '../todo-store';

@Component({
  selector: 'app-header',
  imports: [FormsModule],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private todoStore = inject(TodoStore);

  protected title = signal('');

  protected addTodo(): void {
    if (this.title()) {
      this.todoStore.addItem(this.title());

      // Reset title to clear input field.
      this.title.set('');
    }
  }
}
