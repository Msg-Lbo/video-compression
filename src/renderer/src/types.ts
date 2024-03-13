export type DataTypes = 'size' | 'frame' | 'videoType'
export enum MainProgressNoticeType {
    END = 'end',
    ERROR = 'error',
    PROGRESS = 'progress',
    DIREDCORY_CHECK = 'directoryCheck',
    STOP = 'stop'
}

// 视频状态
export enum VideoState {
    READY = 'ready',
    COMPRESS = 'compress',
    ERROR = 'error',
    FINISHED = 'finished'
}

export type VideoType = {
    name: string,
    path: string,
    progress: number,
    status: VideoState
}
// 视频压缩参数
export type CompressOptions = {
    file: VideoType, // 文件路径
    fps: number, // 帧率
    size: string, // 分辨率
    saveDirectory: string, // 保存路径
    type: string, // 视频类型
    bitrate?: string, // 码率
    hardwareAcceleration?: boolean // 是否使用硬件加速
}