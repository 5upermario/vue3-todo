<template>
  <label style="flex: 1;">
    <input
      type="checkbox"
      v-bind="$attrs"
      :checked="modelValue"
      @change="onChange"
      style="display: none;"
    >
    <i
      :class="modelValue ? 'fas fa-check-square' : 'far fa-square'"
      style="cursor: pointer;"
    />

    <span
      :style="{textDecoration: checkedLineThrough && modelValue ? 'line-through' : 'none'}"
      class="ml-2"
    >
      {{ label }}
    </span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  inheritAttrs: false,

  props: {
    label: {
      type: String,
      default: '',
    },

    modelValue: {
      type: Boolean,
    },

    checkedLineThrough: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onChange() {
      this.$emit('update:modelValue', !this.modelValue);
      this.$emit('change');
    },
  },
});
</script>
