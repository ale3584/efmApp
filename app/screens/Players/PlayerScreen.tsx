/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  ActivityIndicator,
  Button,
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
    const [isEndReached, setIsEndReached] = useState(true)
    const [refreshing, setRefreshing] = React.useState(false)
    const {
      playerStore,
      playerStore: { isLoading, error, currentPage, setCurrentPage },
    } = useStores()

    const {
      authStore: { logout, isTokenValid },
    } = useStores()

    const onfetchPlayers = async () => {
      if (isLoading) {
        return
      }

      if (isTokenValid) {
        playerStore.appendPlayers(currentPage)
        setIsEndReached(false)
        setCurrentPage(currentPage + 1)
      } else {
        logout()
      }
    }

    useEffect(() => {
      onfetchPlayers()
    }, [])

    const handleEndReached = () => {
      if (!isEndReached) {
        setIsEndReached(true)
        setRefreshing(true)
        onfetchPlayers()
        setRefreshing(false)
      }
    }

    // const renderFooter = () => <View>{playerStore.moreLoading && <ActivityIndicator />}</View>

    const renderEmpty = () => (
      <View>
        <Text>No Data at the moment</Text>
        <Button onPress={() => onfetchPlayers()} title="Refresh" />
      </View>
    )

    const renderItem = ({ item }) => (
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
    )

    return (
      <Screen style={$root} preset="scroll">
        {isLoading ? (
          <ActivityIndicator size={"large"} />
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          // eslint-disable-next-line react-native/no-inline-styles
          <View style={{ flex: 1 }}>
            <FlashList
              onEndReached={() => handleEndReached()}
              data={playerStore.players}
              keyExtractor={(item) => `${item.id}`}
              contentContainerStyle={{ padding: SPACING }}
              renderItem={renderItem}
              ListEmptyComponent={renderEmpty}
              // ListFooterComponent={renderFooter}
              estimatedItemSize={100}
              // onEndReachedThreshold={0.2}
              refreshing={refreshing}
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
