<template>
  <button :class="$style.button" :disabled="disabled" @click="handlePress">
    <slot />
  </button>
</template>

<script setup>
import { useCoreStore } from '@/store';

console.log({ useCoreStore });
const store = useCoreStore();
console.log({ store });

defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['press']);

const handlePress = (event) => {
  emit('press', { event });
};
</script>

<style lang="scss" module>
.button {
  // prettier-ignore
  --height: 32px;

  height: var(--height);
  padding: 8px 16px;
  font-size: 16px;
  color: #063;
  cursor: pointer;
  user-select: none;
  // prettier-ignore
  border: 1px solid currentColor;
  border-radius: calc(var(--height) / 2);

  &[disabled] {
    pointer-events: none;
    filter: saturate(0) opacity(0.5);
  }
}
</style>
