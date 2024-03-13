<template>
  <main class="">
    <Card title="分辨率">
      <FrameSizeSet
        showInput
        buttonType="primary"
        type="size"
        placeholder="分辨率"
        tip="请输入如:1920x1080的格式"
      />
    </Card>
    <Card title="视频帧率">
      <FrameSizeSet
        showInput
        buttonType="primary"
        type="frame"
        placeholder="视频帧率"
        tip="请设置如:24的数值"
      />
    </Card>
    <Card title="输出目录">
      <div class="flex items-center gap-2">
        <el-input v-model="config.videoSavePath" disabled placeholder="请选择输出目录" clearable />
        <el-button type="primary" size="default" @click="selectDirectory">选择</el-button>
      </div>
    </Card>
    <!-- <el-select v-model="frame">
      <el-option v-for="(item, index) in frames" :key="index" :label="item" :value="item">
      </el-option>
    </el-select> -->
  </main>
</template>

<script setup lang="ts">
import useConfigStore from '@renderer/store/useConfigStore'
const { config } = useConfigStore()

const selectDirectory = async () => {
  const res = await window.api.selectDirectory()
  if (res) {
    config.videoSavePath = res
  }
}
</script>

<style lang="scss" scoped></style>
