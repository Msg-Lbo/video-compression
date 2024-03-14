<template>
  <main class="">
    <section class="flex justify-center gap-2">
      <el-upload
        accept="video/*"
        action="#"
        :http-request="addFile"
        :show-file-list="false"
        multiple
        drag
        class="flex items-center group"
      >
        <div class="button group-hover:bg-[#3498db50] duration-300">
          <plus class="group-hover:text-slate-100 duration-300" theme="outline" size="32" />
        </div>
      </el-upload>
      <div class="button" @click="run">
        <refresh theme="outline" size="32" :class="{ isRun: isRun }" />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { Plus, Refresh } from '@icon-park/vue-next'
import useVideos from '@renderer/composables/useVideos'
import useCompress from '@renderer/composables/useCompress'
const { addFile } = useVideos()
const { run, isRun, progressNotice } = useCompress()
progressNotice()
</script>

<style lang="scss" scoped>
.isRun {
  @apply animate-spin text-slate-300 cursor-wait;
}
.button {
  @apply w-20 h-20 rounded-lg bg-white flex justify-center items-center text-slate-600;

  .i-icon {
    @apply w-8 h-8;
  }
}

:deep(.el-upload-dragger) {
  padding: 0 !important;
  border: none !important;
}
</style>
