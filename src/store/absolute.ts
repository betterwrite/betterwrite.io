import { AbsoluteState } from '@/types/absolute'
import { defineStore } from 'pinia'

export const useAbsoluteStore = defineStore('absolute', {
  state: (): AbsoluteState => {
    return {
      project: {
        new: false,
      },
      modal: {
        newProject: false,
      },
      aside: true,
      shortcuts: {
        switcher: false,
        finder: false,
      },
      logger: false,
      pdf: {
        configuration: false,
        preview: false,
      },
      auth: {
        dropbox: false,
      },
      commands: false,
      load: false,
    }
  },
})
