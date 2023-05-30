import { createDrawerNavigator } from "@react-navigation/drawer"
import { PlayerScreen } from "./PlayerScreen"
import { FiltersScreen } from "./PlayerFiltersScreen"

const Drawer = createDrawerNavigator()

export function PlayerScreenWithDrawer() {
  return (
    <Drawer.Navigator initialRouteName="PlayerScreen">
      <Drawer.Screen name="PlayerScreen" component={PlayerScreen} />
      <Drawer.Screen
        name="Filters"
        component={FiltersScreen}
        options={{
          drawerType: "slide",
          drawerHideStatusBarOnOpen: true,
        }}
      />
    </Drawer.Navigator>
  )
}
