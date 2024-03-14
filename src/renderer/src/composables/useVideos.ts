import useConfigStore from '@renderer/store/useConfigStore';
import { VideoState, VideoType } from '@renderer/types';
import { ElMessage, UploadRequestOptions } from 'element-plus';
import { ElMessageBox } from 'element-plus'
export default () => {
    const { config } = useConfigStore()
    const addFile = (options: UploadRequestOptions) => {
        const name = options.file.name
        const path = options.file.path
        config.files.push({ name, path, progress: 0, status: VideoState.READY })
    }
    const remove = async (index: number) => {
        try {
            // await ElMessageBox.confirm('确定删除吗?')
            const video = config.files[index]
            if (video.status === VideoState.COMPRESS) {
                ElMessage({ message: '请等待视频压缩完成', type: 'success', grouping: true })
            } else {
                config.files.splice(index, 1)
            }
        } catch (e) {
            console.log(e);
        }
    }
    const removeAll = async () => {
        try {
            await ElMessageBox.confirm('确定全部移除吗?这不会删除您的文件,只是移除它们的记录,您可以重新添加它们。')
            config.files = []
        } catch (e) {
            console.log(e);
        }
    }
    // 全部重置状态
    const resetAllVideo = () => {
        config.files.forEach((video) => {
            video.status = VideoState.READY
            video.progress = 0
        })
    }
    // 视频状态对应的背景颜色
    const bgColor = (video: VideoType) => {
        return {
            [VideoState.READY]: '#fff',
            [VideoState.COMPRESS]: '#f6e58d',
            [VideoState.ERROR]: '#ff7979',
            [VideoState.FINISHED]: '#badc58'
        }[video.status]
    }
    return { addFile, remove, removeAll, bgColor, resetAllVideo }
}