import useConfigStore from "@renderer/store/useConfigStore"
import { MainProgressNoticeType, VideoState, VideoType } from "@renderer/types"
import { ElMessage } from "element-plus"
import { ref, toRefs } from "vue"

export default () => {
    const { config } = useConfigStore()
    const video = ref<VideoType>()
    const { videoSavePath, files } = toRefs(config)
    const isRun = ref(false)

    const validata = () => {
        let message = ''
        let type = ''
        if (videoSavePath.value.trim() === '') message = '请选择保存路径', type = 'error'
        if (files.value.length === 0) message = '请选择视频文件', type = 'error'
        if (!video.value) message = '视频压缩完成', type = 'success'
        if (message) ElMessage[type]({ message, grouping: true })
        return message === ''
    }

    const getCompressFile = () => {
        video.value = config.files.find((video) => video.status === VideoState.READY)
        if (video.value) video.value.status = VideoState.COMPRESS
        else isRun.value = false
    }
    const progressNotice = () => {
        window.api.mainProcessNotice((type: MainProgressNoticeType, data: any) => {
            switch (type) {
                case MainProgressNoticeType.PROGRESS:
                    video.value!.progress = data >= 99.5 ? 100 : data
                    break;
                case MainProgressNoticeType.END:
                    video.value!.status = VideoState.FINISHED
                    compress()
                    break;
                case MainProgressNoticeType.ERROR:
                    ElMessage.error({ message: data, type: 'error', grouping: true })
                    video.value!.status = VideoState.ERROR
                    break;
                case MainProgressNoticeType.DIREDCORY_CHECK:
                    ElMessage.error({ message: data, type: 'error', grouping: true })
                    video.value!.status = VideoState.READY
                    isRun.value = false
                    break;
                case MainProgressNoticeType.STOP:
                    ElMessage.error({ message: data, type: 'warning', grouping: true })
                    video.value!.status = VideoState.ERROR
                    isRun.value = false
                    break;
            }
        })
    }
    const run = () => {
        if (isRun.value) return
        isRun.value = true
        compress()
    }
    progressNotice()
    const compress = () => {
        getCompressFile()
        if (validata() === false) return
        window.api.compress({
            file: { ...video.value! },
            fps: config.frame,
            size: config.size,
            type: config.videoType,
            saveDirectory: config.videoSavePath,
        })
    }
    return { run, isRun }
}