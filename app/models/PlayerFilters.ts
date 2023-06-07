import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
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

const TeamPlayStyleModel = types.model("TeamPlayStyle", {
  selected: types.boolean,
  min: types.number,
  max: types.number,
})

const PlayerTeamPlayStyleModel = types.model("PlayerTeamPlayStyle", {
  possessiongame: TeamPlayStyleModel,
  quickcounter: TeamPlayStyleModel,
  longballcounter: TeamPlayStyleModel,
  outwide: TeamPlayStyleModel,
  longball: TeamPlayStyleModel,
})

const SkillsModel = types.model("Skills", {
  selected: types.boolean,
  value: types.number,
})

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

const StylesAIModel = types.model("StylesAI", {
  selected: types.boolean,
  value: types.number,
})

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

const PlayerBasicModel = types.model("PlayerBasic", {
  selected: types.boolean,
  min: types.number,
  max: types.number,
})

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
  .actions(withSetPropAction)
  .views((self) => ({
    get PlayedPositions() {
      return self.playedPositions
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface PlayerFilters extends Instance<typeof PlayerFiltersModel> {}
export interface PlayerFiltersSnapshotOut extends SnapshotOut<typeof PlayerFiltersModel> {}
export interface PlayerFiltersSnapshotIn extends SnapshotIn<typeof PlayerFiltersModel> {}
export const createPlayerFiltersDefaultModel = () => types.optional(PlayerFiltersModel, {})
