<template>
    <main class="overflow-y-auto h-80">
        <el-scrollbar v-if="config.files.length">
            <video-item v-for="(video, index) in config.files" :key="index" :video="video" :index="index" />
        </el-scrollbar>
        <div class="text-sm opacity-80 text-slate-600 text-center" v-else>压缩列表为空哦</div>
    </main>
</template>

<script setup lang='ts'>
import useConfigStore from '@renderer/store/useConfigStore';
const { config } = useConfigStore();
</script>

<style lang='scss' scoped></style>