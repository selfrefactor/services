"use strict";
// import {update} from './update'
Object.defineProperty(exports, "__esModule", { value: true });
const getLatest_1 = require("./modules/helpers/getLatest");
// update({
// 	isParallel: true,
// 	atLeast30DaysOld: false
// })
(0, getLatest_1.getLatest)('vitest', '3.2.4').then(result => {
    console.log('Latest version:', result);
});
