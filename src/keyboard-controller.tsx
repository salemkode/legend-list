import { type ComponentProps, type ForwardedRef, useState } from "react";
import { useKeyboardHandler } from "react-native-keyboard-controller";
import { runOnJS } from "react-native-reanimated";
import { LegendList } from "./LegendList";
import type { AnimatedLegendList } from "./animated";
import type { AnimatedLegendList as ReanimatedLegendList } from "./reanimated";
import { type LegendListRef, typedForwardRef } from "./types";

export const KeyboardAvoidingLegendList = typedForwardRef(function KeyboardAvoidingLegendList<
    T extends typeof LegendList | typeof AnimatedLegendList | typeof ReanimatedLegendList = typeof LegendList,
>(props: ComponentProps<T> & { LegendList?: T }, forwardedRef: ForwardedRef<LegendListRef>) {
    const { LegendList: LegendListProp, ...rest } = props;
    const [padding, setPadding] = useState(0);

    // Define this function outside the worklet
    const updatePadding = (height: number) => {
        setPadding(height);
    };

    useKeyboardHandler({
        onEnd: (e) => {
            "worklet";

            // Properly pass the function to runOnJS and call the returned function with the height
            runOnJS(updatePadding)(e.height);
        },
    });

    const LegendListComponent = LegendListProp ?? LegendList;

    // @ts-expect-error TODO: Fix this
    return <LegendListComponent style={{ paddingTop: padding }} {...rest} ref={forwardedRef as any} />;
});
