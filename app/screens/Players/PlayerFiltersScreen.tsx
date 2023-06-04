import {
  View,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native"
import { useEffect, useRef, useState } from "react"
import { colors, typography } from "app/theme"
import { AntDesign } from "@expo/vector-icons"

const { height } = Dimensions.get("window")

export const FiltersScreen = ({ modalVisible, closeModal }) => {
  const modalAnimatedValue = useRef(new Animated.Value(0)).current
  const [showFilterModal, setShowFilterModal] = useState(modalVisible)

  useEffect(() => {
    if (showFilterModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start()
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => closeModal())
    }
  }, [showFilterModal])

  const modelY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [height, height * 0.2],
  })

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.transparentBlack,
        }}
      >
        <TouchableWithoutFeedback onPress={() => setShowFilterModal(false)}>
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          ></View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: "absolute",
            top: modelY,
            left: 0,
            width: "100%",
            height: "100%",
            padding: 20,
            backgroundColor: "#FFFFFF",
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                flex: 1,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Filters
            </Text>
            <TouchableOpacity onPress={() => setShowFilterModal(false)}>
              <View style={styles.icon}>
                <AntDesign name="close" size={20} />
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 250,
            }}
          ></ScrollView>
        </Animated.View>
      </View>
    </Modal>

    /*<SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: "#FFFFFF", paddingTop: 10 }}>
        <Text>Filters</Text>
        <TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1 }} placeholder="Name" />
        <TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1 }} placeholder="Age" />
        <Button style={styles.button} onPress={closeModal}>
          <Text text="Apply" style={styles.buttonText} />
        </Button>
        <Button style={styles.button} onPress={closeModal}>
          <Text text="Close" style={styles.buttonText} />
        </Button>
      </View>
    </SafeAreaView>*/
  )
}

const styles = StyleSheet.create({
  icon: {
    //backgroundColor: "#999999",
    color: "#999999",
    padding: 5,
    borderTopEndRadius: 5,
    borderBottomEndRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: "#999999",
    borderWidth: 1,
  },
})
