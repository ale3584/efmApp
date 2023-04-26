import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Image, ScrollView, StyleSheet, View } from "react-native"
import { AppStackScreenProps } from "../../navigators"
import { AntDesign } from "@expo/vector-icons"
import { ITEM_HEIGHT, SPACING, width, height, TO_COLOR, FROM_COLOR } from "../HomeScreen"
import * as Animatable from "react-native-animatable"
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg"
import { Text } from "native-base"
import { useStores } from "app/models"

interface PlayerDetailsScreenProps extends AppStackScreenProps<"PlayerDetails"> {}

const TOP_HEADER_HEIGHT = height * 0.3

// @ts-ignore
export const PlayerDetailsScreen: FC<PlayerDetailsScreenProps> = observer(
  function PlayerDetailsScreen({ navigation, route }) {
    const { item } = route.params
    const [isloading, setIsloading] = useState(false)
    const { playerStore } = useStores()
    const [player, setPlayer] = useState({})

    const onfetchPlayer = async () => {
      if (isloading) {
        return
      }

      await setIsloading(true)
      await playerStore.fetchPlayer(item.id)
      setPlayer(playerStore.player)
      await setIsloading(false)
    }

    useEffect(() => {
      onfetchPlayer()
    }, null)

    return (
      <View style={{ flex: 1 }}>
        <AntDesign
          name="arrowleft"
          size={28}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            padding: 12,
            position: "absolute",
            top: SPACING * 2 + 5,
            left: SPACING,
            zIndex: 2,
          }}
          color={"#333"}
          onPress={() => {
            navigation.goBack()
          }}
        />
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
        <View
          style={[
            StyleSheet.absoluteFillObject,
            // eslint-disable-next-line react-native/no-inline-styles, react-native/no-color-literals
            {
              // backgroundColor: "grey",
              borderRadius: 16,
              padding: SPACING,
              height: TOP_HEADER_HEIGHT + 32,
            },
          ]}
        >
          <Text style={styles.name}>{player.name}</Text>
          <Text style={styles.rating}>{player.overall}</Text>
          <Text style={styles.mainPosition}>{player.registeredPosition}</Text>
          <Text style={styles.playingStyle}>{player.playingStyles}</Text>
          <Image
            style={styles.image}
            source={{ uri: "https://api.efootballdb.com/assets/2022/players/7511_.png" }}
          />
          <View style={styles.bg}>
            <ScrollView style={{ flex: 1 }}>
              <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Animatable.View
                  animation="bounceIn"
                  delay={1 + 1 * 100}
                  // eslint-disable-next-line react-native/no-inline-styles, react-native/no-color-literals
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
                </Animatable.View>
                <Animatable.View
                  animation="bounceIn"
                  delay={1 + 2 * 100}
                  // eslint-disable-next-line react-native/no-inline-styles, react-native/no-color-literals
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
                </Animatable.View>
                <Animatable.View
                  animation="bounceIn"
                  delay={1 + 3 * 100}
                  // eslint-disable-next-line react-native/no-inline-styles, react-native/no-color-literals
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
                </Animatable.View>
              </View>
              <View>
                <Text>{player.name}</Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    )
  },
)

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  bg: {
    backgroundColor: "white",
    borderRadius: 32,
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
  mainPosition: {
    fontSize: 18,
    fontWeight: "700",
    left: SPACING,
    position: "absolute",
    top: TOP_HEADER_HEIGHT - SPACING * 2,
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
    top: TOP_HEADER_HEIGHT - SPACING * 4,
  },
  rating: {
    fontSize: 18,
    fontWeight: "700",
    left: SPACING,
    position: "absolute",
    top: TOP_HEADER_HEIGHT - SPACING * 6,
  },
})
