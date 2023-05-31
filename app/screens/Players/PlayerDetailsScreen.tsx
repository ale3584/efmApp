import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Image, ScrollView, StyleSheet, View } from "react-native"
import { AppStackScreenProps } from "../../navigators"
import { AntDesign } from "@expo/vector-icons"
import { ITEM_HEIGHT, SPACING, width, height, TO_COLOR, FROM_COLOR } from "../HomeScreen"
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg"
import { Text } from "native-base"
import { useStores } from "app/models"
import { PStyleToString, Position } from "app/models/Player"
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade } from "rn-placeholder"

interface PlayerDetailsScreenProps extends AppStackScreenProps<"PlayerDetails"> {}

const TOP_HEADER_HEIGHT = height * 0.3

// @ts-ignore
export const PlayerDetailsScreen: FC<PlayerDetailsScreenProps> = observer(
  function PlayerDetailsScreen({ navigation, route }) {
    const { item } = route.params
    const [isloading, setIsloading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const { playerStore } = useStores()

    const handleError = () => {
      setHasError(true)
    }

    const imageUrl = hasError
      ? "https://www.efootballdb.com/img/players/player_noface.png"
      : `https://api.efootballdb.com/assets/2022/players/${playerStore.player.id}_.png`

    const onfetchPlayer = async () => {
      if (isloading || playerStore.player.id === item.id) {
        return
      }

      try {
        setIsloading(true)
        await playerStore.fetchPlayer(item.id)
      } catch (error) {
        console.error(error)
        // handle error, maybe set it in state
      } finally {
        setIsloading(false)
      }
    }

    useEffect(() => {
      onfetchPlayer()
    }, null)

    const renderSection = (title: string, data: Record<any, any>) => {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{title}</Text>
          {Object.entries(data).map(([key, value]) => (
            <View key={key} style={styles.row}>
              <Text style={styles.key}>{key}:</Text>
              <Text style={styles.value}>{value}</Text>
            </View>
          ))}
        </View>
      )
    }

    return (
      <View style={{ flex: 1 }}>
        {gradientHead()}
        {isloading ? (
          <Placeholder Animation={Fade} style={{ flex: 1 }}>
            <PlaceholderMedia style={styles.image} />
            <PlaceholderLine width={30} style={styles.name} />
            <PlaceholderLine width={5} style={styles.rating} />
            <PlaceholderLine width={10} style={styles.mainPosition} />
            <PlaceholderLine width={30} style={styles.playingStyle} />
            <View style={styles.bg} />
          </Placeholder>
        ) : (
          <View>
            <View style={{ flex: 1 }}>
              <AntDesign
                name="arrowleft"
                size={28}
                style={styles.arrowLeftIcon}
                color={"#333"}
                onPress={() => {
                  navigation.goBack()
                }}
              />
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  {
                    borderRadius: 16,
                    padding: SPACING,
                    height: TOP_HEADER_HEIGHT + 20,
                  },
                ]}
              >
                <Text style={styles.name}>{playerStore.player.name}</Text>
                <Text style={styles.rating}>{playerStore.player.overall}</Text>
                <Text style={styles.mainPosition}>
                  {Position[playerStore.player.registeredPosition]}
                </Text>
                <Text style={styles.playingStyle}>
                  {PStyleToString[playerStore.player.playingStyles]}
                </Text>
                <Image style={styles.image} source={{ uri: imageUrl }} onError={handleError} />
                <View style={styles.bg}>
                  <View style={{ paddingBottom: 10 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "blue",
                          height: 64,
                          width: 64,
                          borderRadius: 32,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <AntDesign name="home" size={24} color={"white"} />
                      </View>
                      <View
                        style={{
                          backgroundColor: "yellow",
                          height: 64,
                          width: 64,
                          borderRadius: 32,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <AntDesign name="antdesign" size={24} color={"white"} />
                      </View>
                      <View
                        style={{
                          backgroundColor: "pink",
                          height: 64,
                          width: 64,
                          borderRadius: 32,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <AntDesign name="book" size={24} color={"white"} />
                      </View>
                    </View>
                    <ScrollView>
                      {playerStore.player.playedPositions &&
                        renderSection("Played Positions", playerStore.player.playedPositions)}
                      {playerStore.player.playedPositionsRating &&
                        renderSection(
                          "Played Positions Rating",
                          playerStore.player.playedPositionsRating,
                        )}
                      {playerStore.player.teamPlayStyle &&
                        renderSection("Team Play Style", playerStore.player.teamPlayStyle)}
                      {playerStore.player.playerSkills &&
                        renderSection("Player Skills", playerStore.player.playerSkills)}
                      {playerStore.player.playerStylesAI &&
                        renderSection("Player Styles AI", playerStore.player.playerStylesAI)}
                      {playerStore.player.playerAbility &&
                        renderSection("Player Ability", playerStore.player.playerAbility)}
                      {/* {playerStore.player.playerBasicInfo &&
                  renderSection("Player Basic Info", playerStore.player.playerBasicInfo)} */}
                    </ScrollView>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    )
  },
)

const styles = StyleSheet.create({
  arrowLeftIcon: {
    left: SPACING,
    padding: 12,
    position: "absolute",
    top: SPACING * 2 + 5,
    zIndex: 2,
  },
  // eslint-disable-next-line react-native/no-color-literals
  bg: {
    backgroundColor: "white",
    borderRadius: 32,
    flex: 1,
    height,
    padding: SPACING,
    paddingTop: 32 + SPACING,
    position: "absolute",
    transform: [{ translateY: TOP_HEADER_HEIGHT }],
    width,
  },
  // eslint-disable-next-line react-native/no-color-literals
  image: {
    height: ITEM_HEIGHT * 0.8,
    position: "absolute",
    resizeMode: "contain",
    right: SPACING + 12,
    top: TOP_HEADER_HEIGHT - ITEM_HEIGHT * 0.8,
    width: ITEM_HEIGHT * 0.8,
  },
  key: {
    fontSize: 14,
    fontWeight: "600",
  },
  mainPosition: {
    fontSize: 18,
    fontWeight: "700",
    left: SPACING,
    position: "absolute",
    top: TOP_HEADER_HEIGHT - SPACING * 4,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    left: SPACING,
    position: "absolute",
    top: TOP_HEADER_HEIGHT - SPACING * 8,
  },
  playingStyle: {
    fontSize: 18,
    fontWeight: "700",
    left: SPACING,
    position: "absolute",
    top: TOP_HEADER_HEIGHT - SPACING * 2,
  },
  rating: {
    fontSize: 18,
    fontWeight: "700",
    left: SPACING,
    position: "absolute",
    top: TOP_HEADER_HEIGHT - SPACING * 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  section: {
    marginBottom: SPACING,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  value: {
    fontSize: 14,
  },
})
function gradientHead() {
  return (
    <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
      <Defs>
        <LinearGradient id="grad" x1={"0%"} x2={"100%"} y1={"0%"} y2={"100%"}>
          <Stop offset="0" stopColor={FROM_COLOR} />
          <Stop offset="1" stopColor={TO_COLOR} />
        </LinearGradient>
      </Defs>
      <Rect
        // rx={16}
        width="100%"
        height={TOP_HEADER_HEIGHT + 32}
        fill="url(#grad)"
      />
    </Svg>
  )
}
