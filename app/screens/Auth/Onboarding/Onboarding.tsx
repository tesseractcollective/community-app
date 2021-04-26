import React, { useRef } from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import { mixColor } from "react-native-redash"
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated"

import { AppRoute } from "@ivy/routes"
import type { AuthNavigationProps } from "@ivy/navTypes"
import { Theme, makeStyles } from "../../../components"

import Slide, { SLIDE_HEIGHT } from "./Slide"
import Subslide from "./Subslide"
import Dot from "./Dot"
// import { useStores } from "../../../stores";
const { width } = Dimensions.get("window")

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  underlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "flex-end",
    borderBottomRightRadius: theme.borderRadii.xl,
    overflow: "hidden",
  },
  slider: {
    height: SLIDE_HEIGHT,
    borderBottomRightRadius: theme.borderRadii.xl,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.borderRadii.xl,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    height: theme.borderRadii.xl,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 6,
  },
}))

interface Slide {
  title: string
  subtitle: string
  description: string
  color: string
  picture: {
    width: number
    height: number
    src: number
  }
}

export const slides: Slide[] = [
  {
    title: "SOCIAL",
    subtitle: "Social Platform For Homes",
    description: "We bring influencers, builders, designers and home enthusiasts together.",
    color: "#BFEAF5",
    picture: {
      src: require("../assets/onboarding2.png"),
      width: 2513,
      height: 3583,
    },
  },
  {
    title: "DISCOVER",
    subtitle: "Like Pinterest",
    description: "Inspiration can be gained just by scrolling, cataloging, and posting.",
    color: "#BEECC4",
    picture: {
      src: require("../assets/onboarding1.png"),
      width: 2791,
      height: 3744,
    },
  },
  {
    title: "CONNECT",
    subtitle: "Supported by community",
    description: "make new connections with friends or home professionals",
    color: "#FFE4D9",
    picture: {
      src: require("../assets/onboarding3.png"),
      width: 2738,
      height: 3244,
    },
  },
  {
    title: "FUN",
    subtitle: "Uniquely Enjoyable ",
    description: "Discover the latest trends in real estate and explore your personality",
    color: "#FFDDDD",
    picture: {
      src: require("../assets/onboarding4.png"),
      width: 1757,
      height: 2551,
    },
  },
]
export const assets = slides.map(slide => slide.picture.src)

const Onboarding = ({ navigation }: AuthNavigationProps<AppRoute.CONSUMER_ONBOARDING>) => {
  const styles = useStyles()
  const scroll = useRef<Animated.ScrollView>(null)
  const x = useSharedValue(0)
  const combinedScreenX = useSharedValue(0)
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      combinedScreenX.value = contentOffset.x / (width * 3)
      x.value = contentOffset.x
    },
  })
  const backgroundColor = useDerivedValue(() =>
    mixColor(combinedScreenX.value, "#FFDDDD", "#BFEAF5"),
  )
  const slider = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
  }))
  // const backgroundColor = useDerivedValue(() =>
  //   interpolateColor(
  //     x.value,
  //     slides.map((_, i) => i * width),
  //     slides.map(slide => slide.color),
  //   ),
  // )
  const background = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
  }))
  const currentIndex = useDerivedValue(() => x.value / width)
  const footerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -x.value }],
  }))
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, slider]}>
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={onScroll}
          scrollEventThrottle={16}>
          {slides.map(({ title, picture }, index) => (
            <Slide key={`${index}mainSlide`} right={!!(index % 2)} {...{ title, picture }} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View style={[StyleSheet.absoluteFill, background]} />
        <View style={styles.footerContent}>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <Dot key={`${index}bottomDot`} currentIndex={currentIndex} {...{ index }} />
            ))}
          </View>
          <Animated.View
            style={[
              {
                flex: 1,
                flexDirection: "row",
                width: width * slides.length,
              },
              footerStyle,
            ]}>
            {slides.map(({ subtitle, description }, index) => {
              const last = index === slides.length - 1
              return (
                <Subslide
                  key={`${index}bottomSubSlide`}
                  onPress={() => {
                    if (last) {
                      navigation.navigate(AppRoute.PHONE_INPUT)
                    } else {
                      scroll.current?.getNode().scrollTo({
                        x: width * (index + 1),
                        animated: true,
                      })
                    }
                  }}
                  {...{ subtitle, description, last }}
                />
              )
            })}
          </Animated.View>
        </View>
      </View>
    </View>
  )
}

export default Onboarding
