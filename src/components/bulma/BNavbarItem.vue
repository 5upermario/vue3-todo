<template>
  <a v-if="!to" class="navbar-item">
    <slot />
  </a>

  <router-link v-else :to="to" class="navbar-item">
    <slot />
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    to: {
      type: [Object, String],
      default: null,
    },
  },
});
</script>
