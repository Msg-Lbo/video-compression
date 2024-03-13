<template>
  <main>
    <el-select :placeholder="props.placeholder">
      <el-option v-for="(item, index) in list" :key="index" :value="item">
        <div class="flex justify-between items-center">
          {{ item }}
          <div class="delIcon" @click="remove(props.type, index)" v-if="index > 1 && props.type !== 'videoType'">
            <delete-four theme="outline" size="16" />
          </div>
        </div>
      </el-option>
    </el-select>
    <div class="flex gap-2 mt-2 items-center" v-if="props.showInput">
      <el-input v-model="newValue" :placeholder="tip" @keydown.enter="add(props.type)" clearable></el-input>
      <el-button :type="buttonType" @click="add(props.type)">添加</el-button>
    </div>
  </main>
</template>

<script setup lang="ts">
import useVideo from '@renderer/composables/useFps';
import useConfigStore from '@renderer/store/useConfigStore'
import { DeleteFour } from '@icon-park/vue-next'
import { computed } from 'vue'
import { DataTypes } from '@renderer/types';
const { config } = useConfigStore()
interface Prop {
  type: DataTypes,
  placeholder?: string,
  showInput?: boolean,
  tip?: string,
  buttonType?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
}
const props = defineProps<Prop>()
const list = computed(() => {
  switch (props.type) {
    case 'size':
      return config.sizes;
    case 'frame':
      return config.frames;
    default:
      return [];
  }
})

const { add, newValue, remove } = useVideo()


</script>

<style lang="scss" scoped>
.delIcon {
  @apply text-slate-300 hover:text-red-500 cursor-pointer duration-300;

  &:hover {
    transform: scale(1.25)
  }

  .i-icon {
    @apply w-4 h-4;
  }
}
</style>
