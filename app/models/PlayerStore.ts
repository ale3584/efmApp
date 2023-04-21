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
    isLoading: types.boolean,
    error: types.maybeNull(types.string),
    currentPage: types.optional(types.number, 0),
    isEndReached: types.boolean,
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    setCurrentPage(value: number) {
      self.currentPage = value
    },
    setIsLoading(value: boolean){
      self.isLoading = value
    },
    setPLayers(players){
      self.players = players;
    },
    setAppendPlayers(players){
      self.players.push(...players)
    },
    setError(error){
      self.error = error
    },
    setIsEndReached(value: boolean){
      self.isEndReached = value
    }
  }))
  .views((self) => ({
    get IsLoading() {
      return self.isLoading
    },
    get IsEndReached(){
      return self.isEndReached
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    async fetchPlayers(refreshToken: string, accessToken: string){
      const authStore = getParent<RootStore>(self).authStore; 
      self.setIsLoading(true);
      if(authStore.isTokenValid){
        const authenticationApi = new AuthenticationApi(api);
        try{
          const response = await authenticationApi.getPlayers(refreshToken, accessToken,0);
          if (response.kind === "ok") {
            console.log(response.players)
            self.setIsLoading(false);
            self.setIsEndReached(false)
            self.setError(null);
            self.setPLayers(response.players);
          }else {
            console.log(response)
            self.setIsLoading(false);
            self.setIsEndReached(false)
            self.setError(null);
            console.tron.error(`Error fetching players: ${JSON.stringify(response)}`, [])
          }
        }catch(error){
          self.setIsLoading(false);
          self.setIsEndReached(false)
          self.setError(error.message);
        }
      }else{
        self.setIsLoading(false);
        self.setIsEndReached(false)
        self.setError(null);
        authStore.logout();
      }
    },
    async appendPlayers(page: number){
      self.setIsLoading(true);
      const authStore = getParent<RootStore>(self).authStore; 
      if(authStore.isTokenValid){
        const authenticationApi = new AuthenticationApi(api);
        try{
          const response = await authenticationApi.getPlayers(authStore.refreshToken, authStore.authToken, page);
          if (response.kind === "ok") {
            self.setIsLoading(false);
            self.setIsEndReached(false)
            self.setError(null);
            self.setAppendPlayers(response.players);
          }else {
            console.log(response)
            self.setIsLoading(false);
            self.setIsEndReached(false)
            self.setPLayers([])
            self.setError(null);
            console.tron.error(`Error fetching players: ${JSON.stringify(response)}`, [])
          }
        }catch(error){
          self.setIsLoading(false);
          self.setIsEndReached(false)
          self.setPLayers([])
          self.setError(error.message);
        }
      }else{
        self.setIsLoading(false);
        self.setIsEndReached(false)
        self.setPLayers({PlayerModel:[]})
        self.setError(null);
        authStore.logout();
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface PlayerStore extends Instance<typeof PlayerStoreModel> {}
export interface PlayerStoreSnapshotOut extends SnapshotOut<typeof PlayerStoreModel> {}
export interface PlayerStoreSnapshotIn extends SnapshotIn<typeof PlayerStoreModel> {}
export const createPlayerStoreDefaultModel = () => types.optional(PlayerStoreModel, {})
