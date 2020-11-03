import TodoItem from '@/entity/TodoItem';
import TodoList from '@/entity/TodoList';
import SuccessResponse from '@/util/SuccessResponse';
import TodoService from './TodoService';

interface TodoItemResponse {
  id?: string;
  title?: string;
  description?: string;
  done?: boolean;
  deadline?: string;
}

interface TodoListResponse {
  id?: string;
  title?: string;
  description?: string;
  items?: Array<TodoItemResponse>;
  dueDate?: string;
}

export default class LocalStorageTodoService implements TodoService {
  private lists: Array<TodoList>;

  constructor(lists?: Array<TodoList>) {
    this.lists = lists || [];
  }

  public loadLists(): Promise<Array<TodoList>> {
    this.lists = [];

    return new Promise<Array<TodoList>>((resolve) => {
      const result = JSON.parse(localStorage.getItem('todo-lists') || '[]');

      this.lists = result.map(
        (list: TodoListResponse) => new TodoList(
          list.id,
          list.title,
          list.description,
          list.items?.map(
            (item: TodoItemResponse) => new TodoItem(
              item.id,
              item.title,
              item.description,
              item.done,
              item.deadline ? new Date(item.deadline) : null,
            ),
          ),
          list.dueDate ? new Date(list.dueDate) : null,
        ),
      );

      resolve(this.lists);
    });
  }

  private saveLists(): Promise<SuccessResponse> {
    return new Promise<SuccessResponse>((resolve) => {
      localStorage.setItem('todo-lists', JSON.stringify(this.lists));

      resolve({ success: true });
    });
  }

  public getList(id: string): Promise<TodoList> {
    return new Promise<TodoList>((resolve) => {
      const list = this.lists.find((l: TodoList) => l.getId() === id);
      resolve(list);
    });
  }

  public addList(list: TodoList): Promise<SuccessResponse> {
    this.lists.push(list);

    return this.saveLists();
  }

  public removeList(id: string): Promise<SuccessResponse> {
    const index = this.lists.findIndex((list) => list.getId() === id);

    if (index === -1) {
      return Promise.resolve({ success: true });
    }

    this.lists.splice(index, 1);

    return this.saveLists();
  }

  public addListItem(id: string, item: TodoItem): Promise<SuccessResponse> {
    const list = this.lists.find((listF: TodoList) => listF.getId() === id);

    if (list) list.addItem(item);

    return this.saveLists();
  }

  public deleteListItem(id: string, item: TodoItem): Promise<SuccessResponse> {
    const list = this.lists.find((listF: TodoList) => listF.getId() === id);

    if (list) list.removeItem(item);

    return this.saveLists();
  }

  public search(searchText: string): Promise<Array<TodoList>> {
    const result: Array<TodoList> = new Array<TodoList>();

    this.lists.map((list) => {
      const filteredItems = list.getItems().filter(
        (item) => item.getTitle().indexOf(searchText) !== -1
          || item.getDescription().indexOf(searchText) !== -1,
      );

      if (filteredItems.length > 0) {
        result.push(new TodoList(
          list.getId(),
          list.getTitle(),
          list.getDescription(),
          filteredItems,
          list.getDueDate(),
        ));
      }

      return false;
    });

    return Promise.resolve(result);
  }
}
