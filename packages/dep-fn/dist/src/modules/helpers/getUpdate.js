"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpdate = void 0;
const confirm_1 = require("./confirm");
const getLatest_1 = require("./getLatest");
const getLatestWithDelay_1 = require("./getLatestWithDelay");
const getUpdateQuestion_1 = require("./getUpdateQuestion");
const normalizeTag_1 = require("./normalizeTag");
const getUpdate = async (input) => {
    const currentVersion = (0, normalizeTag_1.normalizeTag)(input.tag);
    let method = input.atLeast30DaysOld ? getLatest_1.getLatest : getLatestWithDelay_1.getLatestWithDelay;
    const latestVersion = await method(input.dependency);
    if (latestVersion === false)
        return currentVersion;
    if (currentVersion === latestVersion) {
        return currentVersion;
    }
    const question = (0, getUpdateQuestion_1.getUpdateQuestion)({
        currentTag: currentVersion,
        dependency: input.dependency,
        latestTag: latestVersion,
    });
    const answer = await (0, confirm_1.confirm)(question, input.isParallel);
    const willReturn = answer ? latestVersion : currentVersion;
    return willReturn;
};
exports.getUpdate = getUpdate;
