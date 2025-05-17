import { Animated, type StyleProp, type ViewStyle } from "react-native";
import { type StateContext, set$ } from "./state";
import { useValue$ } from "./useValue$";

interface ListHeaderComponentContainerProps {
    children: React.ReactNode;
    style: StyleProp<ViewStyle>;
    ctx: StateContext;
    horizontal: boolean;
}

export function ListHeaderComponentContainer({ children, style, ctx, horizontal }: ListHeaderComponentContainerProps) {
    const scrollAdjust = useValue$("scrollAdjust", (v) => v, true);
    const additionalSize: ViewStyle = {
        transform: [{ translateY: Animated.multiply(scrollAdjust, -1) }],
    };

    return (
        <Animated.View
            style={[style, additionalSize]}
            onLayout={(event) => {
                const size = event.nativeEvent.layout[horizontal ? "width" : "height"];
                set$(ctx, "headerSize", size);
            }}
        >
            {children}
        </Animated.View>
    );
}
