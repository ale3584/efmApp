import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { Dimensions, TextInput, TextStyle, ViewStyle, StyleSheet, View } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import Svg, { Image } from "react-native-svg"
import styles from "./styles/login"
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated"

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

  const imagePosition = useSharedValue(1)

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: 1,
    }
  })

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
    // <NativeBaseProvider>
    <Screen preset="auto">
      <View style={styles.container}>
        <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
          <Svg width={width} height={height}>
            <Image
              href={require("../../assets/images/splash-logo-all.png")}
              width={width}
              height={height}
              preserveAspectRatio="xMidYMid slice"
            />
          </Svg>
          <View style={styles.closeButtonContainer}>
            <Text>X</Text>
          </View>
        </Animated.View>
        <View style={styles.bottomConteiner}>
          <Button testID="login-button" style={styles.button} preset="reversed" onPress={login}>
            <Text tx="loginScreen.tapToSignIn" style={styles.buttonText} />
          </Button>
          <Button
            testID="register-button"
            style={styles.button}
            preset="reversed"
            onPress={register}
          >
            <Text tx="loginScreen.tapToSignUp" style={styles.buttonText} />
          </Button>
        </View>
        {/* <View style={styles.formInputConteiner}>
            <TextField
              containerStyle={$screenContentContainer}
              value={authEmail}
              onChangeText={setAuthEmail}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              keyboardType="email-address"
              labelTx="loginScreen.emailFieldLabel"
              placeholderTx="loginScreen.emailFieldPlaceholder"
              helper={error}
              status={error ? "error" : undefined}
              onSubmitEditing={() => authPasswordInput.current?.focus()}
            />
            <TextField
              containerStyle={$screenContentContainer}
              ref={authPasswordInput}
              value={authPassword}
              onChangeText={setAuthPassword}
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect={false}
              secureTextEntry={isAuthPasswordHidden}
              labelTx="loginScreen.passwordFieldLabel"
              placeholderTx="loginScreen.passwordFieldPlaceholder"
              onSubmitEditing={login}
              RightAccessory={PasswordRightAccessory}
            />
            <TextField
              containerStyle={$screenContentContainer}
              ref={authPasswordInput}
              value={authPassword}
              onChangeText={setAuthPassword}
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect={false}
              secureTextEntry={isAuthPasswordHidden}
              labelTx="loginScreen.passwordFieldLabel"
              placeholderTx="loginScreen.passwordFieldPlaceholder"
              onSubmitEditing={login}
              RightAccessory={PasswordRightAccessory}
            />
            <View style={styles.fotmButton}>
              <Text style={$testInput}>LOG IN</Text>
            </View>
          </View> */}
      </View>
    </Screen>
    // </NativeBaseProvider>
  )
})

const $screenContentContainer: ViewStyle = {
  // paddingVertical: spacing.small,
  // paddingHorizontal: spacing.large,
  marginHorizontal: spacing.small,
  marginVertical: spacing.large,
  height: 50,
  borderRadius: 25,
  paddingLeft: 10,
}

const $boxStyle: ViewStyle = {
  backgroundColor: "#FFC93C",
}

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
