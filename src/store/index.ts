import ServiceLocator from '@/util/ServiceLocator';
import { TODO_SERVICE } from '@/service';

import {
  ActionContext,
  ActionTree,
  CommitOptions,
  createLogger,
  createStore,
  DispatchOptions,
  GetterTree,
  MutationTree,
  Store as VuexStore,
} from 'vuex';
import TodoService from '@/service/TodoService';
import TodoList from '@/entity/TodoList';
import SuccessResponse from '@/util/SuccessResponse';
import TodoItem from '@/entity/TodoItem';

const TodoServiceImpl = ServiceLocator.get(TODO_SERVICE) as TodoService;

export type State = {
  todoLists: Array<TodoList>;
  searchText: string;
};

const localState: State = {
  todoLists: new Array<TodoList>(),
  searchText: '',
};

export enum MutationTypes {
  SET_TODO_LISTS = 'setTodoLists',
  SET_SEARCH_TEXT = 'setSearchText',
}

export type Mutations<S = State> = {
  [MutationTypes.SET_TODO_LISTS](state: S, todoLists: Array<TodoList>): void;
  [MutationTypes.SET_SEARCH_TEXT](state: S, searchText: string): void;
}

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_TODO_LISTS](state: State, todoLists: Array<TodoList>): void {
    state.todoLists = todoLists;
  },

  [MutationTypes.SET_SEARCH_TEXT](state: State, searchText: string): void {
    state.searchText = searchText;
  },
};

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>;

export enum ActionTypes {
  LOAD_TODO_LISTS = 'loadTodoLists',
  CREATE_TODO_LIST = 'createTodoList',
  SAVE_TODO_LISTS = 'saveTodoLists',
  GET_TODO_LIST = 'getTodoList',
  ADD_TODO_ITEM = 'addTodoItem',
  DELETE_TODO_ITEM = 'deleteTodoItem',
  SEARCH = 'search',
}

export interface Actions {
  [ActionTypes.LOAD_TODO_LISTS]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.CREATE_TODO_LIST](
    { dispatch }: AugmentedActionContext,
    { title }: {title: string}
  ): Promise<void>;
  [ActionTypes.GET_TODO_LIST](context: AugmentedActionContext, id: string): Promise<TodoList>;
  [ActionTypes.ADD_TODO_ITEM](
    context: AugmentedActionContext,
    data: {listId: string; item: TodoItem}
  ): Promise<SuccessResponse>;
  [ActionTypes.DELETE_TODO_ITEM](
    context: AugmentedActionContext,
    data: {listId: string; item: TodoItem}
  ): Promise<SuccessResponse>;
  [ActionTypes.SEARCH]({ state }: AugmentedActionContext): Promise<Array<TodoList>>;
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.LOAD_TODO_LISTS]({ commit }: AugmentedActionContext) {
    return TodoServiceImpl.loadLists().then((lists) => {
      commit(MutationTypes.SET_TODO_LISTS, lists);
    });
  },

  [ActionTypes.CREATE_TODO_LIST]({ dispatch }, { title }) {
    const list = new TodoList(undefined, title);

    return TodoServiceImpl.addList(list).then(() => dispatch(ActionTypes.LOAD_TODO_LISTS));
  },

  [ActionTypes.GET_TODO_LIST](context, id: string) {
    return TodoServiceImpl.getList(id);
  },

  [ActionTypes.ADD_TODO_ITEM](
    context: AugmentedActionContext,
    data: {listId: string; item: TodoItem},
  ): Promise<SuccessResponse> {
    return TodoServiceImpl.addListItem(data.listId, data.item);
  },

  [ActionTypes.DELETE_TODO_ITEM](
    context: AugmentedActionContext,
    data: {listId: string; item: TodoItem},
  ): Promise<SuccessResponse> {
    return TodoServiceImpl.deleteListItem(data.listId, data.item);
  },

  [ActionTypes.SEARCH]({ state }: AugmentedActionContext): Promise<Array<TodoList>> {
    return TodoServiceImpl.search(state.searchText);
  },
};

export type Getters = {};

export const getters: GetterTree<State, State> & Getters = {};

export type Store = Omit<VuexStore<State>, 'commit' | 'getters' | 'dispatch'> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};

export const store = createStore({
  state: localState,
  mutations,
  actions,
  getters,
  plugins: [createLogger()],
});

export function useStore() {
  return store as Store;
}
