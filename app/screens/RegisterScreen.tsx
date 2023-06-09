import React, { FC, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, TextInput, ViewStyle, View, SafeAreaView } from "react-native"
import { AppStackScreenProps } from "../navigators"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { colors, spacing } from "../theme"
import {
  AlertDialog,
  Center,
  Button as ButtonBase,
  Alert,
  VStack,
  HStack,
  IconButton,
  CloseIcon,
  useToast,
  Text as TextBase,
  KeyboardAvoidingView,
} from "native-base"
import Svg, { Image } from "react-native-svg"
import styles from "./styles/login"

interface RegisterScreenProps extends AppStackScreenProps<"Register"> {}

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const RegisterScreen: FC<RegisterScreenProps> = observer(function RegisterScreen(_props) {
  const { navigation } = _props
  const { height, width } = Dimensions.get("window")
  const [authPassword, setAuthPassword] = useState("")
  const authPasswordInput = useRef<TextInput>()
  const { authStore } = useStores()
  const [isSubmitted] = useState(false)
  const toast = useToast()
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const {
    authStore: { authUser, setAuthUser, authEmail, setAuthEmail, validationError },
  } = useStores()

  const [isOpen, setIsOpen] = React.useState(false)

  const onClose = () => {
    setIsOpen(false)
    navigation.navigate("Login")
  }

  const cancelRef = React.useRef(null)

  const error = isSubmitted ? validationError : ""

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

  const ToastAlert = ({ status, variant, title, description }) => (
    <Alert maxWidth="100%" alignSelf="center" flexDirection="row" status={status} variant={variant}>
      <VStack space={1} flexShrink={1} w="100%">
        <HStack flexShrink={1} alignItems="center" justifyContent="space-between">
          <HStack space={2} flexShrink={1} alignItems="center">
            <Alert.Icon />
            <TextBase
              fontSize="md"
              fontWeight="medium"
              flexShrink={1}
              color={variant === "solid" ? "lightText" : variant !== "outline" ? "darkText" : null}
            >
              {title}
            </TextBase>
          </HStack>
        </HStack>
        <TextBase
          px={"6"}
          color={variant === "solid" ? "lightText" : variant !== "outline" ? "darkText" : null}
        >
          {description}
        </TextBase>
      </VStack>
    </Alert>
  )

  const onRegister = async (userName: string, emailAddress: string, password: string) =>
    await authStore.signup(userName, emailAddress, password).then(() => {
      if (authStore.status === "done") {
        setIsOpen(!isOpen)
      } else if (authStore.status === "error") {
        authStore.error.forEach((element) => {
          const item = {
            status: "error",
            variant: "solid",
            title: "Registaration Error",
            description: element,
            isClosable: true,
          }
          toast.show({
            placement: "top",
            render: () => <ToastAlert {...item} />,
          })
        })
      }
    })

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
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
              autoComplete="username"
              autoCorrect={false}
              keyboardType="name-phone-pad"
              labelTx="registerScreen.userFieldLabel"
              placeholderTx="registerScreen.userFieldPlaceholder"
              helper={error}
              status={error ? "error" : undefined}
              onSubmitEditing={() => authPasswordInput.current?.focus()}
            />
            <TextField
              containerStyle={$screenContentContainer}
              value={authEmail}
              onChangeText={setAuthEmail}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              keyboardType="email-address"
              labelTx="registerScreen.emailFieldLabel"
              placeholderTx="registerScreen.emailFieldPlaceholder"
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
              labelTx="registerScreen.passwordFieldLabel"
              placeholderTx="registerScreen.passwordFieldPlaceholder"
              onSubmitEditing={() => onRegister(authUser, authEmail, authPassword)}
              RightAccessory={PasswordRightAccessory}
            />
          </View>
        </KeyboardAvoidingView>
        <View style={styles.bottomContainer}>
          <Button
            testID="register-button"
            style={styles.button}
            preset="reversed"
            onPress={() => onRegister(authUser, authEmail, authPassword)}
          >
            <Text
              tx="registerScreen.tapToSignUp"
              text={authStore.status === "pending" ? "Loading ..." : "Submit"}
              style={styles.buttonText}
            />
          </Button>
        </View>
      </View>
      <Center>
        <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>
              <Text tx="registerScreen.dearCustomer" />
            </AlertDialog.Header>
            <AlertDialog.Body>
              <Text tx="registerScreen.verificationSent" />
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <ButtonBase.Group space={2}>
                <ButtonBase colorScheme="blue" onPress={onClose}>
                  Ok
                </ButtonBase>
              </ButtonBase.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Center>
    </Screen>
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
  borderColor: colors.errorBackground,
}
