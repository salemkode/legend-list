import * as React from 'react';
import { LayoutChangeEvent, View, ViewStyle } from 'react-native';
import { $View } from './$View';
import { peek$, use$, useStateContext } from './state';

export interface ContainerInfo {
    id: number;
    itemIndex: number;
    position: number;
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
    getRenderedItem: (index: number) => React.ReactNode;
    onLayout: (index: number, length: number) => void;
    ItemSeparatorComponent?: React.ReactNode;
}) => {
    const ctx = useStateContext();
    const numItems = ItemSeparatorComponent && use$('numItems');
    // Subscribe to the itemIndex so this re-renders when the itemIndex changes.
    const itemIndex = use$(`containerIndex${id}`);
    // Set a key on the child view if not recycling items so that it creates a new view
    // for the rendered item
    const key = recycleItems ? undefined : itemIndex;

    const createStyle = (): ViewStyle => {
        const position = peek$(`containerPosition${id}`, ctx);
        return horizontal
            ? {
                  flexDirection: 'row',
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: position,
                  opacity: position < 0 ? 0 : 1,
              }
            : {
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: position,
                  opacity: position < 0 ? 0 : 1,
              };
    };

    // Use a reactive View to ensure the container element itself
    // is not rendered when style changes, only the style prop.
    // This is a big perf boost to do less work rendering.
    return itemIndex < 0 ? null : (
        <$View
            key={id}
            $key={`containerPosition${id}`}
            $style={createStyle}
            onLayout={(event: LayoutChangeEvent) => {
                const index = peek$(`containerIndex${id}`, ctx);
                const length = Math.round(event.nativeEvent.layout[horizontal ? 'width' : 'height']);

                onLayout(index, length);
            }}
        >
            <View key={key}>{getRenderedItem(itemIndex)}</View>
            {ItemSeparatorComponent && itemIndex < numItems - 1 && ItemSeparatorComponent}
        </$View>
    );
};
