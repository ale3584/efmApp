import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

const PositionModel = types.model("Position", {
  selected: types.boolean,
  min: types.string,
  max: types.string,
})

const PositionRatingModel = types.model("PositionRating", {
  selected: types.boolean,
  min: types.number,
  max: types.number,
})

const TeamPlayStyleModel = types.model("TeamPlayStyle", {
  selected: types.boolean,
  min: types.number,
  max: types.number,
})

const PlayerSkillsModel = types.model("PlayerSkills", {
  selected: types.boolean,
  value: types.number,
})

const PlayerStylesAIModel = types.model("PlayerStylesAI", {
  selected: types.boolean,
  value: types.number,
})

const PlayerAbilityModel = types.model("PlayerAbility", {
  selected: types.boolean,
  min: types.number,
  max: types.number,
})

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
    playedPositions: types.model({
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
    }),
    playedPositionsRating: types.model({
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
    }),
    teamPlayStyle: types.model({
      possessiongame: TeamPlayStyleModel,
      quickcounter: TeamPlayStyleModel,
      longballcounter: TeamPlayStyleModel,
      outwide: TeamPlayStyleModel,
      longball: TeamPlayStyleModel,
    }),
    playerSkills: types.model({
      scissorsfeint: PlayerSkillsModel,
      doubletouch: PlayerSkillsModel,
      flipflap: PlayerSkillsModel,
      marseilleturn: PlayerSkillsModel,
      sombrero: PlayerSkillsModel,
      crossoverturn: PlayerSkillsModel,
      cutbehindturn: PlayerSkillsModel,
      scotchmove: PlayerSkillsModel,
      steponskillcontrol: PlayerSkillsModel,
      sheading: PlayerSkillsModel,
      longrangedrive: PlayerSkillsModel,
      chipshotcontrol: PlayerSkillsModel,
      longrangeshooting: PlayerSkillsModel,
      knuckleshot: PlayerSkillsModel,
      dippingshot: PlayerSkillsModel,
      risingshots: PlayerSkillsModel,
      acrobaticfinishing: PlayerSkillsModel,
      helltrick: PlayerSkillsModel,
      firsttimeshot: PlayerSkillsModel,
      onetouchpass: PlayerSkillsModel,
      throughpassing: PlayerSkillsModel,
      weightedpass: PlayerSkillsModel,
      pinpointcrossing: PlayerSkillsModel,
      outsidecurler: PlayerSkillsModel,
      rabona: PlayerSkillsModel,
      nolookpass: PlayerSkillsModel,
      lowloftedpass: PlayerSkillsModel,
      gklowpunt: PlayerSkillsModel,
      gkhighpunt: PlayerSkillsModel,
      longthrow: PlayerSkillsModel,
      gklongthrow: PlayerSkillsModel,
      penaltyspecialist: PlayerSkillsModel,
      gkpenaltysaver: PlayerSkillsModel,
      gamesmanship: PlayerSkillsModel,
      manmarking: PlayerSkillsModel,
      trackback: PlayerSkillsModel,
      captaincy: PlayerSkillsModel,
      interception: PlayerSkillsModel,
      acrobaticclear: PlayerSkillsModel,
      supersub: PlayerSkillsModel,
      fightingspirit: PlayerSkillsModel,
      blocker: PlayerSkillsModel,
      aerialsuperiority: PlayerSkillsModel,
      slidingtackle: PlayerSkillsModel,
    }),
    playerStylesAI: types.model({
      trickster: PlayerStylesAIModel,
      mazingrun: PlayerStylesAIModel,
      speedingbullet: PlayerStylesAIModel,
      incisiverun: PlayerStylesAIModel,
      longballexpert: PlayerStylesAIModel,
      earlycross: PlayerStylesAIModel,
      longrange: PlayerStylesAIModel,
    }),
    playerAbility: types.model({
      offensiveawareness: PlayerAbilityModel,
      ballcontrol: PlayerAbilityModel,
      dribbling: PlayerAbilityModel,
      tightpossession: PlayerAbilityModel,
      lowpass: PlayerAbilityModel,
      loftedpass: PlayerAbilityModel,
      finishing: PlayerAbilityModel,
      heading: PlayerAbilityModel,
      placekicking: PlayerAbilityModel,
      curl: PlayerAbilityModel,
      speed: PlayerAbilityModel,
      acceleration: PlayerAbilityModel,
      kickingpower: PlayerAbilityModel,
      jump: PlayerAbilityModel,
      physicalcontact: PlayerAbilityModel,
      stamina: PlayerAbilityModel,
      defensiveawareness: PlayerAbilityModel,
      ballwinning: PlayerAbilityModel,
      defensiveengagement: PlayerAbilityModel,
      aggression: PlayerAbilityModel,
      gkawareness: PlayerAbilityModel,
      gkcatching: PlayerAbilityModel,
      gkclearing: PlayerAbilityModel,
      gkreflexes: PlayerAbilityModel,
      gkreach: PlayerAbilityModel,
      weakfootusage: PlayerAbilityModel,
      weakfootaccuracy: PlayerAbilityModel,
      form: PlayerAbilityModel,
      injuryresistance: PlayerAbilityModel,
      reputation: PlayerAbilityModel,
      playingattitude: PlayerAbilityModel,
      balance: PlayerAbilityModel,
    }),
    name: types.optional(types.string, ""),
    overall: PlayerOverallModel,
    playerBasicInfo: PlayerBasicInfoModel,
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface PlayerFilters extends Instance<typeof PlayerFiltersModel> {}
export interface PlayerFiltersSnapshotOut extends SnapshotOut<typeof PlayerFiltersModel> {}
export interface PlayerFiltersSnapshotIn extends SnapshotIn<typeof PlayerFiltersModel> {}
export const createPlayerFiltersDefaultModel = () => types.optional(PlayerFiltersModel, {})
