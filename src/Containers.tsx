import { Observable } from '@legendapp/state';
import { use$ } from '@legendapp/state/react';
import { Container, ContainerInfo } from './Container';
import type { VisibleRange } from './LegendList';
import { $View } from './signal/$View';
import * as React from 'react';

interface ContainersProps {
    containers$: Observable<ContainerInfo[]>;
    numItems$: Observable<number>;
    horizontal: boolean;
    visibleRange$: Observable<VisibleRange>;
    recycleItems: boolean;
    ItemSeparatorComponent?: React.ReactNode;
    updateItemLength: (index: number, length: number) => void;
    getRenderedItem: (index: number) => React.ReactNode;
}

export const Containers = React.memo(function Containers({
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
        <$View
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
        </$View>
    );
});
