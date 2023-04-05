import { colors, spacing } from "../../theme"
import { StyleSheet, Dimensions } from "react-native"

const { height, width } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: spacing.extraSmall,
    backgroundColor: "#376AED",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    borderColor: "#FFFFFF",
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  buttonText: {
    color: "#FFFFFF",
  },
  bottomConteiner: {
    justifyContent: "center",
    height: height / 2,
  },
  fotmButton: {
    marginTop: spacing.large,
    backgroundColor: "#376AED",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    borderColor: "#FFFFFF",
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 5,
  },
  formInputConteiner: {
    marginBottom: 70,
  },
  closeButtonContainer: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 1,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 20,
  },
})

export default styles
