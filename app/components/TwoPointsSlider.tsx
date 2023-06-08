import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle, StyleSheet, Text } from "react-native"
import { observer } from "mobx-react-lite"
import { FONTS, colors, typography } from "app/theme"
import MultiSlider from "@ptomasroos/react-native-multi-slider"

export interface TwoPointsSliderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  values: number[]
  min: number
  max: number
  prefix?: string
  postfix?: string
  onValuesChange: (values: number[]) => void
}

/**
 * Describe your component here
 */
export const TwoPointsSlider = observer(function TwoPointsSlider(props: TwoPointsSliderProps) {
  const { style, values, min, max, prefix, postfix, onValuesChange } = props
  const $styles = [$container, style]

  return (
    <MultiSlider
      onValuesChangeFinish={() => onValuesChange}
      values={values}
      sliderLength={280}
      min={min}
      max={max}
      markerOffsetY={20}
      selectedStyle={{
        backgroundColor: colors.palette.main,
      }}
      trackStyle={{
        height: 10,
        borderRadius: 10,
        backgroundColor: colors.palette.secondary300,
      }}
      minMarkerOverlapDistance={50}
      customMarker={(e) => {
        return (
          <View
            style={{
              height: 60,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: colors.palette.secondary300,
                backgroundColor: colors.palette.main,
                ...styles.shadow,
              }}
            />
            <Text
              style={{
                marginTop: 5,
                color: colors.palette.neutral600,
                ...FONTS.body3,
              }}
            >
              {prefix}
              {e.currentValue}
              {postfix}
            </Text>
          </View>
        )
      }}
      onValuesChangeFinish={(values) => {
        onValuesChange(values)
      }}
    />
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 1,
    shadowOpacity: 0.1,
  },
})
