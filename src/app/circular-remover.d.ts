export = remover;
declare function remover(src: any, options?: remover.Options): any;
declare namespace remover {
    interface Options {
        /**If true, set references as undefined instead of null
         * @default false
        */
        setUndefined?: boolean;
    }
}
//# sourceMappingURL=circular-remover.d.ts.map