<template>
  <b-navbar>
    <template v-slot:start>
      <b-navbar-item>
        <b-text-field v-model="searchText" placeholder="Search..." fill />
      </b-navbar-item>
    </template>

    <template v-slot:end>
      <b-navbar-item to="/">Home</b-navbar-item>
      <b-navbar-item>Logout</b-navbar-item>

      <b-navbar-item>
        <i class="fas fa-cog fa-lg" />
      </b-navbar-item>
    </template>
  </b-navbar>

  <section class="main-content columns is-fullheight">
    <b-menu :items="$store.state.todoLists.map(list => ({
      title: list.getTitle(),
      to: '/' + list.getId()
    }))">
      <template v-slot:prepend>
        <button
          class="button is-fullwidth"
          v-if="!showCreateTodoListBox"
          @click="showCreateTodoListTitle"
        >
          New Todo List
        </button>

        <b-text-field
          v-else
          id="createTodoListTitle"
          placeholder="Create Todo List"
          v-model="newTodoListTitle"
          @keyup.enter="createTodoList"
        />
      </template>
    </b-menu>

    <div class="container column">
      <div class="section">
        <router-view/>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {
  computed, defineComponent, nextTick, ref,
} from 'vue';
import { useRouter } from 'vue-router';
import BNavbar from './components/bulma/BNavbar.vue';
import BNavbarItem from './components/bulma/BNavbarItem.vue';
import BMenu from './components/bulma/BMenu.vue';
import BTextField from './components/bulma/BTextField.vue';
import { ActionTypes, MutationTypes, useStore } from './store';

export default defineComponent({
  components: {
    BNavbar,
    BNavbarItem,
    BMenu,
    BTextField,
  },

  setup() {
    const store = useStore();
    const router = useRouter();
    const searchText = computed({
      get: () => store.state.searchText,
      set: (value) => {
        store.commit(MutationTypes.SET_SEARCH_TEXT, value);

        if (value !== '' && router.currentRoute.value.name !== 'search') {
          router.push({ name: 'search' });
        }
      },
    });
    const showCreateTodoListBox = ref(false);
    const newTodoListTitle = ref('');
    const todoLists = computed(() => store.state.todoLists);

    store.dispatch(ActionTypes.LOAD_TODO_LISTS);

    const createTodoList = () => {
      store.dispatch(
        ActionTypes.CREATE_TODO_LIST,
        { title: newTodoListTitle.value },
      ).then(() => {
        showCreateTodoListBox.value = false;
        newTodoListTitle.value = '';
      });
    };

    const showCreateTodoListTitle = () => {
      showCreateTodoListBox.value = !showCreateTodoListBox.value;

      nextTick(() => {
        const el = document.getElementById('createTodoListTitle');

        if (el) {
          el.focus();
        }
      });
    };

    return {
      searchText,
      showCreateTodoListBox,
      newTodoListTitle,
      todoLists,
      createTodoList,
      showCreateTodoListTitle,
    };
  },
});
</script>
