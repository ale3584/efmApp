import { GeneralApiProblem } from "./apiProblem"

/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */
export interface EpisodeItem {
  title: string
  pubDate: string
  link: string
  guid: string
  author: string
  thumbnail: string
  description: string
  content: string
  enclosure: {
    link: string
    type: string
    length: number
    duration: number
    rating: { scheme: string; value: string }
  }
  categories: string[]
}

export interface ApiFeedResponse {
  status: string
  feed: {
    url: string
    title: string
    link: string
    author: string
    description: string
    image: string
  }
  items: EpisodeItem[]
}

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

export type LoginResult = { kind: "ok" } | GeneralApiProblem;
export type LoginFullResult = { 
  refreshToken: "",
  accessToken:"",
  kind: "ok" | void | GeneralApiProblem,
  roles: string[],
}
export type refreshTokenResult = {
  refreshToken: "",
  accessToken:"",
  kind: "ok" | void | GeneralApiProblem,
}
export type RegisterResult = { kind: string, message: string };
export type LogoutResult = { kind: "ok" } | GeneralApiProblem;
export interface playedPositions {
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
export interface  playedPositionsRating {
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
export interface teamPlayStyle {
  id: number,
  possessiongame: number,
  quickcounter: number,
  longballcounter: number,
  outwide: number,
  longball: number,
}
export interface playerSkills {
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

export interface playerStylesAI {
  id: number,
  trickster: number,
  mazingrun: number,
  speedingbullet: number,
  incisiverun: number,
  longballexpert: number,
  earlycross: number,
  longrange: number
}
export interface playerAbility {
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
export interface playerBasicInfo {
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

export interface Player {
  id: number,
  accentedName: string,
  name: string,
  shirt: string,
  shirtNational: string,
  strongerFoot: number,
  playingStyles: number,
  registeredPosition: number,
  overall: number,
  overallpotential: number,
  levelcap: number,
  playertype: number,
  condition: number,
  playedPositions: playedPositions,
  playedPositionsRating: playedPositionsRating,
  teamPlayStyle: teamPlayStyle,
  playerSkills: playerSkills,
  playerStylesAI: playerStylesAI,
  playerAbility: playerAbility,
  playerBasicInfo: playerBasicInfo
}

export interface ApiPlayersResponse {
  status: string,
  content: Player[],
  pageable: {
    sort: {
      empty: boolean,
      sorted: boolean,
      unsorted: boolean
    },
    offset: number,
    pageNumber: number,
    pageSize: number,
    paged: boolean,
    unpaged: boolean},
  last: boolean,
  totalElements: number,
  totalPages: number,
  size: number,
  number: number,
  sort: {
      empty: boolean,
      sorted: boolean,
      unsorted: boolean
  },
  numberOfElements: number,
  first: boolean,
  empty: boolean,
}
