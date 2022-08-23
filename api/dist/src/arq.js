"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cons = void 0;
let value = 0;
const cons = () => {
    console.log('cons: ' + value);
    value++;
};
exports.cons = cons;
