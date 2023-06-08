import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthenticationStoreModel } from "./AuthenticationStore" // @demo remove-current-line
import { createAuthStoreDefaultModel } from "./AuthStore"
import { createPlayerStoreDefaultModel } from "./PlayerStore"
import { createPlayerFiltersDefaultModel } from "./PlayerFilters"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  authStore: createAuthStoreDefaultModel(),
  playerStore: createPlayerStoreDefaultModel(),
  playerFilters: createPlayerFiltersDefaultModel(),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
