"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSync = exports.remove = void 0;
function remove(src, options) {
    if (undefined === src)
        return Promise.resolve(undefined);
    else if (null === src)
        return Promise.resolve(null);
    return new Promise((res) => {
        setTimeout(() => {
            res(referenceRemover(src, options));
        }, 0);
    });
}
exports.remove = remove;
function removeSync(src, options) {
    if (undefined === src)
        return undefined;
    else if (null === src)
        return null;
    return referenceRemover(src, options);
}
exports.removeSync = removeSync;
function referenceRemover(src, options) {
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
