import { ProjectObject } from '@/types/project'
import { useToast } from 'vue-toastification'
import { nextTick } from 'vue'
import { useEnv } from '../env'
import i18n from '@/lang'
import { useProjectStore } from '@/store/project'
import { useEditorStore } from '@/store/editor'
import { useLoggerStore } from '@/store/logger'
import { usePDFStore } from '@/store/pdf'
import useEmitter from '@/use/emitter'
import isElectron from 'is-electron'
import usePlugin from '../plugin/core'

export const useLocalStorage = () => {
  const PROJECT = useProjectStore()
  const EDITOR = useEditorStore()
  const LOGGER = useLoggerStore()
  const PDF = usePDFStore()

  const toast = useToast()
  const env = useEnv()
  const emitter = useEmitter()
  const plugin = usePlugin()
  const { t } = i18n.global

  const set = (obj: ProjectObject, name: string) => {
    localStorage.setItem(env.projectLocalStorage(), JSON.stringify(obj))
  }

  const get = (name: string) => {
    return JSON.parse((localStorage as any).getItem(name))
  }

  const setProject = (obj: ProjectObject) => {
    set(obj, env.projectLocalStorage())
  }

  const getProject = (): ProjectObject => {
    const _ = get(env.projectLocalStorage())

    // <= v0.3.10
    if (_.project?.pages[0]?.entity) {
      _.project?.pages.forEach((target: any) => {
        target['entities'] = target['entity']
        delete target['entity']
      })
    }

    // <= 0.4.0
    if (!_.project.bw) {
      _.project.bw = {
        platform: isElectron() ? 'desktop' : 'web',
        version: env.packageVersion(),
      }
    }

    return _
  }

  const onSaveProject = async () => {
    if (PROJECT.name === env.projectEmpty()) return

    emitter.emit('project-save')
    await nextTick

    setProject({
      project: PROJECT.$state,
      editor: EDITOR.$state,
      logger: LOGGER.$state,
      pdf: {
        styles: PDF.styles,
        fonts: [],
        normalize: {},
      },
    })

    toast.success(t('toast.project.save'))
  }

  const onAutoSave = (time: number | 'never') => {
    if (time === 'never') return null

    return setInterval(() => {
      if (PROJECT.name === env.projectEmpty()) return

      setProject({
        project: PROJECT.$state,
        editor: EDITOR.$state,
        logger: LOGGER.$state,
        pdf: {
          styles: PDF.styles,
          fonts: [],
          normalize: {},
        },
      })

      plugin.emit('plugin-auto-save')
    }, 1000 * 60 * (time as number))
  }

  return {
    set,
    get,
    setProject,
    getProject,
    onSaveProject,
    onAutoSave,
  }
}
