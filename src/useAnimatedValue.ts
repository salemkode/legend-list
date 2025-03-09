import { useRef } from "react";
import { Animated, useAnimatedValue as _useAnimatedValue } from "react-native";

export const useAnimatedValue =
    _useAnimatedValue ||
    ((initialValue: number): Animated.Value => {
        return useRef(new Animated.Value(initialValue)).current;
    });
