import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { Todo } from './todo';

@Injectable({ providedIn: 'root' })
export class TodoStore {
  todos: WritableSignal<Todo[]> = signal([]);

  activeTodos = computed(() => this.todos().filter((todo) => !todo.completed));
  completedTodos = computed(() =>
    this.todos().filter((todo) => todo.completed)
  );

  addItem(title: string): void {
    const todo: Todo = {
      title,
      completed: false,
    };
    this.todos.update((todos) => [...todos, todo]);
  }

  removeItem(todo: Todo): void {
    this.todos.update((todos) => todos.filter((t) => t !== todo));
  }

  clearCompleted(): void {
    this.todos.update((todos) => todos.filter((todo) => !todo.completed));
  }

  toggleItem(todo: Todo): void {
    this.todos.update((todos) =>
      todos.map((t) => (t === todo ? { ...t, completed: !t.completed } : t))
    );
  }

  toggleAll(completed: boolean): void {
    this.todos.update((todos) => todos.map((todo) => ({ ...todo, completed })));
  }

  updateItem(todo: Todo): void {
    this.todos.update((todos) =>
      todos.map((t) => (t === todo ? { ...t, title: todo.title } : t))
    );
  }

  getItems(type = 'all'): Todo[] {
    switch (type) {
      case 'active':
        return this.activeTodos();
      case 'completed':
        return this.completedTodos();
    }

    return this.todos();
  }
}
