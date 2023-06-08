import {
  Instance,
  SnapshotIn,
  SnapshotOut,
  applySnapshot,
  onSnapshot,
  types,
} from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

const PositionModel = types
  .model("Position", {
    selected: types.boolean,
    min: types.string,
    max: types.string,
  })
  .actions((self) => ({
    toggle() {
      self.selected = !self.selected
    },
    setMin(value: string) {
      self.min = value
      self.selected = true
    },
    setMax(value: string) {
      self.max = value
      self.selected = true
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

const PlayerPositionModel = types.model("PlayerPosition", {
  gk: PositionModel,
  cb: PositionModel,
  lb: PositionModel,
  rb: PositionModel,
  dmf: PositionModel,
  cmf: PositionModel,
  lmf: PositionModel,
  rmf: PositionModel,
  amf: PositionModel,
  lwf: PositionModel,
  rwf: PositionModel,
  ss: PositionModel,
  cf: PositionModel,
})

const PositionRatingModel = types
  .model("PositionRating", {
    selected: types.boolean,
    min: types.number,
    max: types.number,
  })
  .actions((self) => ({
    toggle() {
      self.selected = !self.selected
    },
    setValues(min: number, max: number) {
      self.min = min
      self.max = max
      self.selected = true
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

const PlayerPositionRatingModel = types.model("PlayerPositionRating", {
  overallGK: PositionRatingModel,
  overallCB: PositionRatingModel,
  overallLB: PositionRatingModel,
  overallRB: PositionRatingModel,
  overallDMF: PositionRatingModel,
  overallCMF: PositionRatingModel,
  overallLMF: PositionRatingModel,
  overallRMF: PositionRatingModel,
  overallAMF: PositionRatingModel,
  overallLWF: PositionRatingModel,
  overallRWF: PositionRatingModel,
  overallSS: PositionRatingModel,
  overallCF: PositionRatingModel,
})

const TeamPlayStyleModel = types
  .model("TeamPlayStyle", {
    selected: types.boolean,
    min: types.number,
    max: types.number,
  })
  .actions((self) => ({
    toggle() {
      self.selected = !self.selected
    },
    setValues(min: number, max: number) {
      self.min = min
      self.max = max
      self.selected = true
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

const PlayerTeamPlayStyleModel = types.model("PlayerTeamPlayStyle", {
  possessiongame: TeamPlayStyleModel,
  quickcounter: TeamPlayStyleModel,
  longballcounter: TeamPlayStyleModel,
  outwide: TeamPlayStyleModel,
  longball: TeamPlayStyleModel,
})

const SkillsModel = types
  .model("Skills", {
    selected: types.boolean,
    value: types.number,
  })
  .actions((self) => ({
    toggle() {
      self.selected = !self.selected
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

const PlayerSkillsModel = types.model("PlayerSkills", {
  scissorsfeint: SkillsModel,
  doubletouch: SkillsModel,
  flipflap: SkillsModel,
  marseilleturn: SkillsModel,
  sombrero: SkillsModel,
  crossoverturn: SkillsModel,
  cutbehindturn: SkillsModel,
  scotchmove: SkillsModel,
  steponskillcontrol: SkillsModel,
  sheading: SkillsModel,
  longrangedrive: SkillsModel,
  chipshotcontrol: SkillsModel,
  longrangeshooting: SkillsModel,
  knuckleshot: SkillsModel,
  dippingshot: SkillsModel,
  risingshots: SkillsModel,
  acrobaticfinishing: SkillsModel,
  helltrick: SkillsModel,
  firsttimeshot: SkillsModel,
  onetouchpass: SkillsModel,
  throughpassing: SkillsModel,
  weightedpass: SkillsModel,
  pinpointcrossing: SkillsModel,
  outsidecurler: SkillsModel,
  rabona: SkillsModel,
  nolookpass: SkillsModel,
  lowloftedpass: SkillsModel,
  gklowpunt: SkillsModel,
  gkhighpunt: SkillsModel,
  longthrow: SkillsModel,
  gklongthrow: SkillsModel,
  penaltyspecialist: SkillsModel,
  gkpenaltysaver: SkillsModel,
  gamesmanship: SkillsModel,
  manmarking: SkillsModel,
  trackback: SkillsModel,
  captaincy: SkillsModel,
  interception: SkillsModel,
  acrobaticclear: SkillsModel,
  supersub: SkillsModel,
  fightingspirit: SkillsModel,
  blocker: SkillsModel,
  aerialsuperiority: SkillsModel,
  slidingtackle: SkillsModel,
})

const StylesAIModel = types
  .model("StylesAI", {
    selected: types.boolean,
    value: types.number,
  })
  .actions((self) => ({
    toggle() {
      self.selected = !self.selected
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

const PlayerStylesAIModel = types.model("PlayerStylesAI", {
  trickster: StylesAIModel,
  mazingrun: StylesAIModel,
  speedingbullet: StylesAIModel,
  incisiverun: StylesAIModel,
  longballexpert: StylesAIModel,
  earlycross: StylesAIModel,
  longrange: StylesAIModel,
})

const AbilityModel = types
  .model("PlayerAbility", {
    selected: types.boolean,
    min: types.number,
    max: types.number,
    defMin: types.number,
    defMax: types.number,
  })
  .actions((self) => ({
    toggle() {
      self.selected = !self.selected
    },
    setValues(min: number, max: number) {
      self.min = min
      self.max = max
      self.selected = true
    },
  }))

const PlayerBasicModel = types
  .model("PlayerBasic", {
    selected: types.boolean,
    min: types.number,
    max: types.number,
  })
  .actions((self) => ({
    setValues(min: number, max: number) {
      self.min = min
      self.max = max
      self.selected = true
    },
  }))

const PlayerBasicNameModel = types.model("PlayerBasicName", {
  selected: types.boolean,
  value: types.string,
})

const PlayerBasicInfoModel = types.model("PlayerBasicInfo", {
  teamName: types.string,
  competitionname: types.string,
  countryName: types.string,
  height: PlayerBasicModel,
  weight: PlayerBasicModel,
  age: PlayerBasicModel,
})

const PlayerOverallModel = types.model("PlayerOverall", {
  selected: types.boolean,
  min: types.number,
  max: types.number,
})
const PlayerAbilityModel = types.model("PlayerAbility", {
  offensiveawareness: AbilityModel,
  ballcontrol: AbilityModel,
  dribbling: AbilityModel,
  tightpossession: AbilityModel,
  lowpass: AbilityModel,
  loftedpass: AbilityModel,
  finishing: AbilityModel,
  heading: AbilityModel,
  placekicking: AbilityModel,
  curl: AbilityModel,
  speed: AbilityModel,
  acceleration: AbilityModel,
  kickingpower: AbilityModel,
  jump: AbilityModel,
  physicalcontact: AbilityModel,
  stamina: AbilityModel,
  defensiveawareness: AbilityModel,
  defensiveengagement: AbilityModel,
  aggression: AbilityModel,
  gkawareness: AbilityModel,
  gkcatching: AbilityModel,
  gkclearing: AbilityModel,
  gkreflexes: AbilityModel,
  gkreach: AbilityModel,
  weakfootusage: AbilityModel,
  weakfootaccuracy: AbilityModel,
  form: AbilityModel,
  injuryresistance: AbilityModel,
  balance: AbilityModel,
  tackling: AbilityModel,
})

export enum PlayerFiltersPosition {
  GK = 0,
  CB = 1,
  LB = 2,
  RB = 3,
  DMF = 4,
  CMF = 5,
  LMF = 6,
  RMF = 7,
  AMF = 8,
  LWF = 9,
  RWF = 10,
  SS = 11,
  CF = 12,
}

export enum PlayerFiltersPStyle {
  None = 0,
  GoalPoacher = 1,
  DummyRunner = 2,
  FoxInTheBox = 3,
  ProlificWinger = 4,
  ClassicNo10 = 5,
  HolePlayer = 6,
  BoxToBox = 7,
  AnchorMan = 8,
  TheDestroyer = 9,
  ExtraFrontman = 10,
  OffensiveFullBack = 11,
  DefensiveFullBack = 12,
  DeepLyingForward = 13,
  CreativePlaymaker = 14,
  BuildUp = 15,
  OffensiveGoalkeeper = 16,
  DefensiveGoalkeeper = 17,
  RoamingFlank = 18,
  CrossSpecialist = 19,
  Orchestrator = 20,
  FullBackFinisher = 21,
  TargetMan = 22,
}

export enum PlayerPositionRating {
  overallGK = "GK",
  overallCB = "CB",
  overallLB = "LB",
  overallRB = "RB",
  overallDMF = "DMF",
  overallCMF = "CMF",
  overallLMF = "LMF",
  overallRMF = "RMF",
  overallAMF = "AMF",
  overallLWF = "LWF",
  overallRWF = "RWF",
  overallSS = "SS",
  overallCF = "CF",
}

export enum PlayerAbility {
  offensiveawareness = "Off. Awareness",
  ballcontrol = "Ball Control",
  dribbling = "Dribbling",
  tightpossession = "Tight Possession",
  lowpass = "Low Pass",
  loftedpass = "Lofted Pass",
  finishing = "Finishing",
  heading = "Heading",
  placekicking = "Place Kicking",
  curl = "Curl",
  kickingpower = "Kicking Power",
  defensiveawareness = "Def. Awareness",
  defensiveengagement = "Def. Engagement",
  tackling = "Tackling",
  aggression = "Aggression",
  gkawareness = "GK Awareness",
  gkcatching = "GK Catching",
  gkclearing = "GK Clearing",
  gkreflexes = "GK Reflexes",
  gkreach = "GK Reach",
  speed = "Speed",
  acceleration = "Acceleration",
  jump = "Jump",
  physicalcontact = "Physical Contact",
  balance = "Balance",
  stamina = "Stamina",
  weakfootusage = "Weak Foot Usage",
  weakfootaccuracy = "Weak Foot Accuracy",
  form = "Form",
  injuryresistance = "Injury Resistance",
}

export const PlayerFiltersPStyleToString = [
  "",
  "Goal Poacher",
  "Dummy Runner",
  "Fox in the Box",
  "Prolific Winger",
  "Classic No. 10",
  "Hole Player",
  "Box-to-Box",
  "Anchor Man",
  "The Destroyer",
  "Extra Frontman",
  "Offensive Full-back",
  "Defensive Full-back",
  "Deep-Lying Forward",
  "Creative Playmaker",
  "Build Up",
  "Offensive Goalkeeper",
  "Defensive Goalkeeper",
  "Roaming Flank",
  "Cross Specialist",
  "Orchestrator",
  "Full-back Finisher",
  "Target Man",
]

export enum PlayerTeamPlayStyle {
  possessiongame = "Possession Game",
  quickcounter = "Quick Counter",
  longballcounter = "Long Ball Counter",
  outwide = "Out Wide",
  longball = "Long Ball",
}

export enum PlayerSkills {
  scissorsfeint = "Scissors Feint",
  doubletouch = "Double Touch",
  flipflap = "Flip Flap",
  marseilleturn = "Marseille Turn",
  sombrero = "Sombrero",
  crossoverturn = "Crossover Turn",
  cutbehindturn = "Cut Behind & Turn",
  scotchmove = "Scotch Move",
  steponskillcontrol = "Step On Skill Control",
  sheading = "Heading",
  longrangedrive = "Long Range Drive",
  chipshotcontrol = "Chip Shot Control",
  longrangeshooting = "Long Range Shooting",
  knuckleshot = "Knuckle Shot",
  dippingshot = "Dipping Shot",
  risingshots = "Rising Shots",
  acrobaticfinishing = "Acrobatic Finishing",
  helltrick = "Heel Trick",
  firsttimeshot = "First-time Shot",
  onetouchpass = "One-touch Pass",
  throughpassing = "Through Passing",
  weightedpass = "Weighted Pass",
  pinpointcrossing = "Pinpoint Crossing",
  outsidecurler = "Outside Curler",
  rabona = "Rabona",
  nolookpass = "No Look Pass",
  lowloftedpass = "Low Lofted Pass",
  gklowpunt = "GK Low Punt",
  gkhighpunt = "GK High Punt",
  longthrow = "Long Throw",
  gklongthrow = "GK Long Throw",
  penaltyspecialist = "Penalty Specialist",
  gkpenaltysaver = "GK Penalty Saver",
  gamesmanship = "Gamesmanship",
  manmarking = "Man Marking",
  trackback = "Track Back",
  captaincy = "Captaincy",
  interception = "Interception",
  acrobaticclear = "Acrobatic Clear",
  supersub = "Super-Sub",
  fightingspirit = "Fighting Spirit",
  blocker = "Blocker",
  aerialsuperiority = "Aerial Superiority",
  slidingtackle = "Sliding Tackle",
}

export enum PlayerStylesAI {
  trickster = "Trickster",
  mazingrun = "Mazing Run",
  speedingbullet = "Speeding Bullet",
  incisiverun = "Incisive Run",
  longballexpert = "Long Ball Expert",
  earlycross = "Early Cross",
  longrange = "Long Range",
}

export const PlayerFiltersModel = types
  .model("PlayerFilters", {
    playedPositions: PlayerPositionModel,
    playedPositionsRating: PlayerPositionRatingModel,
    teamPlayStyle: PlayerTeamPlayStyleModel,
    playerSkills: PlayerSkillsModel,
    playerStylesAI: PlayerStylesAIModel,
    playerAbility: PlayerAbilityModel,
    name: types.optional(types.string, ""),
    overall: PlayerOverallModel,
    playerBasicInfo: PlayerBasicInfoModel,
  })
  .props({
    isFiltered: types.optional(types.boolean, false),
    isClose: types.optional(types.boolean, false),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get PlayedPositions() {
      return self.playedPositions
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    clear() {
      applySnapshot(self, initialState)
    },
    setIsFiltered(value: boolean) {
      self.isFiltered = value
    },
    setIsClose(value: boolean) {
      self.isClose = value
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

const initialState = {
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
    overallGK: { selected: false, min: 40, max: 99 },
    overallCB: { selected: false, min: 40, max: 99 },
    overallLB: { selected: false, min: 40, max: 99 },
    overallRB: { selected: false, min: 40, max: 99 },
    overallDMF: { selected: false, min: 40, max: 99 },
    overallCMF: { selected: false, min: 40, max: 99 },
    overallLMF: { selected: false, min: 40, max: 99 },
    overallRMF: { selected: false, min: 40, max: 99 },
    overallAMF: { selected: false, min: 40, max: 99 },
    overallLWF: { selected: false, min: 40, max: 99 },
    overallRWF: { selected: false, min: 40, max: 99 },
    overallSS: { selected: false, min: 40, max: 99 },
    overallCF: { selected: false, min: 40, max: 99 },
  },
  teamPlayStyle: {
    longball: { selected: false, min: 40, max: 99 },
    possessiongame: { selected: false, min: 40, max: 99 },
    longballcounter: { selected: false, min: 40, max: 99 },
    outwide: { selected: false, min: 40, max: 99 },
    quickcounter: { selected: false, min: 40, max: 99 },
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
    offensiveawareness: { selected: false, min: 40, max: 99, defMin: 40, defMax: 99 },
    ballcontrol: { selected: false, min: 40, max: 99, defMin: 40, defMax: 99 },
    dribbling: { selected: false, min: 40, max: 99, defMin: 40, defMax: 99 },
    tightpossession: { selected: false, min: 40, max: 99, defMin: 40, defMax: 99 },
    lowpass: { selected: false, min: 40, max: 99, defMin: 40, defMax: 99 },
    loftedpass: { selected: false, min: 40, max: 99, defMin: 40, defMax: 99 },
    finishing: { selected: false, min: 40, max: 99, defMin: 40, defMax: 99 },
    heading: { selected: false, min: 40, max: 99, defMin: 40, defMax: 99 },
    placekicking: { selected: false, min: 40, max: 99, defMin: 40, defMax: 99 },
    curl: { selected: false, min: 40, max: 99, defMin: 40, defMax: 99 },
    speed: { selected: false, min: 40, max: 99, defMin: 40, defMax: 99 },
    acceleration: { selected: false, min: 40, max: 99, defMin: 40, defMax: 99 },
    kickingpower: { selected: false, min: 40, max: 99, defMin: 40, defMax: 99 },
    jump: { selected: false, min: 40, max: 99, defMin: 40, defMax: 99 },
    physicalcontact: { selected: false, min: 40, max: 99, defMin: 40, defMax: 99 },
    stamina: { selected: false, min: 40, max: 99, defMin: 40, defMax: 99 },
    defensiveawareness: { selected: false, min: 40, max: 99, defMin: 40, defMax: 99 },
    defensiveengagement: { selected: false, min: 40, max: 99, defMin: 40, defMax: 99 },
    aggression: { selected: false, min: 40, max: 99, defMin: 40, defMax: 99 },
    gkawareness: { selected: false, min: 40, max: 99, defMin: 40, defMax: 99 },
    gkcatching: { selected: false, min: 40, max: 99, defMin: 40, defMax: 99 },
    gkclearing: { selected: false, min: 40, max: 99, defMin: 40, defMax: 99 },
    gkreflexes: { selected: false, min: 40, max: 99, defMin: 40, defMax: 99 },
    gkreach: { selected: false, min: 40, max: 99, defMin: 40, defMax: 99 },
    weakfootusage: { selected: false, min: 1, max: 4, defMin: 1, defMax: 4 },
    weakfootaccuracy: { selected: false, min: 1, max: 4, defMin: 1, defMax: 4 },
    form: { selected: false, min: 1, max: 3, defMin: 1, defMax: 3 },
    injuryresistance: { selected: false, min: 1, max: 3, defMin: 1, defMax: 3 },
    balance: { selected: false, min: 40, max: 99, defMin: 40, defMax: 99 },
    tackling: { selected: false, min: 40, max: 99, defMin: 40, defMax: 99 },
  },
  name: "",
  overall: {
    selected: false,
    min: 40,
    max: 100,
  },
  playerBasicInfo: {
    teamName: "",
    competitionname: "",
    age: { selected: false, min: 15, max: 50 },
    height: { selected: false, min: 100, max: 227 },
    weight: { selected: false, min: 30, max: 157 },
    countryName: "",
  },
}

export interface PlayerFilters extends Instance<typeof PlayerFiltersModel> {}
export interface PlayerFiltersSnapshotOut extends SnapshotOut<typeof PlayerFiltersModel> {}
export interface PlayerFiltersSnapshotIn extends SnapshotIn<typeof PlayerFiltersModel> {}
export const createPlayerFiltersDefaultModel = () =>
  types.optional(PlayerFiltersModel, initialState)
