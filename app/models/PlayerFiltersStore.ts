import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const PlayerFiltersStoreModel = types
  .model("PlayerFiltersStore")
  .props({})
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface PlayerFiltersStore extends Instance<typeof PlayerFiltersStoreModel> {}
export interface PlayerFiltersStoreSnapshotOut extends SnapshotOut<typeof PlayerFiltersStoreModel> {}
export interface PlayerFiltersStoreSnapshotIn extends SnapshotIn<typeof PlayerFiltersStoreModel> {}
export const createPlayerFiltersStoreDefaultModel = () => types.optional(PlayerFiltersStoreModel, {})
