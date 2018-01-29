//@flow
export type IAsyncActions = {
    start: string,
    doing: string,
    done: string,
    error: string
}

export function ActionNamespace(name): (string, boolean) => IAsyncActions | string {
    return function (key, async = false): IAsyncActions | string {
        if (async) return {
            start: `${name}_${key}`,
            doing: `${name}_${key}`,
            done: `${name}_${key}`,
            error: `${name}_${key}`
        };
        return `${name}_${key}`;
    }
}

