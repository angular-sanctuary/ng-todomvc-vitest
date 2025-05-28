import {
  Component,
  ElementRef,
  input,
  output,
  viewChild,
  signal,
  afterNextRender,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../todo';

@Component({
  selector: 'app-item',
  imports: [FormsModule],
  templateUrl: './todo-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItem {
  todo = input.required<Todo>();

  toggle = output<void>();
  update = output<Todo>();
  remove = output<void>();

  protected inputRef = viewChild<ElementRef>('todoInputRef');

  protected title = signal('');
  protected isEditing = signal(false);

  constructor() {
    afterNextRender(() => {
      this.inputRef()?.nativeElement.focus();
    });
  }

  protected toggleTodo(): void {
    this.toggle.emit();
  }

  protected removeTodo(): void {
    this.remove.emit();
  }

  protected startEdit(): void {
    this.isEditing.set(true);
  }

  protected handleBlur(e: Event): void {
    this.isEditing.set(false);
  }

  protected handleFocus(e: Event): void {
    this.title.set(this.todo().title);
  }

  protected updateTodo(): void {
    if (!this.title()) {
      this.remove.emit();
    } else {
      this.update.emit({ ...this.todo(), title: this.title() });
      this.isEditing.set(false);
    }
  }
}
