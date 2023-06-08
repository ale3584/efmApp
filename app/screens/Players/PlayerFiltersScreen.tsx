import {
  View,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native"
import React, { useEffect, useRef, useState } from "react"
import { FONTS, colors, typography } from "app/theme"
import { AntDesign } from "@expo/vector-icons"
import { Button, TwoPointsSlider } from "app/components"
import { Divider, List, Chip } from "react-native-paper"
import { Checkbox, Select, Box, Center } from "native-base"
import {
  PlayerAbility,
  PlayerFiltersPosition,
  PlayerPositionRating,
  PlayerSkills,
  PlayerStylesAI,
  PlayerTeamPlayStyle,
} from "app/models/PlayerFilters"
import { useStores } from "app/models"
import { observer } from "mobx-react-lite"
import { spacing } from "../../theme"
import { onSnapshot } from "mobx-state-tree"
import { pl } from "date-fns/locale"

const { height } = Dimensions.get("window")

interface FiltersScreenProps {
  modalVisible: boolean
  closeModal: (justClose: boolean) => void
}

export const FiltersScreen = observer(({ modalVisible, closeModal }: FiltersScreenProps) => {
  const modalAnimatedValue = useRef(new Animated.Value(0)).current
  const [showFilterModal, setShowFilterModal] = useState(modalVisible)
  const [basicExpanded, setbasicExpanded] = useState(false)
  const [positionExpanded, setpositionExpanded] = useState(false)
  const [abilityExpanded, setabilityExpanded] = useState(false)
  const [skillExpanded, setskillExpanded] = useState(false)
  const [styleAIExpanded, setstyleAIExpanded] = useState(false)
  const [posRatingExpanded, setposRatingExpanded] = useState(false)
  const [teamPlayStyleExpanded, setteamPlayStyleExpanded] = useState(false)
  const [justClose, setJustClose] = useState(false)
  const { playerFilters } = useStores()

  onSnapshot(playerFilters, (snapshot) => {
    if (playerFilters.isClose) {
      return
    }
    playerFilters.setIsFiltered(true)
    return
  })

  useEffect(() => {
    if (showFilterModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start()
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => closeModal(justClose))
    }
  }, [showFilterModal])

  const modelY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [height, height * 0.2],
  })

  const Section = ({ containerStyle = {}, title, children }) => {
    return (
      <View
        style={{
          marginTop: 10,
          marginBottom: 15,
          ...containerStyle,
        }}
      >
        <Text
          style={{
            ...FONTS.h3,
          }}
        >
          {title}
        </Text>
        {children}
      </View>
    )
  }

  function renderAge() {
    return (
      <Section title={"Age"}>
        <View
          style={{
            alignItems: "center",
            flex: 1,
          }}
        >
          <TwoPointsSlider
            values={[playerFilters.playerBasicInfo.age.min, playerFilters.playerBasicInfo.age.max]}
            min={15}
            max={50}
            onValuesChange={(values) =>
              playerFilters.playerBasicInfo.age.setValues(values[0], values[1])
            }
          />
        </View>
      </Section>
    )
  }

  function renderHeight() {
    return (
      <Section title={"Height"}>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <TwoPointsSlider
            values={[
              playerFilters.playerBasicInfo.height.min,
              playerFilters.playerBasicInfo.height.max,
            ]}
            min={100}
            max={227}
            onValuesChange={(values) =>
              playerFilters.playerBasicInfo.height.setValues(values[0], values[1])
            }
          />
        </View>
      </Section>
    )
  }
  function renderWeight() {
    return (
      <Section title={"Weight"}>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <TwoPointsSlider
            values={[
              playerFilters.playerBasicInfo.weight.min,
              playerFilters.playerBasicInfo.weight.max,
            ]}
            min={30}
            max={157}
            onValuesChange={(values) =>
              playerFilters.playerBasicInfo.weight.setValues(values[0], values[1])
            }
          />
        </View>
      </Section>
    )
  }

  const handlePressBasic = () => setbasicExpanded(!basicExpanded)
  const handlePressPosition = () => setpositionExpanded(!positionExpanded)
  const handlePressAbility = () => setabilityExpanded(!abilityExpanded)
  const handlePressSkill = () => setskillExpanded(!skillExpanded)
  const handlePressStyleAI = () => setstyleAIExpanded(!styleAIExpanded)
  const handlePressPosRating = () => setposRatingExpanded(!posRatingExpanded)
  const handlePressTeamPlayStyle = () => setteamPlayStyleExpanded(!teamPlayStyleExpanded)

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.transparentBlack,
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setShowFilterModal(false)
            setJustClose(true)
          }}
        >
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          ></View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: "absolute",
            top: modelY,
            left: 0,
            width: "100%",
            height: "100%",
            padding: 20,
            backgroundColor: "#FFFFFF",
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                flex: 1,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Filters
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowFilterModal(false)
                setJustClose(true)
              }}
            >
              <View style={styles.icon}>
                <AntDesign name="close" size={20} />
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 250,
            }}
          >
            <Divider style={{ marginTop: 10, marginBottom: 10 }} />
            <List.Accordion
              title="Basic Settings"
              expanded={basicExpanded}
              onPress={handlePressBasic}
              right={(props) =>
                basicExpanded ? (
                  <AntDesign name="up" size={20} />
                ) : (
                  <AntDesign name="right" size={20} />
                )
              }
            >
              {renderAge()}
              {renderHeight()}
              {renderWeight()}
            </List.Accordion>
            <List.Accordion
              title="Position Settings"
              expanded={positionExpanded}
              onPress={handlePressPosition}
              right={(props) =>
                positionExpanded ? (
                  <AntDesign name="up" size={20} />
                ) : (
                  <AntDesign name="right" size={20} />
                )
              }
              style={{ marginBottom: 10 }}
            >
              {Object.keys(PlayerFiltersPosition).map((key) => {
                if (playerFilters.playedPositions[key.toLowerCase()]) {
                  return (
                    <View key={key.toLowerCase()}>
                      <Box
                        alignSelf="center"
                        alignItems={"center"}
                        alignContent={"center"}
                        style={{ flex: 1, flexDirection: "row", marginBottom: 10 }}
                      >
                        <Center
                          style={{ flex: 4, flexDirection: "row" }}
                          alignItems={"center"}
                          alignSelf={"center"}
                        >
                          <Box>
                            <Checkbox
                              isChecked={playerFilters.playedPositions[key.toLowerCase()].selected}
                              value="check"
                              accessibilityLabel="This is CheckBox"
                              onChange={() =>
                                playerFilters.playedPositions[key.toLowerCase()].toggle()
                              }
                              style={{ margin: 10 }}
                            />
                          </Box>
                          <Box style={{ width: 30, marginLeft: 5, marginRight: 5 }}>{key}</Box>

                          <Select
                            selectedValue={playerFilters.playedPositions[key.toLowerCase()].min}
                            accessibilityLabel="Choose Rating"
                            placeholder="Choose Rating"
                            onValueChange={(itemValue) =>
                              playerFilters.playedPositions[key.toLowerCase()].setMin(itemValue)
                            }
                            width={100}
                          >
                            <Select.Item label="A" value="A" />
                            <Select.Item label="B" value="B" />
                            <Select.Item label="C" value="C" />
                          </Select>
                          <Select
                            selectedValue={playerFilters.playedPositions[key.toLowerCase()].max}
                            onValueChange={(itemValue) =>
                              playerFilters.playedPositions[key.toLowerCase()].setMax(itemValue)
                            }
                            width={100}
                            marginLeft={5}
                          >
                            <Select.Item label="A" value="A" />
                            <Select.Item label="B" value="B" />
                            <Select.Item label="C" value="C" />
                          </Select>
                        </Center>
                      </Box>
                    </View>
                  )
                }
                return null
              })}
            </List.Accordion>
            <List.Accordion
              title="Position Rating"
              expanded={posRatingExpanded}
              onPress={handlePressPosRating}
              right={() =>
                posRatingExpanded ? (
                  <AntDesign name="up" size={20} />
                ) : (
                  <AntDesign name="right" size={20} />
                )
              }
            >
              {Object.keys(PlayerPositionRating).map((key) => {
                return (
                  <Section title={PlayerPositionRating[key]} key={key}>
                    <View
                      style={{
                        alignItems: "center",
                        flex: 1,
                      }}
                    >
                      <TwoPointsSlider
                        values={[
                          playerFilters.playedPositionsRating[key].min,
                          playerFilters.playedPositionsRating[key].max,
                        ]}
                        min={40}
                        max={99}
                        onValuesChange={(values) => {
                          playerFilters.playedPositionsRating[key].setValues(values[0], values[1])
                        }}
                      />
                    </View>
                  </Section>
                )
              })}
            </List.Accordion>
            <List.Accordion
              title="Ability Settings"
              expanded={abilityExpanded}
              onPress={handlePressAbility}
              right={() =>
                abilityExpanded ? (
                  <AntDesign name="up" size={20} />
                ) : (
                  <AntDesign name="right" size={20} />
                )
              }
            >
              {Object.keys(PlayerAbility).map((key) => {
                return (
                  <Section title={PlayerAbility[key]} key={key}>
                    <View
                      style={{
                        alignItems: "center",
                        flex: 1,
                      }}
                    >
                      <TwoPointsSlider
                        values={[
                          playerFilters.playerAbility[key].min,
                          playerFilters.playerAbility[key].max,
                        ]}
                        min={playerFilters.playerAbility[key].defMin}
                        max={playerFilters.playerAbility[key].defMax}
                        onValuesChange={(values) => {
                          playerFilters.playerAbility[key].setValues(values[0], values[1])
                        }}
                      />
                    </View>
                  </Section>
                )
              })}
            </List.Accordion>
            <List.Accordion
              title="Team play style Settings"
              expanded={teamPlayStyleExpanded}
              onPress={handlePressTeamPlayStyle}
              right={() =>
                teamPlayStyleExpanded ? (
                  <AntDesign name="up" size={20} />
                ) : (
                  <AntDesign name="right" size={20} />
                )
              }
            >
              {Object.keys(PlayerTeamPlayStyle).map((key) => {
                return (
                  <Section title={PlayerTeamPlayStyle[key]} key={key}>
                    <View
                      style={{
                        alignItems: "center",
                        flex: 1,
                      }}
                    >
                      <TwoPointsSlider
                        values={[
                          playerFilters.teamPlayStyle[key].min,
                          playerFilters.teamPlayStyle[key].max,
                        ]}
                        min={40}
                        max={99}
                        onValuesChange={(values) => {
                          playerFilters.teamPlayStyle[key].setValues(values[0], values[1])
                        }}
                      />
                    </View>
                  </Section>
                )
              })}
            </List.Accordion>
            <List.Accordion
              title="Skills Settings"
              expanded={skillExpanded}
              onPress={handlePressSkill}
              right={() =>
                skillExpanded ? (
                  <AntDesign name="up" size={20} />
                ) : (
                  <AntDesign name="right" size={20} />
                )
              }
            >
              <View style={{ flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 12 }}>
                {Object.keys(PlayerSkills).map((key) => {
                  return (
                    <Chip
                      key={key}
                      mode="outlined"
                      selected={playerFilters.playerSkills[key].selected}
                      style={{ margin: 5 }}
                      onPress={() => playerFilters.playerSkills[key].toggle()}
                      icon={() => {
                        if (playerFilters.playerSkills[key].selected) {
                          return <AntDesign name="check" size={20} />
                        }
                        return null
                      }}
                    >
                      {PlayerSkills[key]}
                    </Chip>
                  )
                })}
              </View>
            </List.Accordion>
            <List.Accordion
              title="AI Style Settings"
              expanded={styleAIExpanded}
              onPress={handlePressStyleAI}
              right={() =>
                styleAIExpanded ? (
                  <AntDesign name="up" size={20} />
                ) : (
                  <AntDesign name="right" size={20} />
                )
              }
            >
              <View style={{ flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 12 }}>
                {Object.keys(PlayerStylesAI).map((key) => {
                  return (
                    <Chip
                      key={key}
                      mode="outlined"
                      selected={playerFilters.playerStylesAI[key].selected}
                      style={{ margin: 5 }}
                      onPress={() => playerFilters.playerStylesAI[key].toggle()}
                      icon={() => {
                        if (playerFilters.playerStylesAI[key].selected) {
                          return <AntDesign name="check" size={20} />
                        }
                        return null
                      }}
                    >
                      {PlayerStylesAI[key]}
                    </Chip>
                  )
                })}
              </View>
            </List.Accordion>
            <Center style={{ flexDirection: "row" }} justifyItems="center">
              <Button
                style={styles.button}
                onPress={() => {
                  setShowFilterModal(false)
                  setJustClose(false)
                }}
                LeftAccessory={() => (
                  <AntDesign
                    name="check"
                    size={20}
                    style={{ marginHorizontal: 5, color: "#376AED" }}
                  />
                )}
              >
                Apply filters
              </Button>
              <Button
                style={styles.button}
                onPress={() => {
                  playerFilters.clear()
                  playerFilters.setIsFiltered(false)
                  playerFilters.setIsClose(true)
                  setShowFilterModal(false)
                  setJustClose(false)
                }}
                RightAccessory={() => (
                  <AntDesign
                    name="close"
                    size={20}
                    style={{ marginHorizontal: 5, color: "#FF2233" }}
                  />
                )}
              >
                Clear
              </Button>
            </Center>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  )
})

const styles = StyleSheet.create({
  icon: {
    //backgroundColor: "#999999",
    color: "#999999",
    padding: 5,
    borderTopEndRadius: 5,
    borderBottomEndRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: "#999999",
    borderWidth: 1,
  },
  button: {
    alignItems: "center",
    //backgroundColor: "#376AED",
    borderColor: "#999999",
    borderRadius: 35,
    borderWidth: 1,
    height: 50,
    justifyContent: "center",
    marginHorizontal: 5,
    marginTop: spacing.extraSmall,
    marginVertical: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
})
