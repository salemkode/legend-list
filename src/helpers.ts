// biome-ignore lint/complexity/noBannedTypes: <explanation>
export function isFunction(obj: unknown): obj is Function {
    return typeof obj === "function";
}
