import { View, SafeAreaView, TextInput } from "react-native"
import styles from "../styles/login"
import { AntDesign } from "@expo/vector-icons"
import { Button, Text, TextFieldAccessoryProps } from "app/components"
import { Icon } from "react-native-vector-icons/Icon"
import { useState } from "react"

export const FiltersScreen = ({ closeModal }) => {
  const [search, setSearch] = useState(null)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: "#FFFFFF", paddingTop: 10 }}>
        <View style={styles.search}>
          <View style={styles.icon}>
            <AntDesign name="search1" size={20} color="#FFFFFF" />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            onChangeText={(val) => setSearch(val)}
          />
        </View>
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
    </SafeAreaView>
  )
}
