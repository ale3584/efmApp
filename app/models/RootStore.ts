import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthenticationStoreModel } from "./AuthenticationStore" // @demo remove-current-line
import { AuthStoreModel } from "./AuthStore"
import { PlayerStoreModel } from "./PlayerStore"
import { PlayerModel } from "./Player"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  authStore: types.optional(AuthStoreModel, { error: []}),
  playerStore: types.optional(PlayerStoreModel, {players:[],player: PlayerModel.create(), isLoading: false, error: null, isEndReached: false}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
