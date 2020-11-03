<template>
  <h2 class="is-size-3">{{ list.getTitle() }}</h2>

  <div v-for="(item, index) in list.getItems()" :key="index" style="display: flex;">
    <b-checkbox
      :label="item.getTitle()"
      v-model="item.isDone"
      @change="onCheckboxChange"
      checkedLineThrough
    />

    <i
      class="fas fa-trash-alt"
      style="color: #ff4466; cursor: pointer;"
      @click="showTodoDeleteConfirm(item)"
    />
  </div>

  <b-text-field v-model="newTodoItemTitle" @keyup.enter="addTodoItem" placeholder="Add new todo" />

  <b-modal v-model="showDeleteModal">
    <div class="card">
      <div class="card-header-title">Are you sure?</div>

      <div class="card-content">
        Are you sure to delete the selected todo item?
      </div>

      <div class="buttons is-right mb-0">
        <button class="button is-text" @click="showDeleteModal = false">Cancel</button>

        <button class="button is-danger" @click="onTodoDelete">Delete</button>
      </div>
    </div>
  </b-modal>
</template>

<script lang="ts">
import TodoItem from '@/entity/TodoItem';
import TodoList from '@/entity/TodoList';
import { ActionTypes, useStore } from '@/store';
import { defineComponent, ref, watch } from 'vue';
import BCheckbox from '../components/bulma/BCheckbox.vue';
import BTextField from '../components/bulma/BTextField.vue';
import BModal from '../components/bulma/BModal.vue';

export default defineComponent({
  components: {
    BCheckbox,
    BTextField,
    BModal,
  },

  props: {
    listId: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const store = useStore();
    const list = ref(new TodoList());
    const newTodoItemTitle = ref('');

    const loadList = () => store.dispatch(ActionTypes.GET_TODO_LIST, props.listId)
      .then((listProp: TodoList) => {
        list.value = listProp;
      });

    loadList();

    watch(() => props.listId, loadList);

    const addTodoItem = () => {
      store.dispatch(ActionTypes.ADD_TODO_ITEM, {
        listId: props.listId, item: new TodoItem(undefined, newTodoItemTitle.value),
      });
      newTodoItemTitle.value = '';
    };

    const onCheckboxChange = () => console.log('change');

    const showDeleteModal = ref(false);
    const currentDeletableTodoItem = ref();

    const showTodoDeleteConfirm = (item: TodoItem) => {
      showDeleteModal.value = true;
      currentDeletableTodoItem.value = item;
    };

    const onTodoDelete = () => {
      showDeleteModal.value = false;
      store.dispatch(
        ActionTypes.DELETE_TODO_ITEM,
        { listId: list.value.getId(), item: currentDeletableTodoItem.value },
      );
    };

    return {
      list,
      newTodoItemTitle,
      loadList,
      addTodoItem,
      onCheckboxChange,
      showDeleteModal,
      showTodoDeleteConfirm,
      onTodoDelete,
    };
  },
});
</script>
