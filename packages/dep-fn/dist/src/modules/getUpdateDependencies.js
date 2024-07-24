"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpdateDependencies = void 0;
const getUpdate_1 = require("./helpers/getUpdate");
const isDependencyEligible_1 = require("./helpers/isDependencyEligible");
const getUpdateDependencies = async (dependencies) => {
    const willReturn = {};
    for (const prop in dependencies) {
        const dependency = dependencies[prop];
        const eligible = (0, isDependencyEligible_1.isDependencyEligible)(prop);
        if (!eligible) {
            console.log(`Dependency ${prop} is skipped`);
            willReturn[prop] = dependency;
            continue;
        }
        const willPush = await (0, getUpdate_1.getUpdate)({
            dependency: prop,
            tag: dependency,
        });
        if (willPush !== dependency) {
            console.log(`Updated '${prop}' dependency to ${willPush}`);
        }
        else {
            console.log(`'${prop}' dependency no need to update`);
        }
        willReturn[prop] = willPush;
    }
    return willReturn;
};
exports.getUpdateDependencies = getUpdateDependencies;
