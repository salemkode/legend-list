import { Observable } from '@legendapp/state';
import { use$ } from '@legendapp/state/react';
import * as React from 'react';
import { peek$, useStateContext } from './state';
import { Container, ContainerInfo } from './Container';
import { $View } from './$View';

interface ContainersProps {
    containers$: Observable<ContainerInfo[]>;
    horizontal: boolean;
    recycleItems: boolean;
    ItemSeparatorComponent?: React.ReactNode;
    updateItemLength: (index: number, length: number) => void;
    getRenderedItem: (index: number) => React.ReactNode;
}

export const Containers = React.memo(function Containers({
    containers$,
    horizontal,
    recycleItems,
    ItemSeparatorComponent,
    updateItemLength,
    getRenderedItem,
}: ContainersProps) {
    const ctx = useStateContext();
    const containers = use$(containers$, { shallow: true });
    return (
        <$View
            $key="totalLength"
            $style={() =>
                horizontal
                    ? {
                          width: peek$('totalLength', ctx),
                      }
                    : {
                          height: peek$('totalLength', ctx),
                      }
            }
        >
            {containers.map((container, i) => (
                <Container
                    id={i}
                    key={i}
                    recycleItems={recycleItems}
                    horizontal={horizontal}
                    getRenderedItem={getRenderedItem}
                    onLayout={updateItemLength}
                    ItemSeparatorComponent={ItemSeparatorComponent}
                />
            ))}
        </$View>
    );
});
