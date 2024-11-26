import { ComponentProps, ReactNode } from 'react';
import { ScrollResponderMixin, ScrollView, ScrollViewComponent } from 'react-native';

export type LegendListProps<T> = Omit<ComponentProps<typeof ScrollView>, 'contentOffset'> & {
    data: ArrayLike<any> & T[];
    initialScrollOffset?: number;
    initialScrollIndex?: number;
    drawDistance?: number;
    initialContainers?: number;
    recycleItems?: boolean;
    onEndReachedThreshold?: number | null | undefined;
    autoScrollToBottom?: boolean;
    autoScrollToBottomThreshold?: number;
    estimatedItemLength: (index: number) => number;
    onEndReached?: ((info: { distanceFromEnd: number }) => void) | null | undefined;
    keyExtractor?: (item: T, index: number) => string;
    renderItem?: (props: LegendListRenderItemInfo<T>) => ReactNode;
    onViewableRangeChanged?: (range: ViewableRange<T>) => void;
    //   TODO:
    //   onViewableItemsChanged?:
    //     | ((info: {
    //         viewableItems: Array<ViewToken<T>>;
    //         changed: Array<ViewToken<T>>;
    //       }) => void)
    //     | null
    //     | undefined;
};

export interface ViewableRange<T> {
    startBuffered: number;
    start: number;
    endBuffered: number;
    end: number;
    items: T[];
}

export interface LegendListRenderItemInfo<ItemT> {
    item: ItemT;
    index: number;
}

export type LegendListRef = {
    /**
     * Displays the scroll indicators momentarily.
     */
    flashScrollIndicators(): void;

    getNativeScrollRef(): React.ElementRef<typeof ScrollViewComponent>;

    getScrollResponder(): ScrollResponderMixin;

    getScrollableNode(): any;

    /**
     * A helper function that scrolls to the end of the scrollview;
     * If this is a vertical ScrollView, it scrolls to the bottom.
     * If this is a horizontal ScrollView scrolls to the right.
     *
     * The options object has an animated prop, that enables the scrolling animation or not.
     * The animated prop defaults to true
     */
    scrollToEnd(options?: { animated?: boolean | undefined }): void;

    scrollToIndex: (params: { index: number; animated?: boolean; viewOffset?: number; viewPosition?: number }) => void;

    scrollToItem(params: { animated?: boolean; item: any; viewPosition?: number }): void;

    scrollToOffset(params: { offset: number; animated?: boolean }): void;
};
