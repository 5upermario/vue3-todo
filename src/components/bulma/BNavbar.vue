<template>
  <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
      </a>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        :data-target="id"
      >
        <span aria-hidden="true" v-for="i in 3" :key="i"></span>
      </a>
    </div>

    <div :id="id" class="navbar-menu">
      <div class="navbar-start">
        <slot name="start" />
      </div>

      <div class="navbar-end">
        <slot name="end" />
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    id: {
      type: String,
      default: 'navbar',
    },
  },
});
</script>
