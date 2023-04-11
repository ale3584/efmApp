import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

interface playedPositions {
  id: number,
  gk: number,
  cb: number,
  lb: number,
  rb: number,
  dmf: number,
  cmf: number,
  lmf: number,
  rmf: number,
  amf: number,
  lwf: number,
  rwf: number,
  ss: number,
  cf: number
}
interface playedPositionsRating  {
  id: number,
  overallGK: number,
  overallCB: number,
  overallLB: number,
  overallRB: number,
  overallDMF: number,
  overallCMF: number,
  overallLMF: number,
  overallRMF: number,
  overallAMF: number,
  overallLWF: number,
  overallRWF: number,
  overallSS: number,
  overallCF: number,
}
interface teamPlayStyle {
  id: number,
  possessiongame: number,
  quickcounter: number,
  longballcounter: number,
  outwide: number,
  longball: number,
}
interface playerSkills {
  id: number,
  scissorsfeint: number,
  doubletouch: number,
  flipflap: number,
  marseilleturn: number,
  sombrero: number,
  crossoverturn: number,
  cutbehindturn: number,
  scotchmove: number,
  steponskillcontrol: number,
  sheading: number,
  longrangedrive: number,
  chipshotcontrol: number,
  longrangeshooting: number,
  knuckleshot: number,
  dippingshot: number,
  risingshots: number,
  acrobaticfinishing: number,
  helltrick: number,
  firsttimeshot: number,
  onetouchpass: number,
  throughpassing: number,
  weightedpass: number,
  pinpointcrossing: number,
  outsidecurler: number,
  rabona: number,
  nolookpass: number,
  lowloftedpass: number,
  gklowpunt: number,
  gkhighpunt: number,
  longthrow: number,
  gklongthrow: number,
  penaltyspecialist: number,
  gkpenaltysaver: number,
  gamesmanship: number,
  manmarking: number,
  trackback: number,
  captaincy: number,
  interception: number,
  acrobaticclear: number,
  supersub: number,
  fightingspirit: number,
  blocker: number,
  aerialsuperiority: number,
  slidingtackle: number
}

interface playerStylesAI {
  id: number,
  trickster: number,
  mazingrun: number,
  speedingbullet: number,
  incisiverun: number,
  longballexpert: number,
  earlycross: number,
  longrange: number
}
interface playerAbility {
  id: number,
  offensiveawareness: number,
  ballcontrol: number,
  dribbling: number,
  tightpossession: number,
  lowpass: number,
  loftedpass: number,
  finishing: number,
  heading: number,
  placekicking: number,
  curl: number,
  speed: number,
  acceleration: number,
  kickingpower: number,
  jump: number,
  physicalcontact: number,
  stamina: number,
  defensiveawareness: number,
  ballwinning: number,
  defensiveengagement: number,
  aggression: number,
  gkawareness: number,
  gkcatching: number,
  gkclearing: number,
  gkreflexes: number,
  gkreach: number,
  weakfootusage: number,
  weakfootaccuracy: number,
  form: number,
  injuryresistance: number,
  reputation: number,
  playingattitude: number,
  balance: number
}
interface playerBasicInfo {
  id: number,
  club: number,
  team: {
      teamId: number,
      name: string,
      country: number,
      national: boolean
  },
  continent: number,
  leagueid: number,
  competition: {
      competitionId: number,
      name: number
  },
  cost: number,
  marketvalue: number,
  commentary: number,
  countryid: number,
  country: {
      countryId: number,
      countryName: string,
      region: number,
      continent: number
  },
  height: number,
  weight: number,
  age: number
}

export const PlayerModel = types
  .model("Player")
  .props({
    id: 0,
    accentedName: "",
    name: "",
    shirt: "",
    shirtNational: "",
    strongerFoot: 0,
    playingStyles: 0,
    registeredPosition: 0,
    overall: 0,
    overallpotential: 0,
    levelcap: 0,
    playertype: 0,
    condition: 0,
    playedPositions:  types.frozen<playedPositions>(),
    playedPositionsRating: types.frozen<playedPositionsRating>(),
    teamPlayStyle: types.frozen<teamPlayStyle>(),
    playerSkills: types.frozen<playerSkills>(),
    playerStylesAI: types.frozen<playerStylesAI>(),
    playerAbility: types.frozen<playerAbility>(),
    playerBasicInfo: types.frozen<playerBasicInfo>(),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Player extends Instance<typeof PlayerModel> {}
export interface PlayerSnapshotOut extends SnapshotOut<typeof PlayerModel> {}
export interface PlayerSnapshotIn extends SnapshotIn<typeof PlayerModel> {}
export const createPlayerDefaultModel = () => types.optional(PlayerModel, {})
