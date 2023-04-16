import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Button, Dimensions, View, SafeAreaView } from "react-native"
import { AppStackScreenProps } from "../navigators"
import { useStores } from "../models"
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer"
import { PlayerScreen } from "./Players/PlayerScreen"
import { Button as BaseButton } from "native-base"

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const { width, height } = Dimensions.get("window")
export const ITEM_HEIGHT = height * 0.18
export const SPACING = 10
export const FROM_COLOR = "#F8EB7D"
export const TO_COLOR = "#3287D6"

// @ts-ignore
export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen(_props) {
  const Drawer = createDrawerNavigator()

  const {
    authStore: { logout },
  } = useStores()

  function HomeScreen({ navigation }) {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button onPress={() => navigation.goBack()} title="Go back home" />
      </View>
    )
  }

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <BaseButton onPress={() => logout}>Logout</BaseButton>
            </SafeAreaView>
          </DrawerContentScrollView>
        )
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="DB" component={PlayerScreen} />
    </Drawer.Navigator>
  )
})
