import { defineStore } from 'pinia'
import {
  ContextState,
  Entity,
  EntityType,
  ContextActionsUpdateInPage,
  ContextActionSwitchInPage,
  ContextActionSwitchEntityRaw,
  ContextActionNewInExistentEntity,
  ContextActionNewInPage,
  ContextActionNewInPagePosEdit,
  ContextActionAlterInPage,
} from '../types/context'
import { useEnv } from '../use/env'
import { useFormat } from '../use/format'
import { useUtils } from '../use/utils'
import { useProjectStore } from './project'

export const useContextStore = defineStore('context', {
  state: (): ContextState => {
    return {
      id: 0,
      entities: [],
    }
  },
  actions: {
    load(context?: ContextState) {
      const project = useProjectStore()

      if (!context) {
        context = project.pages[0]
      }

      this.id = context.id
      project.pageLoaded = context.id

      this.entities = context.entities
    },
    addInPage(entity: Entity) {
      this.entities.push(entity)
    },
    updateInPage({ entity, raw }: ContextActionsUpdateInPage) {
      const index = this.entities.indexOf(entity)

      if (index === -1 || raw === this.entities[index].raw) return

      if (raw === '') {
        this.entities[index].raw = useEnv().emptyLine()
        this.entities[index].updatedAt = useFormat().actually()
      } else if (raw !== this.entities[index].raw) {
        this.entities[index].raw = raw
        this.entities[index].updatedAt = useFormat().actually()
      }
    },
    removeInPage(entity: Entity) {
      const index = this.entities.indexOf(entity)

      if (index === -1 || entity.type === 'heading-one') return

      this.entities = this.entities.filter(
        (item: Entity) => this.entities.indexOf(item) !== index
      )
    },
    switchInPage({ entity, direction }: ContextActionSwitchInPage) {
      const index = this.entities.indexOf(entity)

      if (index === -1) return

      let sIndex
      direction === 'up' ? (sIndex = index - 1) : (sIndex = index + 1)

      if (
        (sIndex < 0 && direction === 'up') ||
        (sIndex >= this.entities.length && direction === 'down')
      )
        return

      const target = this.entities[sIndex]

      if (entity.type === 'heading-one' || target.type === 'heading-one') return

      const temp = this.entities[index]
      this.entities[index] = target
      this.entities[sIndex] = temp
    },
    switchEntityRaw({ entity, match, raw }: ContextActionSwitchEntityRaw) {
      const index = this.entities.indexOf(entity)

      const result = this.entities[index].raw.replaceAll(match, raw)

      this.entities[index].raw = result
    },
    newInExistentEntity(
      this: ContextState,
      payload: ContextActionNewInExistentEntity
    ) {
      const index = this.entities.indexOf(payload.old)

      if (index === -1) return

      this.entities[index].type = payload.new.type
      this.entities[index].raw = payload.new.raw
      this.entities[index].createdAt = payload.new.createdAt
      this.entities[index].updatedAt = useFormat().actually()
      this.entities[index].external = payload.new.external || {}
    },
    newInPage({ entity, type }: ContextActionNewInPage) {
      const index = this.entities.indexOf(entity as Entity)

      if (index === -1) return

      const target = {
        type: type as string,
        raw: useEnv().emptyLine(),
        createdAt: useFormat().actually(),
        updatedAt: useFormat().actually(),
      } as Entity

      this.entities = useUtils().array().insert(this.entities, index, target)
    },
    newInPagePosEdit({ entity, raw, type }: ContextActionNewInPagePosEdit) {
      const index = this.entities.indexOf(entity as Entity)

      if (index === -1) return

      const target = {
        type: type as string,
        raw: raw || useEnv().emptyLine(),
        createdAt: useFormat().actually(),
        updatedAt: useFormat().actually(),
      } as Entity

      this.entities = useUtils()
        .array()
        .insert(this.entities, index + 1, target)
    },
    alterInPage({ entity, type }: ContextActionAlterInPage) {
      const index = this.entities.indexOf(entity as Entity)

      if (index === -1) return

      this.entities[index].type = type as EntityType
      this.entities[index].raw = entity.raw
      this.entities[index].createdAt = useFormat().actually()
      this.entities[index].updatedAt = useFormat().actually()
      this.entities[index].external = entity.external || {}
    },
    insertRawInExistentEntity(entity: Entity) {
      const index = this.entities.indexOf(entity)

      if (index === -1) return

      const target = this.entities[index - 1]

      if (entity.raw === useEnv().emptyLine()) return

      if (target.raw === useEnv().emptyLine()) {
        this.entities[index - 1].raw = entity.raw
      } else {
        this.entities[index - 1].raw = target.raw + entity.raw
      }
    },
  },
})
