import { BrowserWindow, IpcMainInvokeEvent, dialog } from "electron";
import ffmpegPath from '@ffmpeg-installer/ffmpeg'
import ffprobePath from '@ffprobe-installer/ffprobe'
import ffmpeg from 'fluent-ffmpeg'
import { CompressOptions, MainProgressNoticeType } from "../renderer/src/types";
import path from "path";
import { existsSync } from "fs";

ffmpeg.setFfmpegPath(ffmpegPath.path)
ffmpeg.setFfprobePath(ffprobePath.path)



export default class Ffmpeg {
    ffmpeg: ffmpeg.FfmpegCommand
    window: BrowserWindow
    constructor(
        private event: IpcMainInvokeEvent,
        private options: CompressOptions
    ) {
        this.ffmpeg = ffmpeg(this.options.file.path)
        this.window = BrowserWindow.fromWebContents(this.event.sender)!
    }


    progressEvent(progress) {
        this.window.webContents.send(
            'mainProcessNotice',
            MainProgressNoticeType.PROGRESS,
            progress.percent
        )
        console.log(`Processing: ${progress.percent}% done`);
    }
    errorEvent(error) {
        if (error.message.includes('SIGKILL')) return
        this.window.webContents.send(
            'mainProcessNotice',
            MainProgressNoticeType.ERROR,
            error.message
        )
    }
    endEvent() {
        this.window.webContents.send(
            'mainProcessNotice',
            MainProgressNoticeType.END,
            'end'
        )
    }
    private getSaveFilePath() {
        const info = path.parse(this.options.file.name)
        return path.join(this.options.saveDirectory, `${info.name}-${this.options.size}-${this.options.fps}.${this.options.type}`)
    }
    private validate() {
        if (!existsSync(this.options.saveDirectory)) {
            // dialog.showErrorBox('错误', '保存路径不存在')
            this.window.webContents.send(
                'mainProcessNotice',
                MainProgressNoticeType.DIREDCORY_CHECK,
                '保存路径不存在'
            )
            return false
        }
        return true
    }
    stop() {
        try {
            this.ffmpeg.kill('SIGKILL')
            this.window.webContents.send('mainProcessNotice', MainProgressNoticeType.STOP, '用户取消压缩')
        } catch (e) {
            console.log(e);
        }
    }
    run() {
        if (!this.validate()) return
        this.ffmpeg
            .FPS(this.options.fps)
            .videoCodec('libx264')
            .size(this.options.size)
            .videoBitrate(this.options.bitrate || '500k')
            // 转换格式
            .format(this.options.type)
            // .addOption('-vcodec', 'd3d11va', '-c:v', 'h264_amf', '-preset', 'ultrafast')
            .addOption('-c:v', 'h264_amf', '-preset', 'ultrafast')
            .on('progress', this.progressEvent.bind(this))
            .on('error', this.errorEvent.bind(this))
            .on('end', this.endEvent.bind(this))
            .save(this.getSaveFilePath())
    }
}