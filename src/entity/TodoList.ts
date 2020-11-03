import { v4 as uuidv4 } from 'uuid';
import TodoItem from './TodoItem';

export default class TodoList {
  private id: string;

  private title: string;

  private description: string;

  private items: TodoItem[];

  private dueDate: Date|null;

  constructor(
    id?: string,
    title?: string,
    description?: string,
    items?: Array<TodoItem>,
    dueDate?: Date|null,
  ) {
    this.id = id || uuidv4();
    this.title = title || '';
    this.description = description || '';
    this.items = items || [];
    this.dueDate = dueDate || null;
  }

  public getId(): string {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }

  public getItems(): TodoItem[] {
    return this.items;
  }

  public addItem(item: TodoItem): void {
    this.items.push(item);
  }

  public removeItem(removable: TodoItem): void {
    const index = this.items.findIndex((item) => item.getId() === removable.getId());
    this.items.splice(index, 1);
  }

  public getDueDate(): Date|null {
    return this.dueDate;
  }
}
