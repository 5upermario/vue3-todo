<template>
  <div v-if="searchText">
    <h1>Search results for "{{ searchText }}"</h1>

    <div v-for="list in todoLists" :key="list.getId()">
      <h2>{{ list.getTitle() }}</h2>

      <div
        v-for="item in list.getItems()"
        :key="item.getId()"
      >
        <b-checkbox
          v-model="item.isDone"
          @change="onCheckboxStateChange"
          :label="item.getTitle()"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TodoList from '@/entity/TodoList';
import { ActionTypes, useStore } from '@/store';
import { computed, defineComponent, ref } from 'vue';
import BCheckbox from '../components/bulma/BCheckbox.vue';

export default defineComponent({
  components: {
    BCheckbox,
  },

  setup() {
    const store = useStore();
    const todoLists = ref(new Array<TodoList>());
    const searchText = computed(() => {
      store.dispatch(ActionTypes.SEARCH).then((lists) => {
        todoLists.value = lists;
      });

      return store.state.searchText;
    });
    const onCheckboxStateChange = () => console.log('change');

    return {
      todoLists,
      searchText,
      onCheckboxStateChange,
    };
  },
});
</script>
