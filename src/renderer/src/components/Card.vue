<template>
  <section class="shadow-sm">
    <h2>{{ props.title }}</h2>
    <slot />
  </section>
</template>

<script setup lang="ts">
interface Props {
  title: string
}
const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
section {
  @apply bg-white m-3 p-3 rounded-sm;

  h2 {
    @apply text-slate-700 text-sm mb-2 opacity-80;
  }
}
</style>
