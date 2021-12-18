export = remover;

function remover(src:any,options?:remover.Options) {
    const weakReferenceValue:WeakRef<any> = new WeakRef<any>(options && options.setUndefined ? undefined : null);
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
                        target[key] = weakReferenceValue;
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
    return internalRemover({},src,[src]);
}

declare namespace remover {
    interface Options {
        /**If true, set references as undefined instead of null 
         * @default false
        */
        setUndefined?: boolean;
    }
}