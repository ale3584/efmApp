import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Image, StyleSheet, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Text } from "app/components"
import { ITEM_HEIGHT, SPACING, width, height } from "./HomeScreen"
interface PlayerDetailsScreenProps extends AppStackScreenProps<"PlayerDetails"> {}

const TOP_HEADER_HEIGHT = height * 0.3

// @ts-ignore
export const PlayerDetailsScreen: FC<PlayerDetailsScreenProps> = observer(
  function PlayerDetailsScreen({ navigation, route }) {
    const { item } = route.params
    return (
      <View style={{ flex: 1, padding: SPACING }}>
        <View
          style={[
            StyleSheet.absoluteFillObject,
            // eslint-disable-next-line react-native/no-inline-styles, react-native/no-color-literals
            {
              backgroundColor: "grey",
              borderRadius: 16,
              padding: SPACING,
              height: TOP_HEADER_HEIGHT,
            },
          ]}
        >
          <Text style={styles.name}>{item.name}</Text>
          <Text>{item.overall}</Text>
          <Image
            style={styles.image}
            source={{ uri: "https://api.efootballdb.com/assets/2022/players/7511_.png" }}
          />
          <View style={styles.bg}></View>
        </View>
      </View>
    )
  },
)

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
    height: ITEM_HEIGHT * 0.8,
    position: "absolute",
    resizeMode: "contain",
    right: SPACING,
    top: TOP_HEADER_HEIGHT,
    width: ITEM_HEIGHT * 0.8,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
  },
})
