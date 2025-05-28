import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TodoList } from './todo-list/todo-list';
import { Footer } from './footer/footer';
import { Header } from './header/header';

@Component({
  selector: 'app-root',
  imports: [Header, TodoList, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
