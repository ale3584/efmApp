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
import { Picker } from "@react-native-picker/picker"
import React, { useEffect, useRef, useState } from "react"
import { FONTS, colors, typography } from "app/theme"
import { AntDesign } from "@expo/vector-icons"
import { TwoPointsSlider } from "app/components"
import { Divider, List } from "react-native-paper"
import { Checkbox, Select, Box, Center } from "native-base"
import { PlayerFiltersPosition, PlayerFiltersPStyle } from "app/models/PlayerFilters"
import { useStores } from "app/models"
import { observer } from "mobx-react-lite"

const { height } = Dimensions.get("window")

interface FiltersScreenProps {
  modalVisible: boolean
  closeModal: () => void
}

export const FiltersScreen = observer(({ modalVisible, closeModal }: FiltersScreenProps) => {
  const modalAnimatedValue = useRef(new Animated.Value(0)).current
  const [showFilterModal, setShowFilterModal] = useState(modalVisible)
  const [basicExpanded, setbasicExpanded] = useState(true)
  const [positionExpanded, setpositionExpanded] = useState(false)
  const [abilityExpanded, setabilityExpanded] = useState(false)
  const [styleExpanded, setstyleExpanded] = useState(false)
  const [skillExpanded, setskillExpanded] = useState(false)
  const { playerFilters } = useStores()

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
      }).start(() => closeModal())
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
            values={[18, 45]}
            min={15}
            max={50}
            onValuesChange={(values) => console.log(values)}
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
            values={[130, 210]}
            min={100}
            max={227}
            onValuesChange={(values) => console.log(values)}
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
            values={[40, 120]}
            min={30}
            max={157}
            onValuesChange={(values) => console.log(values)}
          />
        </View>
      </Section>
    )
  }

  const handlePressBasic = () => setbasicExpanded(!basicExpanded)
  const handlePressPosition = () => setpositionExpanded(!positionExpanded)
  const handlePressAbility = () => setabilityExpanded(!abilityExpanded)
  const handlePressStyle = () => setstyleExpanded(!styleExpanded)
  const handlePressSkill = () => setskillExpanded(!skillExpanded)

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.transparentBlack,
        }}
      >
        <TouchableWithoutFeedback onPress={() => setShowFilterModal(false)}>
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
            <TouchableOpacity onPress={() => setShowFilterModal(false)}>
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
                            onValueChange={(itemValue) => console.log({ itemValue })}
                            width={100}
                          >
                            <Select.Item label="A" value="A" />
                            <Select.Item label="B" value="B" />
                            <Select.Item label="C" value="C" />
                          </Select>
                          <Select
                            selectedValue={playerFilters.playedPositions[key.toLowerCase()].max}
                            onValueChange={(itemValue) => console.log({ itemValue })}
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
              title="Ability Settings"
              expanded={abilityExpanded}
              onPress={handlePressAbility}
              right={(props) =>
                abilityExpanded ? (
                  <AntDesign name="up" size={20} />
                ) : (
                  <AntDesign name="right" size={20} />
                )
              }
            >
              <Text></Text>
            </List.Accordion>
            <List.Accordion
              title="Style Settings"
              expanded={styleExpanded}
              onPress={handlePressStyle}
              right={(props) =>
                styleExpanded ? (
                  <AntDesign name="up" size={20} />
                ) : (
                  <AntDesign name="right" size={20} />
                )
              }
            >
              <Text></Text>
            </List.Accordion>
            <List.Accordion
              title="Skill Settings"
              expanded={skillExpanded}
              onPress={handlePressSkill}
              right={(props) =>
                skillExpanded ? (
                  <AntDesign name="up" size={20} />
                ) : (
                  <AntDesign name="right" size={20} />
                )
              }
            >
              <Text></Text>
            </List.Accordion>
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
})
