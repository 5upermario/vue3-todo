import TodoList from '@/entity/TodoList';
import TodoItem from '@/entity/TodoItem';
import SuccessResponse from '@/util/SuccessResponse';

interface TodoService {
  loadLists(): Promise<Array<TodoList>>;
  getList(id: string): Promise<TodoList>;
  addList(list: TodoList): Promise<SuccessResponse>;
  removeList(id: string): Promise<SuccessResponse>;
  addListItem(id: string, item: TodoItem): Promise<SuccessResponse>;
  deleteListItem(id: string, item: TodoItem): Promise<SuccessResponse>;
  search(searchText: string): Promise<Array<TodoList>>;
}

export default TodoService;
