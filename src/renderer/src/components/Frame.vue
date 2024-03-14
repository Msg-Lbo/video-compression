<template>
  <main class="bg-white p-3">
    <div class="grid grid-cols-2 gap-2">
      <el-select v-model="config.size" placeholder="" :disabled="isRun">
        <el-option v-for="(item, index) in config.sizes" :key="index" :label="item" :value="item">
        </el-option>
      </el-select>

      <el-select v-model="config.frame" placeholder="" :disabled="isRun">
        <el-option v-for="(item, index) in config.frames" :key="index" :label="item" :value="item">
        </el-option>
      </el-select>
    </div>
    <div>
      <el-slider
        v-model="config.bitrate"
        :min="500"
        :max="10000"
        :step="500"
        :format-tooltip="formatTooltip"
        :disabled="isRun"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import useCompress from '@renderer/composables/useCompress';
import useConfigStore from '@renderer/store/useConfigStore'
const { config } = useConfigStore()
const { isRun } = useCompress()

const formatTooltip = (val: number) => {
  return val + 'k'
}
</script>

<style lang="scss" scoped></style>
