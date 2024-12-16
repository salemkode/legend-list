import React from "react";
import type { LayoutChangeEvent, ViewStyle } from "react-native";
import { $View } from "./$View";
import { peek$, set$, use$, useStateContext } from "./state";

interface InnerContainerProps {
    containerId: number;
    getRenderedItem: (key: string, containerId: number) => React.ReactNode;
    recycleItems: boolean;
    ItemSeparatorComponent?: React.ReactNode;
}
function InnerContainer({ containerId, getRenderedItem, recycleItems, ItemSeparatorComponent }: InnerContainerProps) {
    // Subscribe to the lastItemKey so this re-renders when the lastItemKey changes.
    const lastItemKey = use$<string>("lastItemKey");
    const itemKey = use$<string>(`containerItemKey${containerId}`);

    if (itemKey === undefined) {
        return null;
    }

    const renderedItem = getRenderedItem(itemKey, containerId);

    return (
        <React.Fragment key={recycleItems ? undefined : itemKey}>
            {renderedItem}
            {ItemSeparatorComponent && itemKey !== lastItemKey && ItemSeparatorComponent}
        </React.Fragment>
    );
}

export const Container = ({
    id,
    recycleItems,
    horizontal,
    getRenderedItem,
    onLayout,
    ItemSeparatorComponent,
}: {
    id: number;
    recycleItems?: boolean;
    horizontal: boolean;
    getRenderedItem: (key: string, containerId: number) => React.ReactNode;
    onLayout: (key: string, size: number) => void;
    ItemSeparatorComponent?: React.ReactNode;
}) => {
    const ctx = useStateContext();

    const createStyle = (): ViewStyle => {
        const position = peek$<number>(ctx, `containerPosition${id}`);
        const visible = peek$<boolean>(ctx, `containerDidLayout${id}`);
        return horizontal
            ? {
                  flexDirection: "row",
                  position: "absolute",
                  top: visible ? 0 : -10000000,
                  bottom: 0,
                  left: position,
              }
            : {
                  position: "absolute",
                  left: visible ? 0 : -10000000,
                  right: 0,
                  top: position,
              };
    };

    // Use a reactive View to ensure the container element itself
    // is not rendered when style changes, only the style prop.
    // This is a big perf boost to do less work rendering.
    return (
        <$View
            $key={`containerPosition${id}`}
            $key2={`containerDidLayout${id}`}
            $style={createStyle}
            onLayout={(event: LayoutChangeEvent) => {
                const key = peek$<string>(ctx, `containerItemKey${id}`);
                if (key !== undefined) {
                    const size = event.nativeEvent.layout[horizontal ? "width" : "height"];

                    // console.log("layout", key, size);
                    onLayout(key, size);

                    const measured = peek$(ctx, `containerDidLayout${id}`);
                    if (!measured) {
                        requestAnimationFrame(() => {
                            set$(ctx, `containerDidLayout${id}`, true);
                        });
                    }
                }
            }}
        >
            <InnerContainer
                containerId={id}
                getRenderedItem={getRenderedItem}
                recycleItems={recycleItems!}
                ItemSeparatorComponent={ItemSeparatorComponent}
            />
        </$View>
    );
};
