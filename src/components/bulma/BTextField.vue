<template>
  <div class="field" :class="{ 'is-loading': loading }">
    <div class="field-label is-normal" v-if="label">
      <label class="label">{{ label }}</label>
    </div>

    <div class="field-body">
      <div class="field">
        <div class="control" :class="{ 'is-expanded': fill }">
          <input
            class="input"
            type="text"
            v-bind="$attrs"
            @input="$emit('update:modelValue', $event.target.value)"
            :value="modelValue"
          >
        </div>
      </div>
    </div>
  </div>
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

    loading: {
      type: Boolean,
      default: false,
    },

    modelValue: {
      type: String,
    },

    fill: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
