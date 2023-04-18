import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
import { FlashList } from "@shopify/flash-list"
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg"
import { useStores } from "app/models"
import * as Animatable from "react-native-animatable"

const { height } = Dimensions.get("window")
const ITEM_HEIGHT = height * 0.18
const SPACING = 10
const FROM_COLOR = "#F8EB7D"
const TO_COLOR = "#3287D6"

// @ts-ignore
export const PlayerScreen: FC<StackScreenProps<AppStackScreenProps, "Player">> = observer(
  function PlayerScreen(_props) {
    const { navigation } = _props
    const [data, setData] = useState([])
    const {
      playerStore,
      playerStore: { isLoading, error },
    } = useStores()

    const { authStore } = useStores()

    const onfetchPlayers = async () => {
      if (authStore.checkToken()) {
        playerStore.appendPlayers(
          authStore.refreshToken,
          authStore.authToken,
          playerStore.currentPage,
        )
        setData([...data, ...playerStore.players])
      } else {
        authStore.logout()
      }
    }

    useEffect(() => {
      onfetchPlayers()
    }, [])

    const handleEndReached = () => {
      if (!playerStore.isLoading) {
        playerStore.setCurrentPage(playerStore.currentPage + 1)
        playerStore.appendPlayers(
          authStore.refreshToken,
          authStore.authToken,
          playerStore.currentPage,
        )
        setData([...data, ...playerStore.players])
      }
    }
    return (
      <Screen style={$root} preset="scroll">
        {isLoading ? (
          <ActivityIndicator />
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          <View style={{ flex: 1 }}>
            <FlashList
              onEndReached={() => handleEndReached()}
              data={data}
              keyExtractor={(item) => `${item.id}`}
              contentContainerStyle={{ padding: SPACING }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("PlayerDetails", { item })
                  }}
                  style={{ marginBottom: SPACING, height: ITEM_HEIGHT }}
                >
                  <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
                    <Defs>
                      <LinearGradient id="grad" x1={"0%"} x2={"100%"} y1={"0%"} y2={"100%"}>
                        <Stop offset="0" stopColor={FROM_COLOR} />
                        <Stop offset="1" stopColor={TO_COLOR} />
                      </LinearGradient>
                    </Defs>
                    <Rect rx={16} width="100%" height="100%" fill="url(#grad)" />
                  </Svg>
                  <View style={{ flex: 1, padding: SPACING }}>
                    <View
                      style={[
                        StyleSheet.absoluteFillObject,
                        // eslint-disable-next-line react-native/no-inline-styles, react-native/no-color-literals
                        { borderRadius: 16, padding: SPACING },
                      ]}
                    >
                      <Text style={styles.name}>{item.name}</Text>
                      <Text>{item.overall}</Text>
                      <Animatable.Image
                        animation="fadeIn"
                        style={styles.image}
                        source={{
                          uri: "https://api.efootballdb.com/assets/2022/players/7511_.png",
                        }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              estimatedItemSize={4}
            />
            {/* <View style={styles.bg} /> */}
          </View>
        )}
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}

const styles = StyleSheet.create({
  image: {
    bottom: 0,
    height: ITEM_HEIGHT * 0.8,
    position: "absolute",
    resizeMode: "contain",
    right: SPACING,
    width: ITEM_HEIGHT * 0.8,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
  },
})
