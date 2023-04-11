import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Image, ScrollView, StyleSheet, View, Animated } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
import { AntDesign } from "@expo/vector-icons"
import { ITEM_HEIGHT, SPACING, width, height } from "./HomeScreen"

interface PlayerDetailsScreenProps extends AppStackScreenProps<"PlayerDetails"> {}

const TOP_HEADER_HEIGHT = height * 0.3

// @ts-ignore
export const PlayerDetailsScreen: FC<PlayerDetailsScreenProps> = observer(
  function PlayerDetailsScreen({ navigation, route }) {
    const { item } = route.params
    return (
      <Screen safeAreaEdges={["top", "bottom"]} preset="fixed" style={{ flex: 1 }}>
        <AntDesign
          name="arrowleft"
          size={28}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            padding: 12,
            position: "absolute",
            top: SPACING * 2,
            left: SPACING,
            zIndex: 2,
          }}
          color={"#333"}
          onPress={() => {
            navigation.goBack()
          }}
        />
        <View
          style={[
            StyleSheet.absoluteFillObject,
            // eslint-disable-next-line react-native/no-inline-styles, react-native/no-color-literals
            {
              backgroundColor: "grey",
              borderRadius: 16,
              padding: SPACING,
              height: TOP_HEADER_HEIGHT + 38,
            },
          ]}
        >
          <Text style={styles.name}>{item.name}</Text>
          <Image
            style={styles.image}
            source={{ uri: "https://api.efootballdb.com/assets/2022/players/7511_.png" }}
          />
          <View style={styles.bg}>
            <ScrollView>
              <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                <Animated.View
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
                </Animated.View>
                <Animated.View
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
                </Animated.View>
                <Animated.View
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
                </Animated.View>
              </View>
              <View>
                <Text>Content</Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </Screen>
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
  box: {
    backgroundColor: "#61dafb",
    borderRadius: 4,
    marginTop: 32,
  },
  image: {
    height: ITEM_HEIGHT * 0.8,
    position: "absolute",
    resizeMode: "contain",
    right: SPACING + 12,
    top: TOP_HEADER_HEIGHT - ITEM_HEIGHT * 0.8,
    width: ITEM_HEIGHT * 0.8,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    left: SPACING,
    position: "absolute",
    top: TOP_HEADER_HEIGHT - SPACING * 3,
  },
})
