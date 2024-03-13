import { ElectronAPI } from '@electron-toolkit/preload'
import { ComPressOptions } from '@renderer/types'
declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      compress: (options: ComPressOptions) => void
      selectDirectory: () => Promise<any>
      // progressNotice: (callback: (progress: number) => void) => void
      mainProcessNotice: (callback: (type: MainProgressNotice, data: any) => void) => void
      stop: () => void
    }
  }
}
