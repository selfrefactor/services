"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = cli;
const update_1 = require("./update");
async function cli(mode = 'updateall') {
    if (mode === 'updateall') {
        process.env.DEP_FN_UPDATE_ALL = 'true';
    }
    await (0, update_1.update)({});
}
