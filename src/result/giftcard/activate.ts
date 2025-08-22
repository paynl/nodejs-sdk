/* eslint-disable */
// @ts-nocheck
export class ActivateResult {
    /**
     *  0: request unsuccessful, 1: request successful
     */
    result: string;

    constructor(data) {
        this.result = data.result;
    }
}
