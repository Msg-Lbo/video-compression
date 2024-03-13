<template>
  <main class="flex justify-center">
    <el-button type="primary" size="small" @click="stop" :disabled="!config.files.length">停止转码</el-button>
    <el-button type="danger" size="small" @click="removeAll" :disabled="!config.files.length">
      全部取消
    </el-button>
    <el-button type="warning" size="small" @click="resetAllVideo" :disabled="!config.files.length">
      全部重置
    </el-button>
  </main>
</template>

<script setup lang="ts">
import useVideos from '@renderer/composables/useVideos'
import useConfigStore from '@renderer/store/useConfigStore'
const { removeAll, resetAllVideo } = useVideos()
const { config } = useConfigStore()
const stop = () => {
  window.api.stop()
}
</script>

<style lang="scss" scoped></style>
