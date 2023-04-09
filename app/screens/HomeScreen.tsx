import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "../navigators"
import { Button, Screen, Text } from "../components"
import { useStores } from "../models"

interface HomeScreenProps extends AppStackScreenProps<"Login"> {}

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  const {
    authStore: { logout },
  } = useStores()

  return (
    <Screen style={$root} preset="scroll">
      <Text text="home" />
      <Button onPress={logout}>
        <Text>Logout</Text>
      </Button>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
