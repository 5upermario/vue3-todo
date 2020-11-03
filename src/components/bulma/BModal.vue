<template>
  <div class="modal" :class="{'is-active': modelValue}">
    <div class="modal-background" />

    <div class="modal-content">
      <slot />
    </div>

    <button
      v-if="closeButton"
      class="modal-close is-large"
      aria-label="close"
      @click="$emit('update:modelValue', false)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';

export default defineComponent({
  props: {
    closeButton: {
      type: Boolean,
      default: false,
    },

    modelValue: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    watch(() => props.modelValue, (value) => {
      if (value) {
        document.getElementsByTagName('body')[0].classList.add('is-clipped');
      } else if (document.querySelector('.modal.is-active') === null) {
        document.getElementsByTagName('body')[0].classList.remove('is-clipped');
      }
    });

    return {};
  },
});
</script>
