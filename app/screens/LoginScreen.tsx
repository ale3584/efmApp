import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { Dimensions, TextInput, TextStyle, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import {
  NativeBaseProvider,
  Link,
  Center,
  Input,
  Box,
  FormControl,
  WarningOutlineIcon,
  Flex,
} from "native-base"
import { color } from "react-native-reanimated"
import { flexbox } from "native-base/lib/typescript/theme/styled-system"
import { FlatList } from "react-native-gesture-handler"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const { navigation } = _props
  const authPasswordInput = useRef<TextInput>()
  const { height, width } = Dimensions.get("window")

  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: { authEmail, setAuthEmail, setAuthToken, validationError },
  } = useStores()

  useEffect(() => {
    // Here is where you could fetch credentials from keychain or storage
    // and pre-fill the form fields.
    setAuthEmail("ignite@infinite.red")
    setAuthPassword("ign1teIsAwes0m3")
  }, [])

  const error = isSubmitted ? validationError : ""

  function login() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (validationError) return

    // Make a request to your server to get an authentication token.
    // If successful, reset the fields and set the token.
    setIsSubmitted(false)
    setAuthPassword("")
    setAuthEmail("")

    // We'll mock this with a fake token.
    setAuthToken(String(Date.now()))
  }
  function register() {
    navigation.navigate("Register")
  }

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  useEffect(() => {
    return () => {
      setAuthPassword("")
      setAuthEmail("")
    }
  }, [])

  return (
    <NativeBaseProvider>
      <Screen
        preset="auto"
        contentContainerStyle={$screenContentContainer}
        safeAreaEdges={["top", "bottom"]}
      >
        {/* <Text testID="login-heading" tx="loginScreen.signIn" preset="heading" style={$signIn} /> */}
        {/* <Text tx="loginScreen.enterDetails" preset="subheading" style={$enterDetails} /> */}
        {attemptsCount > 2 && <Text tx="loginScreen.hint" size="sm" weight="light" style={$hint} />}
        <Box style={$boxStyle} height={height / 2} borderWidth={10}>
          <TextField
            value={authEmail}
            onChangeText={setAuthEmail}
            containerStyle={$textField}
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            keyboardType="email-address"
            labelTx="loginScreen.emailFieldLabel"
            placeholderTx="loginScreen.emailFieldPlaceholder"
            helper={error}
            inputWrapperStyle={$testInput}
            status={error ? "error" : undefined}
            onSubmitEditing={() => authPasswordInput.current?.focus()}
          />
          <TextField
            ref={authPasswordInput}
            value={authPassword}
            onChangeText={setAuthPassword}
            containerStyle={$textField}
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect={false}
            secureTextEntry={isAuthPasswordHidden}
            labelTx="loginScreen.passwordFieldLabel"
            placeholderTx="loginScreen.passwordFieldPlaceholder"
            onSubmitEditing={login}
            RightAccessory={PasswordRightAccessory}
            style={$inputStyle}
            inputWrapperStyle={$testInput}
          />
          <Button
            testID="login-button"
            tx="loginScreen.tapToSignIn"
            style={$tapButton}
            preset="reversed"
            onPress={login}
          />
          <Center>
            <Link onPress={register}>Register</Link>
          </Center>
        </Box>
      </Screen>
    </NativeBaseProvider>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.huge,
  paddingHorizontal: spacing.large,
}

const $boxStyle: ViewStyle = {}

const $testInput: ViewStyle = {
  borderLeftWidth: 0,
  borderRightWidth: 0,
  borderTopWidth: 0,
}

const $signIn: TextStyle = {
  marginBottom: spacing.small,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.large,
  borderBottomColor: "#",
}
const $inputStyle: ViewStyle = {
  borderColor: "#FF0000",
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.medium,
}

const $textField: ViewStyle = {
  marginBottom: spacing.large,
  borderColor: "red",
}

const $tapButton: ViewStyle = {
  marginTop: spacing.extraSmall,
  borderRadius: 10,
  backgroundColor: "#376AED",
  shadowColor: "#000000",
  shadowOpacity: 0.1,
  shadowRadius: 1,
  shadowOffset: { width: -2, height: 4 },
}
const $test: ViewStyle = {
  backgroundColor: "#3d4db7",
}

// @demo remove-file
