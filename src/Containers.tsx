import * as React from 'react';
import { Observable } from '@legendapp/state';
import { Reactive, use$ } from '@legendapp/state/react';
import { memo, ReactNode } from 'react';
import { Container, ContainerInfo } from './Container';
import type { VisibleRange } from './LegendList';

interface ContainersProps {
    containers$: Observable<ContainerInfo[]>;
    numItems$: Observable<number>;
    horizontal: boolean;
    visibleRange$: Observable<VisibleRange>;
    recycleItems: boolean;
    ItemSeparatorComponent?: ReactNode;
    updateItemLength: (index: number, length: number) => void;
    getRenderedItem: (index: number) => ReactNode;
}

export const Containers = memo(function Containers({
    containers$,
    horizontal,
    visibleRange$,
    recycleItems,
    ItemSeparatorComponent,
    updateItemLength,
    getRenderedItem,
    numItems$,
}: ContainersProps) {
    const containers = use$(containers$, { shallow: true });
    return (
        <Reactive.View
            $style={() =>
                horizontal
                    ? {
                          width: visibleRange$.totalLength.get(),
                      }
                    : {
                          height: visibleRange$.totalLength.get(),
                      }
            }
        >
            {containers.map((container, i) => (
                <Container
                    key={container.id}
                    recycleItems={recycleItems}
                    $container={containers$[i]}
                    horizontal={horizontal}
                    numItems$={numItems$}
                    getRenderedItem={getRenderedItem}
                    onLayout={updateItemLength}
                    ItemSeparatorComponent={ItemSeparatorComponent}
                />
            ))}
        </Reactive.View>
    );
});
