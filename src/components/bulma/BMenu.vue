<template>
  <aside
    class="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile"
    style="min-width: 330px;"
  >
    <slot name="prepend" />

    <ul class="menu-list">
      <li v-for="(item, index) in items" :key="index">
        <router-link v-if="item.to" :to="item.to">{{ item.title }}</router-link>

        <span v-else>{{ item.title }}</span>

        <ul v-if="item.items">
          <li v-for="(subItem, subIndex) in item.items" :key="subIndex">
            <router-link v-if="subItem.to" :to="subItem.to">{{ subItem.title }}</router-link>

            <span v-else>{{ subItem.title }}</span>
          </li>
        </ul>
      </li>
    </ul>

    <slot name="append" />
  </aside>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface MenuItem {
  to: string;
  title: string;
  items?: Array<MenuItem>;
}

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<Array<MenuItem>>,
      default: () => [],
    },
  },
});
</script>
