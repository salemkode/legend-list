// biome-ignore lint/complexity/noBannedTypes: <explanation>
export function isFunction(obj: unknown): obj is Function {
    return typeof obj === "function";
}

const warned = new Set<string>();
export function warnDevOnce(id: string, text: string) {
    if (__DEV__ && !warned.has(id)) {
        warned.add(id);
        console.warn(`[legend-list] ${text}`);
    }
}
