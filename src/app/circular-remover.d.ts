export declare function remove(src: any, options?: RemoverOptions): Promise<any>;
export declare function removeSync(src: any, options?: RemoverOptions): any;
export interface RemoverOptions {
    /**If true, set references as undefined instead of null
     * @default false
    */
    setUndefined?: boolean;
}
//# sourceMappingURL=circular-remover.d.ts.map