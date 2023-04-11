import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TouchableOpacity, View, ViewStyle, Image, StyleSheet, Dimensions } from "react-native"
import { AppStackScreenProps } from "../navigators"
import { Button, Screen, Text } from "../components"
import { useStores } from "../models"
import { FlashList } from "@shopify/flash-list"

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const { width, height } = Dimensions.get("window")
export const ITEM_HEIGHT = height * 0.18
export const SPACING = 10

// @ts-ignore
export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen(_props) {
  const { navigation } = _props
  const { playerStore } = useStores()
  const {
    authStore: { logout, authToken, refreshToken },
  } = useStores()

  const onfetchPlayers = async (refToken, accToken) => {
    console.log(refToken)
    await playerStore.fetchPlayers(refToken, accToken)
  }

  return (
    <Screen style={$root} preset="scroll">
      <Text text="home" />
      <Button onPress={logout}>
        <Text>Logout</Text>
      </Button>
      <Button onPress={() => onfetchPlayers(refreshToken, authToken)}>
        <Text>Fetch</Text>
      </Button>
      <View style={{ flex: 1 }}>
        <FlashList
          data={playerStore.players}
          keyExtractor={(item) => `${item.id}`}
          contentContainerStyle={{ padding: SPACING }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("PlayerDetails", { item })
              }}
              style={{ marginBottom: SPACING, height: ITEM_HEIGHT }}
            >
              <View style={{ flex: 1, padding: SPACING }}>
                <View
                  style={[
                    StyleSheet.absoluteFillObject,
                    // eslint-disable-next-line react-native/no-inline-styles, react-native/no-color-literals
                    { backgroundColor: "grey", borderRadius: 16, padding: SPACING },
                  ]}
                >
                  <Text style={styles.name}>{item.name}</Text>
                  <Text>{item.overall}</Text>
                  <Image
                    style={styles.image}
                    source={{ uri: "https://api.efootballdb.com/assets/2022/players/7511_.png" }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
          estimatedItemSize={10}
        />
        <View style={styles.bg} />
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  bg: {
    backgroundColor: "red",
    borderRadius: 32,
    height,
    position: "absolute",
    transform: [{ translateY: height }],
    width,
  },
  image: {
    bottom: 0,
    height: ITEM_HEIGHT * 0.8,
    position: "absolute",
    resizeMode: "contain",
    right: SPACING,
    width: ITEM_HEIGHT * 0.8,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
  },
})
