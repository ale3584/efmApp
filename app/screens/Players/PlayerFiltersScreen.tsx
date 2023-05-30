import { Button, View, Text, SafeAreaView, TextInput } from "react-native"
import styles from "../styles/login"
import { AntDesign } from "@expo/vector-icons"
import { TextField, TextFieldAccessoryProps } from "app/components"

export const FiltersScreen = ({ closeModal }) => {
  const PasswordRightAccessory = function PasswordRightAccessory(props: TextFieldAccessoryProps) {
    return <AntDesign name="search1" size={30} color="black" style={styles.search_icon} />
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: "#FFFFFF", paddingTop: 10 }}>
        <TextField
          LeftAccessory={PasswordRightAccessory}
          //containerStyle={styles.search_input}
          inputWrapperStyle={styles.search_input}
        />
        <Text>Filters</Text>
        <TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1 }} placeholder="Name" />
        <TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1 }} placeholder="Age" />
        <Button title="Apply" onPress={closeModal} />
        <View style={{ height: 10 }} />
        <Button title="Close" onPress={closeModal} />
      </View>
    </SafeAreaView>
  )
}
