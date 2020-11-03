import { v4 as uuidv4 } from 'uuid';

export default class TodoItem {
  private id: string

  private title: string

  private description: string

  private done: boolean

  private deadline: Date|null

  constructor(
    id?: string,
    title?: string,
    description?: string,
    done?: boolean,
    deadline?: Date|null,
  ) {
    this.id = id || uuidv4();
    this.title = title || '';
    this.description = description || '';
    this.done = done || false;
    this.deadline = deadline || null;
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

  get isDone(): boolean {
    return this.done;
  }

  set isDone(done: boolean) {
    this.done = done;
  }

  public getDeadline(): Date|null {
    return this.deadline;
  }
}
