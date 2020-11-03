import TodoItem from '@/entity/TodoItem';
import TodoList from '@/entity/TodoList';
import LocalStorageTodoService from '@/service/LocalStorageTodoService';

describe('LocalStorageTodoService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('loadLists', () => {
    it('should load empty list when nothing saved before', async () => {
      // setup
      const service = new LocalStorageTodoService();

      // run
      const result = await service.loadLists();

      // assert
      expect(result.length).toBe(0);
    });

    it('should load saved lists', async () => {
      // setup
      const lists = [
        new TodoList(undefined, 'Test 1', '', [new TodoItem(undefined, 'Item 1', '', false, null), new TodoItem(undefined, 'Item 2', '', false, null)]),
        new TodoList(undefined, 'Test 2', '', [new TodoItem(undefined, 'Item 3', '', false, null)]),
        new TodoList(undefined, 'Test 3'),
      ];
      localStorage.setItem('todo-lists', JSON.stringify(lists));

      const service = new LocalStorageTodoService();

      // run
      const result = await service.loadLists();

      // assert
      expect(result.length).toBe(3);
      expect(result).toEqual(lists);
    });
  });

  describe('getList', () => {
    it('should not load anything when list not found', async () => {
      // setup
      const lists = [
        new TodoList(undefined, 'Test 1', '', [new TodoItem(undefined, 'Item 1', '', false, null), new TodoItem(undefined, 'Item 2', '', false, null)]),
        new TodoList(undefined, 'Test 2', '', [new TodoItem(undefined, 'Item 3', '', false, null)]),
        new TodoList(undefined, 'Test 3'),
      ];
      const service = new LocalStorageTodoService(lists);

      // run
      const result = await service.getList('asdf');

      // assert
      expect(result).toBeUndefined();
    });

    it('should load the correct list', async () => {
      // setup
      const lists = [
        new TodoList(undefined, 'Test 1', '', [new TodoItem(undefined, 'Item 1', '', false, null), new TodoItem(undefined, 'Item 2', '', false, null)]),
        new TodoList('asdf', 'Test 2', '', [new TodoItem('asdf', 'Item 3', '', false, null)]),
        new TodoList(undefined, 'Test 3'),
      ];
      const service = new LocalStorageTodoService(lists);

      // run
      const result = await service.getList('asdf');

      // assert
      expect(result).toEqual(new TodoList('asdf', 'Test 2', '', [new TodoItem('asdf', 'Item 3', '', false, null)]));
    });
  });

  describe('addList', () => {
    it('should add list to empty state', async () => {
      // setup
      const service = new LocalStorageTodoService();

      // run
      await service.addList(new TodoList('kkkk', 'Test 1'));

      // assert
      const lists = JSON.parse(localStorage.getItem('todo-lists') || '{}');
      expect(lists).toEqual([new TodoList('kkkk', 'Test 1')]);
    });

    it('should add list', async () => {
      // setup
      const lists = [
        new TodoList(undefined, 'Test 1', '', [new TodoItem(undefined, 'Item 1', '', false, null), new TodoItem(undefined, 'Item 2', '', false, null)]),
        new TodoList('asdf', 'Test 2', '', [new TodoItem('asdf', 'Item 3', '', false, null)]),
        new TodoList(undefined, 'Test 3'),
      ];
      const service = new LocalStorageTodoService(lists);

      // run
      await service.addList(new TodoList('kkkk', 'Test 1'));

      // assert
      const result = JSON.parse(localStorage.getItem('todo-lists') || '{}');
      expect(result.length).toBe(4);
      expect(result[3].id).toBe('kkkk');
    });
  });

  describe('removeList', () => {
    it('should hide when delete by wrong id', async () => {
      // setup
      const service = new LocalStorageTodoService();

      // run
      const result = await service.removeList('asdf');

      // assert
      expect(result.success).toBe(true);
    });

    it('should remove list correctly', async () => {
      // setup
      const lists = [
        new TodoList('test1', 'Test 1', '', [new TodoItem(undefined, 'Item 1', '', false, null), new TodoItem(undefined, 'Item 2', '', false, null)]),
        new TodoList('test2', 'Test 2', '', [new TodoItem('asdf', 'Item 3', '', false, null)]),
        new TodoList('test3', 'Test 3'),
      ];
      const service = new LocalStorageTodoService(lists);

      // run
      const result = await service.removeList('test2');

      // assert
      expect(result.success).toBe(true);
      const savedLists = JSON.parse(localStorage.getItem('todo-lists') || '{}');
      expect(savedLists[0].id).toEqual('test1');
      expect(savedLists[1].id).toEqual('test3');
    });
  });
});
