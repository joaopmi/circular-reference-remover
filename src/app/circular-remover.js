"use strict";
function remover(src, options) {
    const weakReferenceValue = new WeakRef(options && options.setUndefined ? { value: undefined } : { value: null });
    function internalRemover(target, src, references) {
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
                    }
                    else {
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
module.exports = remover;
