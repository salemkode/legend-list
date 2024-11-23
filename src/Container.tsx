import { Observable } from '@legendapp/state';
import { use$ } from '@legendapp/state/react';
import * as React from 'react';
import { LayoutChangeEvent, View, ViewStyle } from 'react-native';
import { $View } from './signal/$View';

export interface ContainerInfo {
    id: number;
    itemIndex: number;
    position: number;
}

export const Container = ({
    $container,
    recycleItems,
    numItems$,
    horizontal,
    getRenderedItem,
    onLayout,
    ItemSeparatorComponent,
}: {
    $container: Observable<ContainerInfo>;
    recycleItems?: boolean;
    numItems$: Observable<number>;
    horizontal: boolean;
    getRenderedItem: (index: number) => React.ReactNode;
    onLayout: (index: number, length: number) => void;
    ItemSeparatorComponent?: React.ReactNode;
}) => {
    const { id } = $container.peek();
    const numItems = use$(numItems$);
    // Subscribe to the itemIndex observable so this re-renders when the itemIndex changes.
    const itemIndex = use$($container.itemIndex);
    // Set a key on the child view if not recycling items so that it creates a new view
    // for the rendered item
    const key = recycleItems ? undefined : itemIndex;

    const createStyle = (): ViewStyle =>
        horizontal
            ? {
                  flexDirection: 'row',
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: $container.position.get(),
                  opacity: $container.position.get() < 0 ? 0 : 1,
              }
            : {
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: $container.position.get(),
                  opacity: $container.position.get() < 0 ? 0 : 1,
              };

    // Use a reactive View to ensure the container element itself
    // is not rendered when style changes, only the style prop.
    // This is a big perf boost to do less work rendering.
    return itemIndex < 0 ? null : (
        <$View
            key={id}
            $style={createStyle}
            onLayout={(event: LayoutChangeEvent) => {
                const index = $container.itemIndex.peek();
                const length = Math.round(event.nativeEvent.layout[horizontal ? 'width' : 'height']);

                onLayout(index, length);
            }}
        >
            <View key={key}>{getRenderedItem(itemIndex)}</View>
            {ItemSeparatorComponent && itemIndex < numItems - 1 && ItemSeparatorComponent}
        </$View>
    );
};
