import { ReactNode } from 'react';
import { Observable } from '@legendapp/state';
import * as React from 'react';
import {
    LayoutChangeEvent,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleProp,
    View,
    ViewStyle,
} from 'react-native';
import type { ContainerInfo } from './Container';
import { Containers } from './Containers';
import type { VisibleRange } from './LegendList';
import { $View } from './$View';
import type { LegendListProps } from './types';
import { peek$, useStateContext } from './state';

interface ListComponentProps
    extends Omit<
        LegendListProps<any>,
        'data' | 'estimatedItemLength' | 'drawDistance' | 'maintainScrollAtEnd' | 'maintainScrollAtEndThreshold'
    > {
    style: StyleProp<ViewStyle>;
    contentContainerStyle: StyleProp<ViewStyle>;
    horizontal: boolean;
    initialContentOffset: number | undefined;
    containers$: Observable<ContainerInfo[]>;
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
    containers$,
    visibleRange$,
    getRenderedItem,
    updateItemLength,
    refScroller,
    ...rest
}: ListComponentProps) {
    const ctx = useStateContext();

    return (
        <ScrollView
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
            {alignItemsAtEnd && <$View $key="paddingTop" $style={() => ({ height: peek$('paddingTop', ctx) })} />}
            {ListHeaderComponent && <View style={ListHeaderComponentStyle}>{ListHeaderComponent}</View>}
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
                horizontal={horizontal!}
                recycleItems={recycleItems!}
                getRenderedItem={getRenderedItem}
                ItemSeparatorComponent={ItemSeparatorComponent}
                updateItemLength={updateItemLength}
            />
            {ListFooterComponent && <View style={ListFooterComponentStyle}>{ListFooterComponent}</View>}
        </ScrollView>
    );
});
