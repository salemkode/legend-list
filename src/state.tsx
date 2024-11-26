import * as React from 'react';

// This is an implementation of a simple state management system, inspired by Legend State.
// It stores values and listeners in Maps, with peek$ and set$ functions to get and set values.
// The set$ function also triggers the listeners.
//
// This is definitely not general purpose and has one big optimization/caveat: use$ is only ever called
// once for each unique name. So we don't need to manage a Set of listeners or dispose them,
// which saves needing useEffect hooks or managing listeners in a Set.

export type ListenerType =
    | 'numContainers'
    | `containerIndex${number}`
    | `containerPosition${number}`
    | `numItems`
    | 'totalSize'
    | 'paddingTop'
    | 'stylePaddingTop'
    | 'headerSize'
    | 'footerSize';

export interface StateContext {
    listeners: Map<ListenerType, () => void>;
    values: Map<ListenerType, any>;
}

const ContextState = React.createContext<StateContext | null>(null);

export function StateProvider({ children }: { children: React.ReactNode }) {
    const [value] = React.useState(() => ({
        listeners: new Map(),
        values: new Map(),
    }));
    return <ContextState.Provider value={value}>{children}</ContextState.Provider>;
}

export function useStateContext() {
    return React.useContext(ContextState)!;
}

export function use$<T>(signalName: ListenerType): T {
    const { listeners, values } = React.useContext(ContextState)!;
    const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
    listeners.set(signalName, forceUpdate);

    return values.get(signalName);
}

export function peek$(ctx: StateContext, signalName: ListenerType) {
    const { values } = ctx;
    return values.get(signalName);
}

export function set$(ctx: StateContext, signalName: ListenerType, value: any) {
    const { listeners, values } = ctx;
    if (values.get(signalName) !== value) {
        values.set(signalName, value);
        listeners.get(signalName)?.();
    }
}
