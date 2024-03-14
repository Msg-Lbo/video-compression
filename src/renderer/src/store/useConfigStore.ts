import { VideoType } from '@renderer/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export default defineStore('config', () => {
  const config = ref({
    sizes: ['1920x1080', '1280x720', '800x600', '640x480'],
    size: '1920x1080',
    frames: ['60', '30', '24'],
    frame: '60',
    videoTypes: ['mp4', 'avi', 'webm', 'ogg'],
    videoType: 'mp4',
    bitrate: 500,
    files: [] as VideoType[],
    videoSavePath: ''
  })

  return {
    config
  }
}, {
  persist: {
    paths: ['config.videoSavePath', 'config.sizes', 'config.size', 'config.frames', 'config.frame', 'config.videoType', 'config.bitrate']
  }
})
