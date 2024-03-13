<template>
  <main>
    <section
      class="video"
      :style="`--process:${video.progress >= 100 ? 100 : video.progress}%;--bgColor:${bgColor(video)}`"
    >
      <div class="text">
        {{ video.name }}--{{ video.status }}--{{ video.progress }}
      </div>
      <div class="icon">
        <close-one theme="outline" size="16" @click="remove(index)" />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { CloseOne } from '@icon-park/vue-next'
import useVideos from '@renderer/composables/useVideos'
import { VideoType } from '@renderer/types'
const { video } = defineProps<{ video: VideoType; index: number }>()
const { remove, bgColor } = useVideos()
</script>

<style lang="scss" scoped>
.video {
  @apply bg-white px-3 py-2 rounded-[2px] mb-2 mx-3 text-slate-600 text-xs flex justify-between items-center relative z-10;

  &::after {
    content: '';
    @apply absolute top-0 left-0 right-0 bottom-0 rounded-[2px] -z-10 duration-300 transition-all ease-in-out;
    width: var(--process);
    background-color: var(--bgColor);
  }
  // &::before{
  //   content: '';
  //   @apply w-[100%] h-[100%] absolute  left-0 bottom-0 rounded-[2px] -z-10;
  //   border-bottom: 2px solid var(--bgColor);
  // }
  .text {
    @apply truncate;
  }

  .icon {
    @apply text-slate-500 opacity-50 hover:text-red-500 hover:opacity-90 cursor-pointer duration-300 flex justify-center items-center;

    &:hover {
      transform: scale(1.25);
    }

    .i-icon {
      @apply w-4 h-4;
    }
  }
}
</style>
