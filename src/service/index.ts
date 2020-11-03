import ServiceLocator from '../util/ServiceLocator';
import LocalStorageTodoService from './LocalStorageTodoService';

export const TODO_SERVICE = 'todo-service';

ServiceLocator.set(TODO_SERVICE, new LocalStorageTodoService());

export default {
};
