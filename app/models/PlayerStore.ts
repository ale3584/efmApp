import { Instance, SnapshotIn, SnapshotOut, types, getParent } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { PlayerModel } from "./Player"
import { api } from "../services/api"
import { AuthenticationApi } from "app/services/api/authApi"
import { RootStore } from "./RootStore"

/**
 * Model description here for TypeScript hints.
 */
export const PlayerStoreModel = types
  .model("PlayerStore")
  .props({
    players: types.array(PlayerModel),  
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    async fetchPlayers(refreshToken: string, accessToken: string){
      const authStore = getParent<RootStore>(self).authStore;  
      if(authStore.checkToken()){
        const authenticationApi = new AuthenticationApi(api);
        const response = await authenticationApi.getPlayers(refreshToken, accessToken);
        if (response.kind === "ok") {
          console.log(response.players)
          self.setProp("players", response.players)
        }else {
          console.log(response)
          console.tron.error(`Error fetching players: ${JSON.stringify(response)}`, [])
        }
      }else{
        authStore.logout();
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface PlayerStore extends Instance<typeof PlayerStoreModel> {}
export interface PlayerStoreSnapshotOut extends SnapshotOut<typeof PlayerStoreModel> {}
export interface PlayerStoreSnapshotIn extends SnapshotIn<typeof PlayerStoreModel> {}
export const createPlayerStoreDefaultModel = () => types.optional(PlayerStoreModel, {})
