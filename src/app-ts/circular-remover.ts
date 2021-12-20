export function remove(src: any, options?: RemoverOptions): Promise<any> {
    if (undefined === src) return Promise.resolve(undefined);
    else if (null === src) return Promise.resolve(null);

    return new Promise<any>(
        (res: (value: any | PromiseLike<any>) => void) => {
            setTimeout(() => {
                res(
                    referenceRemover(src, options)
                );
            }, 0)
        }
    );

}

export function removeSync(src: any, options?: RemoverOptions): any {
    if (undefined === src) return undefined;
    else if (null === src) return null;
    return referenceRemover(src, options);
}

function referenceRemover(src: any, options?: RemoverOptions): any {
    const weakReferenceValue: WeakRef<any> = new WeakRef<any>(options && options.setUndefined ? { value: undefined } : { value: null });

    function internalRemover(target: any, src: any, references: any[]) {
        for (const key in src) {
            const srcValue = src[key];
            if ('object' !== typeof srcValue) {
                target[key] = srcValue;
                continue;
            }
            else {
                let referenceFound = false;
                for (const reference of references) {
                    if (reference === srcValue) {
                        target[key] = weakReferenceValue.deref().value;
                        referenceFound = true;
                        break;
                    }
                }
                if (!referenceFound) {
                    if (srcValue instanceof Map) {
                        const entries = Array.from(srcValue);
                        target[key] = entries;
                        internalRemover(entries, entries, [...references, entries]);
                    } else {
                        target[key] = Object.assign({}, srcValue);
                        internalRemover(target[key], srcValue, [...references, srcValue]);
                    }
                }
            }
        }
        return target;
    }
    return internalRemover({}, src, [src]);
}

export interface RemoverOptions {
    /**If true, set references as undefined instead of null 
     * @default false
    */
    setUndefined?: boolean;
}