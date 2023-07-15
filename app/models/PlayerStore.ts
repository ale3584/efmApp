import { Instance, SnapshotIn, SnapshotOut, types, getParent } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { PlayerModel } from "./Player"
import { api } from "../services/api"
import { AuthenticationApi } from "app/services/api/authApi"
import { RootStore } from "./RootStore"
import { playedPositions } from "./PlayerFilters"

function filterSelectedPositions(snapshot: any) {
  const result = {}
  for (const property in snapshot) {
    if (snapshot[property] && snapshot[property].selected) {
      result[property + "Min"] = snapshot[property].min
      result[property + "Max"] = snapshot[property].max
    }
  }
  return result
}

function filterSelectedPositionsString(snapshot: any) {
  const result = {}
  for (const property in snapshot) {
    if (snapshot[property] && snapshot[property].selected) {
      result[property + "Min"] = playedPositions.indexOf(snapshot[property].min)
      result[property + "Max"] = playedPositions.indexOf(snapshot[property].max)
    }
  }
  return result
}

function filterSelected(snapshot: any) {
  const result = {}
  for (const property in snapshot) {
    if (snapshot[property] instanceof Object && !(snapshot[property] instanceof Array)) {
      // Обработка объектов в соответствии с их структурой
      if (property === "playedPositions") {
        const subResult = filterSelectedPositionsString(snapshot[property])
        if (Object.keys(subResult).length > 0) {
          result[property] = subResult
        }
      } else if (property === "playedPositionsRating" || property === "teamPlayStyle") {
        const subResult = filterSelectedPositions(snapshot[property])
        if (Object.keys(subResult).length > 0) {
          result[property] = subResult
        }
      } else {
        const subResult = filterSelected(snapshot[property])
        if (Object.keys(subResult).length > 0) {
          result[property] = subResult
        }
      }
    } else if (snapshot[property] && snapshot[property].selected) {
      result[property] = snapshot[property].value
    }
  }

  return result
}

/**
 * Model description here for TypeScript hints.
 */
