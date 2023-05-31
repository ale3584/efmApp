/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  ActivityIndicator,
  Button,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import Modal from "react-native-modal"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "app/navigators"
import { Text } from "app/components"
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg"
import { useStores } from "app/models"
import { AntDesign } from "@expo/vector-icons"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { FiltersScreen } from "./PlayerFiltersScreen"

const { height } = Dimensions.get("window")
const ITEM_HEIGHT = height * 0.18
const SPACING = 10
const FROM_COLOR = "#F8EB7D"
const TO_COLOR = "#3287D6"

// @ts-ignore
export const PlayerScreen: FC<StackScreenProps<AppStackScreenProps, "Player">> = observer(
  function PlayerScreen(_props) {
    const { navigation } = _props
    const [modalVisible, setModalVisible] = useState(false)
    const [page, setPage] = useState(0)
    const {
      playerStore,
      playerStore: { IsEndReached, IsLoading },
    } = useStores()

    const onfetchPlayers = async () => {
      if (IsLoading) {
        return
      }

      await playerStore.fetchPlayers()
      await playerStore.setIsEndReached(false)
      await setPage(page + 1)
    }

    useEffect(() => {
      onfetchPlayers()
    }, [])

    const Drawer = createDrawerNavigator()

    useEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity style={{ marginRight: 15 }} onPress={() => setModalVisible(true)}>
            <AntDesign name="filter" size={24} color="black" />
          </TouchableOpacity>
        ),
      })
    }, [navigation])

    const PlayerImage = ({ item }) => {
      const [hasError, setHasError] = useState(false)

      const handleError = () => {
        setHasError(true)
      }

      const imageUrl = hasError
        ? "https://www.efootballdb.com/img/players/player_noface.png"
        : `https://api.efootballdb.com/assets/2022/players/${item.id}_.png`

      return <Image style={styles.image} source={{ uri: imageUrl }} onError={handleError} />
    }

    const handleEndReached = async () => {
      if (!IsEndReached) {
        await playerStore.setIsEndReached(true)
        await playerStore.appendPlayers(page)
        await playerStore.setIsEndReached(false)
        await setPage(page + 1)
      }
    }

    // const renderFooter = () => <View>{playerStore.moreLoading && <ActivityIndicator />}</View>

    const renderEmpty = () => (
      <View>
        <Text>No Data at the moment</Text>
        <Button onPress={() => onfetchPlayers()} title="Refresh" />
      </View>
    )

    const renderFooter = (IsLoading) =>
      IsLoading ? (
        <View>
          <ActivityIndicator size={"large"} />
        </View>
      ) : null

    const renderItem = ({ item }) => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("PlayerDetails", { item })
        }}
        style={styles.itemContainer}
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
          <View style={[StyleSheet.absoluteFillObject, styles.absoluteFill]}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.overall}</Text>
            <PlayerImage item={item} />
          </View>
        </View>
      </TouchableOpacity>
    )

    return (
      <View style={$root}>
        <View style={{ flex: 1 }}>
          <FlatList
            onEndReached={!IsEndReached && handleEndReached}
            data={playerStore.players.slice()}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ padding: SPACING }}
            renderItem={renderItem}
            ListEmptyComponent={renderEmpty}
            ListFooterComponent={renderFooter(IsLoading)}
            onEndReachedThreshold={0}
          />
          <Modal
            animationIn="slideInRight"
            animationOut="slideOutRight"
            isVisible={modalVisible}
            style={{ margin: 0 }}
          >
            <FiltersScreen closeModal={() => setModalVisible(false)} />
          </Modal>
          {/* <View style={styles.bg} /> */}
        </View>
      </View>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}

const styles = StyleSheet.create({
  absoluteFill: {
    borderRadius: 16,
    padding: SPACING,
  },
  image: {
    bottom: 0,
    height: ITEM_HEIGHT * 0.8,
    position: "absolute",
    resizeMode: "contain",
    right: SPACING,
    width: ITEM_HEIGHT * 0.8,
  },
  itemContainer: {
    height: ITEM_HEIGHT,
    marginBottom: SPACING,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
  },
})
