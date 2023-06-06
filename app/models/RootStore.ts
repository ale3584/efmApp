import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthenticationStoreModel } from "./AuthenticationStore" // @demo remove-current-line
import { AuthStoreModel } from "./AuthStore"
import { PlayerStoreModel } from "./PlayerStore"
import { PlayerModel } from "./Player"
import { PlayerFiltersModel } from "./PlayerFilters"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  authStore: types.optional(AuthStoreModel, { error: [] }),
  playerStore: types.optional(PlayerStoreModel, {
    players: [],
    player: PlayerModel.create(),
    isLoading: false,
    error: null,
    isEndReached: false,
  }),
  playerFilters: types.optional(PlayerFiltersModel, {
    playedPositions: {
      gk: { selected: false, min: "C", max: "A" },
      cb: { selected: false, min: "C", max: "A" },
      lb: { selected: false, min: "C", max: "A" },
      rb: { selected: false, min: "C", max: "A" },
      dmf: { selected: false, min: "C", max: "A" },
      cmf: { selected: false, min: "C", max: "A" },
      lmf: { selected: false, min: "C", max: "A" },
      rmf: { selected: false, min: "C", max: "A" },
      amf: { selected: false, min: "C", max: "A" },
      lwf: { selected: false, min: "C", max: "A" },
      rwf: { selected: false, min: "C", max: "A" },
      ss: { selected: false, min: "C", max: "A" },
      cf: { selected: false, min: "C", max: "A" },
    },
    playedPositionsRating: {
      overallGK: { selected: false, min: 0, max: 0 },
      overallCB: { selected: false, min: 0, max: 0 },
      overallLB: { selected: false, min: 0, max: 0 },
      overallRB: { selected: false, min: 0, max: 0 },
      overallDMF: { selected: false, min: 0, max: 0 },
      overallCMF: { selected: false, min: 0, max: 0 },
      overallLMF: { selected: false, min: 0, max: 0 },
      overallRMF: { selected: false, min: 0, max: 0 },
      overallAMF: { selected: false, min: 0, max: 0 },
      overallLWF: { selected: false, min: 0, max: 0 },
      overallRWF: { selected: false, min: 0, max: 0 },
      overallSS: { selected: false, min: 0, max: 0 },
      overallCF: { selected: false, min: 0, max: 0 },
    },
    teamPlayStyle: {
      longball: { selected: false, min: 0, max: 0 },
      possessiongame: { selected: false, min: 0, max: 0 },
      longballcounter: { selected: false, min: 0, max: 0 },
      outwide: { selected: false, min: 0, max: 0 },
      quickcounter: { selected: false, min: 0, max: 0 },
    },
    playerSkills: {
      acrobaticfinishing: { selected: false, value: 0 },
      acrobaticclear: { selected: false, value: 0 },
      aerialsuperiority: { selected: false, value: 0 },
      captaincy: { selected: false, value: 0 },
      blocker: { selected: false, value: 0 },
      chipshotcontrol: { selected: false, value: 0 },
      crossoverturn: { selected: false, value: 0 },
      cutbehindturn: { selected: false, value: 0 },
      dippingshot: { selected: false, value: 0 },
      doubletouch: { selected: false, value: 0 },
      fightingspirit: { selected: false, value: 0 },
      firsttimeshot: { selected: false, value: 0 },
      flipflap: { selected: false, value: 0 },
      gamesmanship: { selected: false, value: 0 },
      gkhighpunt: { selected: false, value: 0 },
      gklongthrow: { selected: false, value: 0 },
      gklowpunt: { selected: false, value: 0 },
      gkpenaltysaver: { selected: false, value: 0 },
      helltrick: { selected: false, value: 0 },
      interception: { selected: false, value: 0 },
      knuckleshot: { selected: false, value: 0 },
      longrangedrive: { selected: false, value: 0 },
      longrangeshooting: { selected: false, value: 0 },
      longthrow: { selected: false, value: 0 },
      lowloftedpass: { selected: false, value: 0 },
      manmarking: { selected: false, value: 0 },
      marseilleturn: { selected: false, value: 0 },
      nolookpass: { selected: false, value: 0 },
      onetouchpass: { selected: false, value: 0 },
      outsidecurler: { selected: false, value: 0 },
      penaltyspecialist: { selected: false, value: 0 },
      pinpointcrossing: { selected: false, value: 0 },
      rabona: { selected: false, value: 0 },
      risingshots: { selected: false, value: 0 },
      scotchmove: { selected: false, value: 0 },
      scissorsfeint: { selected: false, value: 0 },
      sheading: { selected: false, value: 0 },
      slidingtackle: { selected: false, value: 0 },
      sombrero: { selected: false, value: 0 },
      steponskillcontrol: { selected: false, value: 0 },
      supersub: { selected: false, value: 0 },
      throughpassing: { selected: false, value: 0 },
      trackback: { selected: false, value: 0 },
      weightedpass: { selected: false, value: 0 },
    },
    playerStylesAI: {
      trickster: { selected: false, value: 0 },
      mazingrun: { selected: false, value: 0 },
      earlycross: { selected: false, value: 0 },
      longballexpert: { selected: false, value: 0 },
      incisiverun: { selected: false, value: 0 },
      speedingbullet: { selected: false, value: 0 },
      longrange: { selected: false, value: 0 },
    },
    playerAbility: {
      offensiveawareness: { selected: false, min: 0, max: 0 },
      ballcontrol: { selected: false, min: 0, max: 0 },
      dribbling: { selected: false, min: 0, max: 0 },
      tightpossession: { selected: false, min: 0, max: 0 },
      lowpass: { selected: false, min: 0, max: 0 },
      loftedpass: { selected: false, min: 0, max: 0 },
      finishing: { selected: false, min: 0, max: 0 },
      heading: { selected: false, min: 0, max: 0 },
      placekicking: { selected: false, min: 0, max: 0 },
      curl: { selected: false, min: 0, max: 0 },
      speed: { selected: false, min: 0, max: 0 },
      acceleration: { selected: false, min: 0, max: 0 },
      kickingpower: { selected: false, min: 0, max: 0 },
      jump: { selected: false, min: 0, max: 0 },
      physicalcontact: { selected: false, min: 0, max: 0 },
      stamina: { selected: false, min: 0, max: 0 },
      defensiveawareness: { selected: false, min: 0, max: 0 },
      ballwinning: { selected: false, min: 0, max: 0 },
      defensiveengagement: { selected: false, min: 0, max: 0 },
      aggression: { selected: false, min: 0, max: 0 },
      gkawareness: { selected: false, min: 0, max: 0 },
      gkcatching: { selected: false, min: 0, max: 0 },
      gkclearing: { selected: false, min: 0, max: 0 },
      gkreflexes: { selected: false, min: 0, max: 0 },
      gkreach: { selected: false, min: 0, max: 0 },
      weakfootusage: { selected: false, min: 0, max: 0 },
      weakfootaccuracy: { selected: false, min: 0, max: 0 },
      form: { selected: false, min: 0, max: 0 },
      injuryresistance: { selected: false, min: 0, max: 0 },
      reputation: { selected: false, min: 0, max: 0 },
      playingattitude: { selected: false, min: 0, max: 0 },
      balance: { selected: false, min: 0, max: 0 },
    },
    name: "",
    overall: {
      selected: false,
      min: 0,
      max: 0,
    },
    playerBasicInfo: {
      teamName: "",
      competitionname: "",
      age: { selected: false, min: 0, max: 0 },
      height: { selected: false, min: 0, max: 0 },
      weight: { selected: false, min: 0, max: 0 },
      countryName: "",
    },
  }),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
