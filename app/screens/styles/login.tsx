import { spacing } from "../../theme"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  button: {
    alignItems: "center",
    backgroundColor: "#376AED",
    borderColor: "#FFFFFF",
    borderRadius: 35,
    height: 55,
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: spacing.extraSmall,
    marginVertical: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },

  // eslint-disable-next-line react-native/no-color-literals
  buttonRegister: {
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",

    backgroundColor: "#FFC93C",
    borderColor: "#FFC93C",
    // borderRadius: 35,
    height: 55,
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: spacing.extraSmall,
    marginVertical: 10,
    textAlign: "center",

    // shadowColor: "#000000",
    // shadowOpacity: 0.1,
    // shadowRadius: 1,
  },

  // eslint-disable-next-line react-native/no-color-literals
  container: {
    backgroundColor: "#FFC93C",
    flex: 1,
    // alignItems: "center",
    justifyContent: "flex-end",
  },

  // eslint-disable-next-line react-native/no-color-literals

  // eslint-disable-next-line react-native/sort-styles, react-native/no-color-literals
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  // eslint-disable-next-line react-native/no-color-literals
  buttonTextRegister: {
    color: "#376AED",
    fontWeight: "bold",
  },

  bottomContainer: {
    // height: height / 3,
    justifyContent: "center",
    //marginBottom: 70,
  },

  formInputContainer: {
    justifyContent: "center",
    marginBottom: 15,
    // zIndex: -1,
  },
  // eslint-disable-next-line react-native/no-color-literals
  screen: {
    backgroundColor: "#FFC93C",
  },
  bg: {},
  search: {
    backgroundColor: "#EBE9E9",
    margin: 10,
    borderRadius: 5,
    flexDirection: "row",
  },
  icon: {
    backgroundColor: "#999999",
    padding: 15,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
  },
  listItem: {
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: "#F3F0F0",
    padding: 10,
    borderRadius: 5,
  },
  listText: {
    fontWeight: "bold",
    fontSize: 18,
  },
})

export default styles
