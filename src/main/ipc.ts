import { IpcMainInvokeEvent, ipcMain } from "electron";
import Ffmpeg from "./ffmpeg";
import { CompressOptions } from './../renderer/src/types'
import { selectDirectory } from "./directory";

let ffmpeg = null as Ffmpeg | null
ipcMain.handle('compress', async (event: IpcMainInvokeEvent, options: CompressOptions) => {
    const compress = new Ffmpeg(event, options)
    ffmpeg = compress
    compress.run()
})

ipcMain.on('stop', () => {
    ffmpeg?.stop()
})

ipcMain.handle('selectDirectory', async (_event: IpcMainInvokeEvent) => {
    return selectDirectory()
})