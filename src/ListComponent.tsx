import { ReactNode } from 'react';

import { Observable } from '@legendapp/state';
import { Reactive } from '@legendapp/state/react';
import * as React from 'react';
import {
    LayoutChangeEvent,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleProp,
    ViewStyle,
} from 'react-native';
import type { ContainerInfo } from './Container';
import { Containers } from './Containers';
import type { VisibleRange } from './LegendList';
import type { LegendListProps } from './types';

interface ListComponentProps
    extends Omit<
        LegendListProps<any>,
        'data' | 'estimatedItemLength' | 'drawDistance' | 'maintainScrollAtEnd' | 'maintainScrollAtEndThreshold'
    > {
    style: StyleProp<ViewStyle>;
    contentContainerStyle: StyleProp<ViewStyle>;
    horizontal: boolean;
    initialContentOffset: number | undefined;
    paddingTop$: Observable<number>;
    containers$: Observable<ContainerInfo[]>;
    numItems$: Observable<number>;
    visibleRange$: Observable<VisibleRange>;
    refScroller: React.MutableRefObject<ScrollView>;
    getRenderedItem: (index: number) => ReactNode;
    updateItemLength: (index: number, length: number) => void;
    handleScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onLayout: (event: LayoutChangeEvent) => void;
}

export const ListComponent = React.memo(function ListComponent({
    style,
    contentContainerStyle,
    horizontal,
    initialContentOffset,
    recycleItems,
    ItemSeparatorComponent,
    alignItemsAtEnd,
    handleScroll,
    onLayout,
    ListHeaderComponent,
    ListHeaderComponentStyle,
    ListFooterComponent,
    ListFooterComponentStyle,
    paddingTop$,
    containers$,
    numItems$,
    visibleRange$,
    getRenderedItem,
    updateItemLength,
    refScroller,
    ...rest
}: ListComponentProps) {
    console.log('render ListComponent');

    return (
        <Reactive.ScrollView
            style={style}
            contentContainerStyle={[
                contentContainerStyle,
                horizontal
                    ? {
                          height: '100%',
                      }
                    : {},
            ]}
            onScroll={handleScroll}
            onLayout={onLayout}
            scrollEventThrottle={32}
            horizontal={horizontal}
            contentOffset={
                initialContentOffset
                    ? horizontal
                        ? { x: initialContentOffset, y: 0 }
                        : { x: 0, y: initialContentOffset }
                    : undefined
            }
            {...rest}
            ref={refScroller}
        >
            {alignItemsAtEnd && <Reactive.View $style={() => ({ height: paddingTop$.get() })} />}
            {ListHeaderComponent && (
                <Reactive.View $style={ListHeaderComponentStyle}>{ListHeaderComponent}</Reactive.View>
            )}
            {/* {supportsEstimationAdjustment && (
                <Reactive.View
                    $style={() => ({
                        height: visibleRange$.topPad.get(),
                        width: '100%',
                    })}
                />
            )} */}

            <Containers
                containers$={containers$}
                numItems$={numItems$}
                horizontal={horizontal!}
                visibleRange$={visibleRange$}
                recycleItems={recycleItems!}
                getRenderedItem={getRenderedItem}
                ItemSeparatorComponent={ItemSeparatorComponent}
                updateItemLength={updateItemLength}
            />
            {ListFooterComponent && (
                <Reactive.View $style={ListFooterComponentStyle}>{ListFooterComponent}</Reactive.View>
            )}
        </Reactive.ScrollView>
    );
});