export const PlayerStoreModel = types
  .model("PlayerStore")
  .props({
    players: types.optional(types.array(PlayerModel), []),
    player: PlayerModel,
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
    setIsLoading(value: boolean) {
      self.isLoading = value
    },
    setPLayers(players) {
      self.players = players
    },
    setPlayer(value) {
      self.player = value
    },
    setAppendPlayers(players) {
      self.players.push(...players)
    },
    setError(error) {
      self.error = error
    },
    setIsEndReached(value: boolean) {
      self.isEndReached = value
    },
  }))
  .views((self) => ({
    get IsLoading() {
      return self.isLoading
    },
    get IsEndReached() {
      return self.isEndReached
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    async fetchPlayers() {
      const authStore = getParent<RootStore>(self).authStore
      self.setIsLoading(true)
      // if(authStore.isTokenValid){
      const authenticationApi = new AuthenticationApi(api, self)
      try {
        const response = await authenticationApi.getPlayers(0)
        if (response.kind === "ok") {
          // console.log(response.players)
          await self.setIsLoading(false)
          await self.setIsEndReached(false)
          await self.setError(null)
          await self.setPLayers(response.players)
        } else if (response.kind === "unauthorized") {
          await self.setIsLoading(false)
          await self.setIsEndReached(false)
          await self.setPlayer(null)
          await authStore.logout()
        } else {
          // console.log(response)
          await self.setIsLoading(false)
          await self.setIsEndReached(false)
          await self.setPlayer(null)
          await self.setError(null)
          console.tron.error(`Error fetching player: ${JSON.stringify(response)}`, [])
        }
      } catch (error) {
        await self.setIsLoading(false)
        await self.setIsEndReached(false)
        await self.setError(error.message)
      }
      // }else{
      //   await self.setIsLoading(false);
      //   await self.setIsEndReached(false)
      //   await self.setError(null);
      //   await authStore.logout();
      // }
    },

    async appendPlayers(page: number) {
      self.setIsLoading(true)
      const authStore = getParent<RootStore>(self).authStore
      // if(authStore.isTokenValid){
      const authenticationApi = new AuthenticationApi(api, self)
      try {
        const response = await authenticationApi.getPlayers(page)
        if (response.kind === "ok") {
          await self.setIsLoading(false)
          await self.setIsEndReached(false)
          await self.setError(null)
          await self.setAppendPlayers(response.players)
        } else if (response.kind === "unauthorized") {
          await self.setIsLoading(false)
          await self.setIsEndReached(false)
          await self.setPLayers([])
          await authStore.logout()
        } else {
          console.log(response)
          await self.setIsLoading(false)
          await self.setIsEndReached(false)
          await self.setPLayers([])
          await self.setError(null)
          console.tron.error(`Error fetching players: ${JSON.stringify(response)}`, [])
        }
      } catch (error) {
        await self.setIsLoading(false)
        await self.setIsEndReached(false)
        await self.setPLayers([])
        await self.setError(error.message)
      }
      // }else{
      //   await self.setIsLoading(false);
      //   await self.setIsEndReached(false)
      //   await self.setPLayers({PlayerModel:[]})
      //   await self.setError(null);
      //   await authStore.logout();
      // }
    },

    async fetchPlayer(playerid: number) {
      const authStore = getParent<RootStore>(self).authStore
      self.setIsLoading(true)
      // if(authStore.isTokenValid){
      const authenticationApi = new AuthenticationApi(api, self)
      try {
        const response = await authenticationApi.getPlayer(playerid)
        if (response.kind === "ok") {
          // console.log(response.players)
          await self.setIsLoading(false)
          await self.setIsEndReached(false)
          await self.setError(null)
          await self.setPlayer(response.player)
        } else if (response.kind === "unauthorized") {
          await self.setIsLoading(false)
          await self.setIsEndReached(false)
          await self.setPLayers([])
          await authStore.logout()
        } else {
          // console.log(response)
          await self.setIsLoading(false)
          await self.setIsEndReached(false)
          await self.setError(null)
          console.tron.error(`Error fetching players: ${JSON.stringify(response)}`, [])
        }
      } catch (error) {
        await self.setIsLoading(false)
        await self.setIsEndReached(false)
        await self.setError(error.message)
      }
    },

    async fetchPlayersWithFilters(playerFilters: any) {
      let playerFiltersDTO = {}
      playerFiltersDTO = filterSelected(playerFilters)
      const authStore = getParent<RootStore>(self).authStore
      self.setIsLoading(true)
      // if(authStore.isTokenValid){
      const authenticationApi = new AuthenticationApi(api, self)
      try {
        const response = await authenticationApi.getPlayersWithFilters(playerFiltersDTO)
        if (response.kind === "ok") {
          // console.log(response.players)
          await self.setIsLoading(false)
          await self.setIsEndReached(false)
          await self.setError(null)
          await self.setPLayers(response.players)
        } else if (response.kind === "unauthorized") {
          await self.setIsLoading(false)
          await self.setIsEndReached(false)
          await self.setPlayer(null)
          await authStore.logout()
        } else {
          // console.log(response)
          await self.setIsLoading(false)
          await self.setIsEndReached(false)
          await self.setPlayer(null)
          await self.setError(null)
          console.tron.error(`Error fetching player: ${JSON.stringify(response)}`, [])
        }
      } catch (error) {
        await self.setIsLoading(false)
        await self.setIsEndReached(false)
        await self.setError(error.message)
      }
    },

    async appendPlayersWithFilters(playerFilters: any, page: number) {
      self.setIsLoading(true)
      const authStore = getParent<RootStore>(self).authStore
      // if(authStore.isTokenValid){
      const authenticationApi = new AuthenticationApi(api, self)
      try {
        const response = await authenticationApi.getPlayers(page)
        if (response.kind === "ok") {
          await self.setIsLoading(false)
          await self.setIsEndReached(false)
          await self.setError(null)
          await self.setAppendPlayers(response.players)
        } else if (response.kind === "unauthorized") {
          await self.setIsLoading(false)
          await self.setIsEndReached(false)
          await self.setPLayers([])
          await authStore.logout()
        } else {
          console.log(response)
          await self.setIsLoading(false)
          await self.setIsEndReached(false)
          await self.setPLayers([])
          await self.setError(null)
          console.tron.error(`Error fetching players: ${JSON.stringify(response)}`, [])
        }
      } catch (error) {
        await self.setIsLoading(false)
        await self.setIsEndReached(false)
        await self.setPLayers([])
        await self.setError(error.message)
      }
      // }else{
      //   await self.setIsLoading(false);
      //   await self.setIsEndReached(false)
      //   await self.setPLayers({PlayerModel:[]})
      //   await self.setError(null);
      //   await authStore.logout();
      // }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface PlayerStore extends Instance<typeof PlayerStoreModel> {}
export interface PlayerStoreSnapshotOut extends SnapshotOut<typeof PlayerStoreModel> {}
export interface PlayerStoreSnapshotIn extends SnapshotIn<typeof PlayerStoreModel> {}
export const createPlayerStoreDefaultModel = () =>
  types.optional(PlayerStoreModel, {
    players: [],
    player: PlayerModel.create(),
    isLoading: false,
    error: null,
    isEndReached: false,
  })
