import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { Dimensions, TextInput, ViewStyle, View } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import Svg, { Image } from "react-native-svg"
import styles from "./styles/login"
import {
  Alert,
  Box,
  CloseIcon,
  HStack,
  IconButton,
  NativeBaseProvider,
  VStack,
  Text as TextBase,
  Collapse,
  KeyboardAvoidingView,
} from "native-base"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const [iserror, setIserror] = useState(false)
  const { navigation } = _props
  const authPasswordInput = useRef<TextInput>()
  const { height, width } = Dimensions.get("window")
  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted] = useState(false)
  const { authStore } = useStores()
  const {
    authStore: { authUser, setAuthUser, validationError },
  } = useStores()

  const error = isSubmitted ? validationError : ""

  const onLogin = async (userName, password) => {
    await authStore.login(userName, password)
    if (authStore.isError) {
      await setIserror(true)
      await alertMessage(authStore.error)
    }
  }

  const alertMessage = (message) => {
    return (
      <Box w="100%" alignItems="center">
        <Collapse isOpen={iserror}>
          <Alert maxW="400" status="error">
            <VStack space={1} flexShrink={1} w="100%">
              <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                <HStack flexShrink={1} space={2} alignItems="center">
                  <Alert.Icon />
                  <TextBase
                    fontSize="md"
                    fontWeight="medium"
                    _dark={{
                      color: "coolGray.800",
                    }}
                  >
                    Please try again later!
                  </TextBase>
                </HStack>
                <IconButton
                  variant="unstyled"
                  _focus={{
                    borderWidth: 0,
                  }}
                  icon={<CloseIcon size="3" />}
                  _icon={{
                    color: "coolGray.600",
                  }}
                  onPress={() => setIserror(false)}
                />
              </HStack>
              <Box
                pl="6"
                _dark={{
                  _text: {
                    color: "coolGray.600",
                  },
                }}
              >
                {message}
              </Box>
            </VStack>
          </Alert>
        </Collapse>
      </Box>
    )
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
      setAuthUser("")
    }
  }, [])

  return (
    <NativeBaseProvider>
      <Screen safeAreaEdges={["top", "bottom"]} preset="auto" style={styles.screen}>
        <View style={styles.container}>
          <View>
            <Svg width={width} height={height / 2}>
              <Image
                href={require("../../assets/images/splash-logo-all.png")}
                width={width}
                height={height * 0.75}
                preserveAspectRatio="xMidYMid slice"
              />
            </Svg>
          </View>
          <KeyboardAvoidingView>
            <View style={styles.formInputContainer}>
              <TextField
                containerStyle={$screenContentContainer}
                value={authUser}
                onChangeText={setAuthUser}
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                keyboardType="email-address"
                labelTx="loginScreen.userFieldLabel"
                placeholderTx="loginScreen.userFieldLabel"
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
                onSubmitEditing={() => onLogin(authUser, authPassword)}
                RightAccessory={PasswordRightAccessory}
              />
            </View>
          </KeyboardAvoidingView>
          <View style={styles.bottomContainer}>
            <Button
              testID="login-button"
              style={styles.button}
              preset="reversed"
              onPress={() => onLogin(authUser, authPassword)}
            >
              <Text
                tx="loginScreen.tapToSignIn"
                text={authStore.status === "pending" ? "Loading ..." : "Submit"}
                style={styles.buttonText}
              />
            </Button>
            <Text
              tx="loginScreen.tapToSignUp"
              style={[styles.buttonTextRegister, styles.buttonRegister]}
              onPress={register}
            />
          </View>
        </View>
      </Screen>
    </NativeBaseProvider>
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
