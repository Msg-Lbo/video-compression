<template>
  <main class="text-slate-600 bg-gray-50 text-xs flex justify-between px-3 py-2 shadow-sm drag">
    <section class="">萝卜的视频压缩软件</section>
    <section class="flex justify-between gap-2">
      <router-link :to="{ name: 'home' }" class="no-drag">转码</router-link>
      <router-link :to="{ name: 'setting' }" class="no-drag">配置</router-link>
    </section>
  </main>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
