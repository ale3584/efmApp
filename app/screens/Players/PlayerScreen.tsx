import React, { FC, useEffect } from "react"
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
import { Button, EmptyState, Screen, Text } from "app/components"
import { FlashList } from "@shopify/flash-list"
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg"
import { useStores } from "app/models"
import * as Animatable from "react-native-animatable"

const { width, height } = Dimensions.get("window")
const ITEM_HEIGHT = height * 0.18
const SPACING = 10
const FROM_COLOR = "#F8EB7D"
const TO_COLOR = "#3287D6"

// @ts-ignore
export const PlayerScreen: FC<StackScreenProps<AppStackScreenProps, "Player">> = observer(
  function PlayerScreen(_props) {
    const { navigation } = _props
    const { playerStore } = useStores()
    const {
      authStore: { authToken, refreshToken },
    } = useStores()

    const [refreshing, setRefreshing] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    // initially, kick off a background refresh without the refreshing UI
    // useEffect(() => {
    //   ;(async function load(refToken, accToken) {
    //     setIsLoading(true)
    //     await playerStore.fetchPlayers(refToken, accToken)
    //     setIsLoading(false)
    //   })()
    // }, [playerStore.players])

    const onfetchPlayers = async (refToken, accToken) => {
      await playerStore.fetchPlayers(refToken, accToken)
    }

    return (
      <Screen style={$root} preset="scroll">
        <View>
          {/* <Button onPress={() => onfetchPlayers(refreshToken, authToken)}>
            <Text>Fetch</Text>
          </Button> */}
        </View>
        <View style={{ flex: 1 }}>
          <FlashList
            data={playerStore.players}
            keyExtractor={(item) => `${item.id}`}
            contentContainerStyle={{ padding: SPACING }}
            ListEmptyComponent={
              isLoading ? (
                <ActivityIndicator />
              ) : (
                <EmptyState
                  preset="generic"
                  headingTx={undefined}
                  contentTx={undefined}
                  button={undefined}
                  ImageProps={{ resizeMode: "contain" }}
                />
              )
            }
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
                      source={{ uri: "https://api.efootballdb.com/assets/2022/players/7511_.png" }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )}
            estimatedItemSize={10}
          />
          {/* <View style={styles.bg} /> */}
        </View>
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
